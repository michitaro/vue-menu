import { MenuitemType } from "./menuitem/script"
import { MenubaritemType } from "./menubaritem/script";


export class MenuitemActivateEvent {
    static readonly type = 'menuitemactivate'
    constructor(readonly menuitem: MenuitemType) { }
}


export class MenuCloseEvent {
    static readonly type = 'menuclose'
    constructor(readonly fromChild = false) { }
}


export class MenubaritemActivateEvent {
    static readonly type = 'menubaritemactivate'
    constructor(readonly menubaritem: MenubaritemType) { }
}


export class MenubarDactivateEvent {
    static readonly type = 'menubardeactivate'
    constructor() { }
}


export function once<T extends Event>(target: HTMLElement | Document, type: string, handler: (event: T) => void) {
    const h = ((e: T) => {
        handler(e)
        off()
    }) as EventListener
    const off = () => { target.removeEventListener(type, h) }
    target.addEventListener(type, h)
    return off
}