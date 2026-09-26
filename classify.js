// classify.js：判一个数，能被二整除算偶数（零算偶数），其余算奇数
export function parityOf(value) {
  return value % 2 === 0 ? "even" : "odd";
}
