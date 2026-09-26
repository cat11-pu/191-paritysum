// sums.js：分组求和，一次扫描，每值只判一次
import { parityOf } from "./classify.js";

export function groupSums(values) {
  const parities = [];
  const even_at = [];
  const odd_at = [];
  let even_sum = 0;
  let odd_sum = 0;
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value < 0) {
      const error = new Error("negative value at index " + index);
      error.code = "E_NEGATIVE";
      throw error;
    }
    const parity = parityOf(value);
    parities.push(parity);
    if (parity === "even") {
      even_sum += value;
      even_at.push(index);
    } else {
      odd_sum += value;
      odd_at.push(index);
    }
  }
  return { parities, even_sum, odd_sum, even_at, odd_at };
}
