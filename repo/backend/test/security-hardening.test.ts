import { describe, expect, test } from "vitest";
import { assertWebhookTargetAllowed } from "../src/security/network.js";
import { assertSafeRulePattern, safeRuleMatch } from "../src/security/regex-safety.js";

describe("security hardening", () => {
  test("webhook CIDR guard allows localhost and blocks disallowed IP", async () => {
    await expect(assertWebhookTargetAllowed("http://localhost/hook", ["127.0.0.1/32", "10.0.0.0/8"]))
      .resolves
      .toMatchObject({ host: "localhost" });

    await expect(assertWebhookTargetAllowed("http://8.8.8.8/hook", ["127.0.0.1/32", "10.0.0.0/8"]))
      .rejects
      .toMatchObject({ code: "INVALID_LOCAL_URL" });
  });

  test("regex safety guard rejects known dangerous nested quantifiers", () => {
    expect(() => assertSafeRulePattern("forbid\\s+me")).not.toThrow();
    expect(() => assertSafeRulePattern("(a+)+$")).toThrowError(expect.objectContaining({ code: "UNSAFE_REGEX_PATTERN" }));
  });

  test("safe matcher truncates long input safely", () => {
    const huge = `${"x".repeat(10000)} forbid me`;
    expect(safeRuleMatch("forbid\\s+me", huge)).toBe(false);
    expect(safeRuleMatch("x+", huge)).toBe(true);
  });
});
