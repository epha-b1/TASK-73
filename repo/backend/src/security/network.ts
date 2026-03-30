import { lookup } from "node:dns/promises";
import { isIPv4 } from "node:net";
import { HttpError } from "../utils/http-error.js";

type ParsedCidr = { network: number; mask: number };

function ipToInt(ip: string): number {
  const parts = ip.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    throw new HttpError(400, "INVALID_LOCAL_URL", "Webhook target must resolve to an allowed CIDR");
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function parseCidr(cidr: string): ParsedCidr {
  const trimmed = cidr.trim();
  const [baseIp, rawPrefix] = trimmed.split("/");
  if (!baseIp || rawPrefix === undefined || !isIPv4(baseIp)) {
    throw new HttpError(500, "INVALID_CIDR_CONFIGURATION", `Invalid webhook CIDR '${cidr}'`);
  }
  const prefix = Number(rawPrefix);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new HttpError(500, "INVALID_CIDR_CONFIGURATION", `Invalid webhook CIDR '${cidr}'`);
  }
  const mask = prefix === 0 ? 0 : ((0xffffffff << (32 - prefix)) >>> 0);
  return { network: ipToInt(baseIp) & mask, mask };
}

function matchesAnyCidr(ip: string, parsedCidrs: ParsedCidr[]): boolean {
  const ipInt = ipToInt(ip);
  return parsedCidrs.some((cidr) => (ipInt & cidr.mask) === cidr.network);
}

async function resolveIpv4(host: string): Promise<string[]> {
  if (host === "localhost") return ["127.0.0.1"];
  if (isIPv4(host)) return [host];
  const addresses = await lookup(host, { all: true, verbatim: true });
  const ipv4 = addresses.filter((entry) => entry.family === 4).map((entry) => entry.address);
  return [...new Set(ipv4)];
}

export async function assertWebhookTargetAllowed(targetUrl: string, cidrs: string[]): Promise<{ host: string; resolvedIps: string[] }> {
  const parsedCidrs = cidrs.filter((cidr) => cidr.trim().length > 0).map(parseCidr);
  if (!parsedCidrs.length) {
    throw new HttpError(500, "INVALID_CIDR_CONFIGURATION", "No allowed webhook CIDRs configured");
  }

  let url: URL;
  try {
    url = new URL(targetUrl);
  } catch {
    throw new HttpError(400, "INVALID_LOCAL_URL", "Webhook target must resolve to an allowed CIDR");
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new HttpError(400, "INVALID_LOCAL_URL", "Webhook target must use http or https");
  }

  let resolvedIps: string[] = [];
  try {
    resolvedIps = await resolveIpv4(url.hostname);
  } catch {
    throw new HttpError(400, "INVALID_LOCAL_URL", "Webhook target must resolve to an allowed CIDR");
  }
  if (!resolvedIps.length || !resolvedIps.some((ip) => matchesAnyCidr(ip, parsedCidrs))) {
    throw new HttpError(400, "INVALID_LOCAL_URL", "Webhook target must resolve to an allowed CIDR");
  }

  return { host: url.hostname, resolvedIps };
}
