import initMd5Wasm, { calculate as wasmCalculate } from "calculator/md5/pkg";

let md5WasmReady: Promise<unknown>;

export const calculate = async (blob: Blob): Promise<string> => {
  if (!md5WasmReady) {
    md5WasmReady = initMd5Wasm();
  }

  await md5WasmReady;

  return wasmCalculate(new Uint8Array(await blob.arrayBuffer()));
};
