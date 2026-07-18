function convertCurrency(
  amount: number,
  rate: number,
  feePercent: number
): number {
  const convertedAmount: number = amount * rate;
  const fee: number = convertedAmount * feePercent;
  const finalAmount: number = convertedAmount - fee;
  return finalAmount;
}
