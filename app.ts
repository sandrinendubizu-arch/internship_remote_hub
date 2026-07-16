
const startingBalance: number = 1000;
const exchangeRate: number = 100;  
const processingFeePercent: number = 0.04;  
const sourceCurrency: string = "USD";
const targetCurrency: string = "NGN";


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
 
function generateReceipt(): void {
  // Calculate the conversion
  const convertedAmount: number = startingBalance * exchangeRate;
  const fee: number = convertedAmount * processingFeePercent;
  const finalAmount: number = convertCurrency(
    startingBalance,
    exchangeRate,
    processingFeePercent
  );

  console.log("\n" + "=".repeat(50));
  console.log("         💱 CURRENCY CONVERSION RECEIPT 💱");
  console.log("=".repeat(50));
  console.log(`\nTransaction Date: ${new Date().toLocaleDateString()}`);
  console.log(`Time: ${new Date().toLocaleTimeString()}`);
  console.log("\n--- SOURCE AMOUNT ---");
  console.log(`${startingBalance.toFixed(2)} ${sourceCurrency}`);
  console.log("\n--- EXCHANGE DETAILS ---");
  console.log(`Exchange Rate: 1 ${sourceCurrency} = ${exchangeRate} ${targetCurrency}`);
  console.log(`Gross Amount: ${convertedAmount.toFixed(2)} ${targetCurrency}`);
  console.log("\n--- FEES ---");
  console.log(`Processing Fee (${(processingFeePercent * 100).toFixed(1)}%): -${fee.toFixed(2)} ${targetCurrency}`);
  console.log("\n--- FINAL AMOUNT ---");
  console.log(`${finalAmount.toFixed(2)} ${targetCurrency}`);
  console.log("\n" + "=".repeat(50));
  console.log("Thank you for your transaction!\n");
}

generateReceipt();