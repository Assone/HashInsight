import initShaWasm, {
  calculate_sha1,
  calculate_sha256,
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

  if (type === "sha1") {
    return calculate_sha1(input);
  }

  if (type === "sha512") {
    return calculate_sha512(input);
  }

  return calculate_sha256(input);
};
