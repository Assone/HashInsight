import type { CalculateType, EventType } from "@/features/workers/calculator";
import Calculator from "@/features/workers/calculator?worker";
import { useEffect, useReducer, useState } from "react";

const worker = new Calculator();

type State = Partial<Record<CalculateType, string>>;

type CreateAction<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends undefined
    ? { type: K }
    : { type: K; payload: Required<T[K]> };
}[keyof T];

type Actions = CreateAction<{
  clear: undefined;
  calculated: { type: string; digest: string };
}>;

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "clear": {
      return {
        md5: undefined,
        sha1: undefined,
        sha256: undefined,
        sha384: undefined,
        sha512: undefined,
      };
    }

    case "calculated": {
      return {
        ...state,
        [action.payload.type]: action.payload.digest,
      };
    }

    default: {
      return state;
    }
  }
};

export const useCalculator = (file: File | null) => {
  const [state, dispatch] = useReducer(reducer, {});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (file) {
      worker.postMessage(file);
    } else {
      dispatch({ type: "clear" });
    }

    const onMessage = (
      evt: MessageEvent<
        | { type: EventType }
        | { type: "digest"; algorithm: CalculateType; digest: string }
      >
    ) => {
      switch (evt.data.type) {
        case "start": {
          setIsLoading(true);
          dispatch({ type: "clear" });
          break;
        }
        case "end": {
          setIsLoading(false);
          break;
        }
        case "digest": {
          dispatch({
            type: "calculated",
            payload: {
              type: evt.data.algorithm,
              digest: evt.data.digest,
            },
          });
          break;
        }
      }
    };
    const onError = () => {
      setIsLoading(false);
      dispatch({ type: "clear" });
    };

    worker.addEventListener("message", onMessage);
    worker.addEventListener("error", onError);

    return () => {
      worker.removeEventListener("message", onMessage);
      worker.addEventListener("error", onError);
    };
  }, [file]);

  return {
    ...state,
    isLoading,
  };
};
