import { Narrow } from "./utilityTypes";

export function infer<T>(i: Narrow<T>) {
  return i;
}
