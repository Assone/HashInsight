import { calculate as calculateMd5 } from "../calculator/md5";
import { calculate as calculateSha } from "../calculator/sha";

export type CalculateType = "md5" | "sha1" | "sha256" | "sha512";
export type EventType = "start" | "end";

self.onmessage = async (evt: MessageEvent<File>) => {
  const blob = new Blob([evt.data]);

  const calculate = (type: CalculateType) => {
    switch (type) {
      case "md5": {
        return calculateMd5(blob);
      }
      case "sha1":
      case "sha256":
      case "sha512": {
        return calculateSha(blob, type);
      }
    }
  };

  const postDigest = (type: CalculateType) =>
    calculate(type).then((digest) =>
      self.postMessage({
        type: "digest",
        algorithm: type,
        digest,
      })
    );

  self.postMessage({ type: "start" });
  await Promise.all([
    postDigest("md5"),
    postDigest("sha1"),
    postDigest("sha256"),
    postDigest("sha512"),
  ]);
  self.postMessage({ type: "end" });
};
