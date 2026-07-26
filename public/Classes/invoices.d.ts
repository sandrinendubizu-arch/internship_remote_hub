import type { HasFormatter } from "../intrerfaces/hasformatter.js";
export declare class Invoice implements HasFormatter {
    readonly client: string;
    private details;
    amount: number;
    constructor(client: string, details: string, amount: number);
    format(): string;
}
//# sourceMappingURL=invoices.d.ts.map