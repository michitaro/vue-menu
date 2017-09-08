import { MenuitemType } from "../menuitem/script"
import { Vue, Component, Prop, Inject } from "vue-property-decorator"
import { MenuCloseEvent } from "../event"
import { MenuStyle } from "../style"


export const PADDING = 4


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
    submenuPosition: 'left' | 'right' = 'right'

    open(x: number, y: number, position: 'left' | 'right' = 'right') {
        this.isOpen = true
        this.setPosition(x, y, position)
    }

    close(fade: boolean, parent = false) {
        if (this.isOpen) {
            this.fade = fade ? 'fade' : 'none'
            this.isOpen = false
            fade || ((this.$refs.menu as HTMLElement).style.display = 'none') // vue synchronizes dom to vdom at several millisecond intervals            
            this.$emit(MenuCloseEvent.type, new MenuCloseEvent(parent))
        }
        if (parent && this.parentMenuitem) {
            this.parentMenuitem.parentMenu.close(fade, true)
        }
    }

    setPosition(x: number, y: number, position: 'left' | 'right') {
        show(this.$refs.menu as HTMLElement, (el) => {
            const style = el.style
            let rect = el.getBoundingClientRect()

            style.maxHeight = `${window.innerHeight - 2 * PADDING}px`
            style.left = `${position == 'right' ? x : x - rect.width + 1}px`
            style.top = `${y}px`

            rect = el.getBoundingClientRect()

            if (rect.bottom > window.innerHeight) {
                el.style.top = `${window.innerHeight - rect.height}px`
            }

            this.submenuPosition = position

            if (rect.right > window.innerWidth) {
                this.submenuPosition = 'left'
                el.style.left = `${x - rect.width - (this.parentMenuitem ? this.parentMenuitem.$el.clientWidth : 0)}px`
            }
            if (rect.left < 0) {
                this.submenuPosition = 'right'
                el.style.left = `${x + (this.parentMenuitem ? this.parentMenuitem.$el.clientWidth : 0)}px`
            }
        })
    }

    get style() {
        return { ...this.menuStyle.menu, padding: `${PADDING}px 0` }
    }
}


function show(target: HTMLElement, cb: (el: HTMLElement) => void) {
    const { display, visibility } = target.style
    target.style.display = 'block'
    target.style.visibility = 'visible'
    cb(target)
    target.style.display = display
    target.style.visibility = visibility
}