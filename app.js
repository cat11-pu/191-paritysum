// app.js：渲染结果
import { parityOf } from "./classify.js";
import { groupSums } from "./sums.js";

export function render(spec) {
  const values = spec.values || [];
  const view = groupSums(values);
  const parities = view.parities || [];
  return { parities: parities, even_sum: view.even_sum || 0, odd_sum: view.odd_sum || 0,
           even_at: view.even_at || [], odd_at: view.odd_at || [],
           even_count: (view.even_at || []).length, odd_count: (view.odd_at || []).length,
           total: (view.even_sum || 0) + (view.odd_sum || 0) };
}
