"use strict";
const startingBalance = 1000;
const exchangeRate = 100;
const processingFeePercent = 0.04;
const sourceCurrency = "USD";
const targetCurrency = "NGN";
function convertCurrency(amount, rate, feePercent) {
    const convertedAmount = amount * rate;
    const fee = convertedAmount * feePercent;
    const finalAmount = convertedAmount - fee;
    return finalAmount;
}
function generateReceipt() {
    // Calculate the conversion
    const convertedAmount = startingBalance * exchangeRate;
    const fee = convertedAmount * processingFeePercent;
    const finalAmount = convertCurrency(startingBalance, exchangeRate, processingFeePercent);
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
function showScene(next) {

    let amount = prompt("Enter the amount to convert:");
    amount = Number(amount);

    if (isNaN(amount)) {
        alert("Please enter a valid number.");
        return;
    }

    console.log("Amount entered:", amount);

    if (next === current) return;

    const oldScene = document.getElementById(`scene-${current}`);
    const newScene = document.getElementById(`scene-${next}`);

    oldScene.classList.add("leaving");
    newScene.classList.add("active");

    setTimeout(() => {
        oldScene.classList.remove("active", "leaving");
    }, 900);

    current = next;
}
