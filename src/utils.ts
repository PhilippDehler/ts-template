import { Narrow } from "./utilityTypes";

export function test<T>(input: T): void {
  input;
}

export function infer<T>(i: Narrow<T>) {
  return i;
}
