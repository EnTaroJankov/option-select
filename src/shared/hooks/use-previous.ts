import { useRef } from "react";

export const usePrevious = <T>(currentValue: T | undefined): T | undefined => {
  const valueRef = useRef<T | undefined>(undefined);
  const previousValue = valueRef.current;
  valueRef.current = currentValue;
  return previousValue;
};
