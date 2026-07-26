import type { HasFormatter } from "../intrerfaces/hasformatter.js";
export declare class Payment implements HasFormatter {
    readonly recipient: string;
    private details;
    amount: number;
    constructor(recipient: string, details: string, amount: number);
    format(): string;
}
//# sourceMappingURL=payment.d.ts.map