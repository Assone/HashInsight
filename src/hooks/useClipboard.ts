import { useIsSupported } from "./useIsSupported";

export const useClipboard = () => {
  const isSupported = useIsSupported(() => "clipboard" in navigator);

  const writeWithText = (text: string) => {
    if (!isSupported) return Promise.reject("Not supported");

    return navigator.clipboard.writeText(text);
  };

  return {
    isSupported,
    writeWithText,
  };
};
