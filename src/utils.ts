import { Narrow } from "./ts-utils/narrow";

export function infer<T>(i: Narrow<T>): Narrow<T> {
  return i;
}
