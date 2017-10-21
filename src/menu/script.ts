import { MenuitemType } from "../menuitem/script"
import { Vue, Component, Prop, Inject } from "vue-property-decorator"
import { MenuCloseEvent } from "../event"
import { MenuStyle } from "../style"


export const PADDING = 4

export type Direction = 'left' | 'right'


@Component({
    provide() { return { parentMenu: this } }
})
export class MenuType extends Vue {
    @Prop()
    parentMenuitem?: MenuitemType

    @Inject()
    menuStyle: MenuStyle

    isOpen = false
    fade = 'none'
    submenuDirection: Direction = 'right'

    open(x: number, y: number, position: Direction = 'right') {
        this.setPosition(x, y, position)
        this.isOpen = true;
    }

    close(fade: boolean, parent = false) {
        if (this.isOpen) {
            this.fade = fade ? 'fade' : 'none'
            this.isOpen = false
            fade || (this.menuElement().style.display = 'none') // vue synchronizes dom to vdom at several millisecond intervals
            this.$emit(MenuCloseEvent.type, new MenuCloseEvent(parent))
        }
        if (parent && this.parentMenuitem) {
            this.parentMenuitem.parentMenu.close(fade, true)
        }
    }

    setPosition(x: number, y: number, direction: Direction) {
        x = Math.floor(x)
        y = Math.floor(y)
        
        show([this.menuElement(), this.wrapperElement()], ([menu, wrapper]) => {
            let rect = menu.getBoundingClientRect()

            menu.style.maxHeight = `${window.innerHeight - 2 * PADDING}px`

            wrapper.style.left = `${direction == 'right' ? x : x - rect.width + 1}px`
            wrapper.style.top = `${y}px`

            rect = menu.getBoundingClientRect()

            if (rect.bottom > window.innerHeight) {
                wrapper.style.top = `${window.innerHeight - rect.height}px`
            }

            this.submenuDirection = direction

            if (rect.right > window.innerWidth) {
                this.submenuDirection = 'left'
                wrapper.style.left = `${x - rect.width - (this.parentMenuitem ? this.parentMenuitem.$el.clientWidth : 0)}px`
            }
            if (rect.left < 0) {
                this.submenuDirection = 'right'
                wrapper.style.left = `${x + (this.parentMenuitem ? this.parentMenuitem.$el.clientWidth : 0)}px`
            }
        })
    }

    menuElement() {
        return <HTMLDivElement>this.$refs.menu
    }

    wrapperElement() {
        return <HTMLDivElement>this.$refs.wrapper
    }

    get style() {
        return { ...this.menuStyle.menu, padding: `${PADDING}px 0` }
    }
}


function show(targets: HTMLElement[], cb: (els: HTMLElement[]) => void) {
    const originalStyle = targets.map(target => {
        const { display, visibility } = target.style
        target.style.display = 'block'
        target.style.visibility = 'visible'
        return { display, visibility }
    })
    cb(targets)
    targets.forEach((target, i) => {
        const { display, visibility } = originalStyle[i]
        target.style.display = display
        target.style.visibility = visibility
    })
}