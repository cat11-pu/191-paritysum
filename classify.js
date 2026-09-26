// classify.js：判一个数的奇偶（能被二整除为 even，零算偶数）
export function parityOf(value) {
  return value % 2 === 0 ? "even" : "odd";
}
