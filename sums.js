// sums.js：分组求和（基线：一律给零）
import { parityOf } from "./classify.js";

export function groupSums(values) {
  return { parities: [], even_sum: 0, odd_sum: 0, even_at: [], odd_at: [] };
}
