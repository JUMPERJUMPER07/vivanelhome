import crypto from "crypto";

const password = process.argv[2];

if (!password) {
  console.error("Uso: node scripts/generate-admin-password-hash.mjs <senha>");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const keyLength = 64;
const N = 16384;
const r = 8;
const p = 1;

const derivedKey = crypto
  .scryptSync(password, salt, keyLength, { N, r, p })
  .toString("hex");

const hash = ["scrypt", N, r, p, salt, derivedKey].join(":");

console.log(hash);
