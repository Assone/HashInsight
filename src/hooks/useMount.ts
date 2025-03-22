import { useEffect, type EffectCallback } from "react";

export const useMount = (fn: EffectCallback) => {
  useEffect(fn, [fn]);
};
