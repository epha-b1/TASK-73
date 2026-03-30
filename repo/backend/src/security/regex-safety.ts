import { HttpError } from "../utils/http-error.js";

const MAX_PATTERN_LENGTH = 256;
const MAX_MATCH_TEXT_LENGTH = 2048;

const nestedQuantifierPattern = /\((?:[^()\\]|\\.)*[+*](?:[^()\\]|\\.)*\)[+*{?]/;
const repeatedWildcardPattern = /(\.\*){2,}/;
const backReferencePattern = /\\[1-9]/;

export function assertSafeRulePattern(pattern: string): void {
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new HttpError(400, "UNSAFE_REGEX_PATTERN", `Regex pattern exceeds ${MAX_PATTERN_LENGTH} characters`);
  }
  if (backReferencePattern.test(pattern) || nestedQuantifierPattern.test(pattern) || repeatedWildcardPattern.test(pattern)) {
    throw new HttpError(400, "UNSAFE_REGEX_PATTERN", "Regex pattern is not allowed for safety reasons");
  }
  try {
    new RegExp(pattern, "i");
  } catch {
    throw new HttpError(400, "INVALID_REGEX", "Invalid regex");
  }
}

export function safeRuleMatch(pattern: string, text: string): boolean {
  const boundedText = text.slice(0, MAX_MATCH_TEXT_LENGTH);
  return new RegExp(pattern, "i").test(boundedText);
}
