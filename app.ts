const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output:process.stdout,
});


function currencyEngine(): void {
  rl.question("Enter your balance: ", (balanceInput: string): void => {
    const balance: number = Number(balanceInput);


    rl.question("Enter conversion rate: ", function (rateInput: string) {
            const rate: number = Number(rateInput);


            const convertedAmount: number = balance * rate;
            const fee: number = convertedAmount * 0.02;
            const finalAmount: number = convertedAmount - fee;


            console.log("\n====== TRANSACTION RECEIPT ======");
            console.log(`Starting Balance: ${balance}`);
            console.log(`Conversion Rate: ${rate}`);
            console.log(`Converted Amount: ${convertedAmount.toFixed(2)}`);
            console.log(`Transaction Fee (2%): ${fee.toFixed(2)}`);
            console.log(`Final Amount: ${finalAmount.toFixed(2)}`);
            console.log("=================================\n");


            rl.question(
                "Do you want to perform another transaction? (yes/no): ",
                (answer: string) => {
                    if (answer.toLowerCase() === "yes") {
                        console.log();
                        currencyEngine(); // Run again
                    } else {
                        console.log("Thank you for using the Currency Logic Engine!");
                        rl.close();
                    }
                }
            );
        });
  });
}


currencyEngine();