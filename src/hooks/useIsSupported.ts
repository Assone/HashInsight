import { useState } from "react";
import { useMount } from "./useMount";

export const useIsSupported = (predicate: () => boolean) => {
  const [isSupported, setIsSupported] = useState(false);

  useMount(() => setIsSupported(predicate()));

  return isSupported;
};
