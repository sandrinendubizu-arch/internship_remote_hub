import type { HasFormatter } from "../intrerfaces/hasformatter.js";
export declare class ListTemplate {
    private container;
    constructor(container: HTMLUListElement);
    render(item: HasFormatter, heading: string, pos: 'start' | 'end'): void;
}
//# sourceMappingURL=List%20template.d.ts.map