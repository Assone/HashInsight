import initShaWasm, {
  calculate_sha1,
  calculate_sha256,
  calculate_sha384,
  calculate_sha512,
} from "calculator/sha/pkg";

let shaWasmReady: Promise<unknown>;

export type CalculateType = "sha1" | "sha256" | "sha384" | "sha512";

export const calculate = async (
  blob: Blob,
  type: CalculateType = "sha256"
): Promise<string> => {
  if (!shaWasmReady) {
    shaWasmReady = initShaWasm();
  }

  await shaWasmReady;

  const input = new Uint8Array(await blob.arrayBuffer());

  switch (type) {
    case 'sha1':
      return calculate_sha1(input);

    case 'sha256':
      return calculate_sha256(input);

    case 'sha384':
      return calculate_sha384(input);

    case 'sha512':
      return calculate_sha512(input);

    default:
      throw new Error("Invalid algorithm");
  }
};
