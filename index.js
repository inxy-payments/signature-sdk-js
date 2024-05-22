import forge from "node-forge";

function isValidPEM(pemString) {
  const pemFormat = /^-----BEGIN ([A-Z\s]+)-----\r?\n([A-Za-z0-9+/=\r\n]+)\r?\n?-----END \1-----$/;

  return pemFormat.test(pemString.trim());
}

export function createSignature(data, privateKeyString, dateNow) {
  // Validate input types
  if (typeof data !== "string" || data.trim().length === 0) {
    throw new Error("data must be a non-empty string");
  }

  if (
    typeof privateKeyString !== "string" ||
    privateKeyString.trim().length === 0
  ) {
    throw new Error("privateKeyString must be a non-empty string");
  }

  if (!(dateNow instanceof Date) || isNaN(dateNow.getTime())) {
    throw new Error("dateNow must be a valid Date object");
  }

  // Validate private key format
  if (!isValidPEM(privateKeyString)) {
    throw new Error("privateKeyString must be in valid PEM format");
  }

  // Convert data to lowercase and concatenate with timestamp in seconds
  const timestamp = Math.round(dateNow.getTime() / 1000);
  const dataToSign = `${data.toLowerCase()}_${timestamp}`;

  // Decode the private key from PEM format
  const privateKey = forge.pki.privateKeyFromPem(privateKeyString);

  // Create a SHA-256 hash of the data
  const md = forge.md.sha256.create();
  md.update(dataToSign, "utf8");
  const digest = md.digest();

  // Sign the hash using RSA PKCS#1 v1.5
  const signature = privateKey.sign(md);

  // Encode the signature as base64
  const signatureBase64 = forge.util.encode64(signature);

  return { signature: signatureBase64, timestamp: timestamp };
}
