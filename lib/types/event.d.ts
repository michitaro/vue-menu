import { MenuitemType } from "./menuitem/script";
import { MenubaritemType } from "./menubaritem/script";
export declare class MenuitemActivateEvent {
    readonly menuitem: MenuitemType;
    static readonly type: string;
    constructor(menuitem: MenuitemType);
}
export declare class MenuCloseEvent {
    readonly fromChild: boolean;
    static readonly type: string;
    constructor(fromChild?: boolean);
}
export declare class MenubaritemActivateEvent {
    readonly menubaritem: MenubaritemType;
    static readonly type: string;
    constructor(menubaritem: MenubaritemType);
}
export declare class MenubarDactivateEvent {
    static readonly type: string;
    constructor();
}
export declare function once<T extends Event>(target: HTMLElement | Document, type: string, handler: (event: T) => void): () => void;
