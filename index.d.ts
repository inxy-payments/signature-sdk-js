export interface SignatureResult {
  signature: string;
  timestamp: number;
}

export function createSignature(
  data: string,
  privateKeyString: string,
  dateNow: Date
): SignatureResult;
