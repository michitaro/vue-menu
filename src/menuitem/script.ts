import { Vue, Component, Prop, Inject } from "vue-property-decorator"
import { MenuType, PADDING } from "../menu/script"
import Menu from "../menu/index.vue"
import { MenuitemActivateEvent, MenuCloseEvent } from "../event"
import { sync } from "../global"
import { Keybinder } from "../keybinder"
import * as keybind from "@hscmap/keybind"
import { MenuStyle } from "../style"


@Component({
    components: { XMenu: Menu, XKeybinder: Keybinder }
})
export class MenuitemType extends Vue {
    @Inject()
    parentMenu: MenuType

    @Inject()
    menuStyle: MenuStyle

    @Prop({ type: String, default: "" })
    label: string

    @Prop({ type: Boolean, default: false })
    checked: boolean

    @Prop({ type: Boolean, default: false })
    disabled: boolean

    @Prop({ type: String })
    keybind?: string

    get keybindHTML() {
        return this.keybind && keybind.html(this.keybind)
    }

    get style() {
        const { active, disabled } = this.menuStyle
        return { ...(this.active ? active : {}), ...(this.disabled ? disabled : {}) }
    }

    mounted() {
        this.parentMenu.$on(MenuitemActivateEvent.type, (e: MenuitemActivateEvent) => {
            e.menuitem != this && this.deactivate()
        })
        this.parentMenu.$on(MenuCloseEvent.type, (e: MenuCloseEvent) => {
            this.hover = false
            const childMenu = this.childMenu()
            childMenu && childMenu.close(true)
        })
    }

    private hover = false

    private get active() {
        const childMenu = this.childMenu()
        return this.hover || childMenu && childMenu.isOpen
    }

    private activate() {
        this.parentMenu.$emit(MenuitemActivateEvent.type, new MenuitemActivateEvent(this))
        const childMenu = this.childMenu()
        if (childMenu) {
            const rect = this.$el.getBoundingClientRect()
            const submenuDirection = this.parentMenu.submenuDirection
            childMenu.open(rect[submenuDirection], rect.top - PADDING, submenuDirection)
        }
    }

    private deactivate() {
        const childMenu = this.childMenu()
        childMenu && childMenu.close(false)
    }

    fire() {
        sync.lock(async () => {
            await this.flash()
            this.$emit('click')
            this.parentMenu.close(true, true)
        })
    }

    private childMenu() {
        const childMenu = this.$refs.childMenu
        return childMenu ? (childMenu as MenuType) : undefined
    }

    private async flash() {
        const d = 50
        for (let i = 0; i < 3; ++i) {
            this.hover = false
            await sleep(d)
            this.hover = true
            await sleep(d)
        }
        this.hover = false
    }

    private mouseenter(e: MouseEvent) {
        this.disabled || sync.lock(async () => {
            if (this.parentMenu.isOpen) {
                this.hover = true
                this.activate()
            }
        })
    }

    private mouseleave(e: MouseEvent) {
        sync.lock(async () => {
            this.parentMenu.isOpen && (this.hover = false)
        })
    }

    private mouseup() {
        this.$slots.body || this.hover && sync.lock(async () => {
            this.parentMenu.isOpen && (this.$slots.default || this.fire())
        })
    }
}


function sleep(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}