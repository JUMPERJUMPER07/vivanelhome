import crypto from "crypto";

const SCRYPT_PREFIX = "scrypt";
const HASH_DELIMITER = ":";
const DEFAULT_SCRYPT_N = 16384;
const DEFAULT_SCRYPT_R = 8;
const DEFAULT_SCRYPT_P = 1;
const DEFAULT_KEY_LENGTH = 64;

type ScryptHashParts = {
  n: number;
  r: number;
  p: number;
  salt: string;
  derivedKey: string;
};

function parseScryptHash(hash: string): ScryptHashParts | null {
  const delimiter = hash.includes(HASH_DELIMITER) ? HASH_DELIMITER : "$";
  const [prefix, n, r, p, salt, derivedKey] = hash.split(delimiter);

  if (
    prefix !== SCRYPT_PREFIX ||
    !n ||
    !r ||
    !p ||
    !salt ||
    !derivedKey
  ) {
    return null;
  }

  return {
    n: Number(n),
    r: Number(r),
    p: Number(p),
    salt,
    derivedKey,
  };
}

export function createPasswordHash(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto
    .scryptSync(password, salt, DEFAULT_KEY_LENGTH, {
      N: DEFAULT_SCRYPT_N,
      r: DEFAULT_SCRYPT_R,
      p: DEFAULT_SCRYPT_P,
    })
    .toString("hex");

  return [
    SCRYPT_PREFIX,
    DEFAULT_SCRYPT_N,
    DEFAULT_SCRYPT_R,
    DEFAULT_SCRYPT_P,
    salt,
    derivedKey,
  ].join(HASH_DELIMITER);
}

export function verifyPasswordHash(password: string, hash: string) {
  const parsed = parseScryptHash(hash);

  if (!parsed) {
    return false;
  }

  const candidate = crypto.scryptSync(password, parsed.salt, DEFAULT_KEY_LENGTH, {
    N: parsed.n,
    r: parsed.r,
    p: parsed.p,
  });

  const expected = Buffer.from(parsed.derivedKey, "hex");

  if (candidate.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidate, expected);
}
