import * as keybind from "@hscmap/keybind";
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { MenuCloseEvent, MenuitemActivateEvent } from "../event";
import { sync } from "../global";
import { Keybinder } from "../keybinder";
import Menu from "../menu/index.vue";
import { MenuType, PADDING, PARENT_MENU_KEY } from "../menu/script";
import { MenubaritemType, MENUBARITEM_KEY } from "../menubaritem/script";
import { MenuStyle, MENU_STYLE_KEY } from "../style";


@Component({
    components: { XMenu: Menu, XKeybinder: Keybinder },
    model: {
        prop: 'vModel',
    }
})
export class MenuitemType extends Vue {
    @Inject(PARENT_MENU_KEY)
    parentMenu!: MenuType

    @Inject(MENU_STYLE_KEY)
    menuStyle!: MenuStyle

    @Inject(MENUBARITEM_KEY)
    menubaritem?: MenubaritemType

    @Prop({ type: String, default: "" })
    label!: string

    @Prop({ type: Boolean, default: false })
    checked!: boolean

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    @Prop({ type: String })
    keybind?: string

    @Prop({ default: false })
    sync!: boolean

    @Prop({ default: 'checkbox' })
    type!: 'radio' | 'checkbox'

    @Prop()
    vModel?: any[] | boolean

    @Prop()
    value!: any

    created() {
        // validate props
        if (this.vModel !== undefined) {
            assert(['radio', 'checkbox'].indexOf(this.type) >= 0, 'prop :type must be one of "radio" or "checkbox"')
            if (this.type == 'checkbox') {
                assert(Array.isArray(this.vModel) || typeof (this.vModel) == 'boolean', 'v-model must be an array or boolean')
            }
            else if (this.type == 'radio') {
                assert(this.value !== undefined, 'v-model must be set')
            }
        }
    }

    get keybindHTML() {
        return this.keybind && keybind.html(this.keybind)
    }

    get style() {
        const { active, disabled } = this.menuStyle
        return { ...(this.active ? active : {}), ...(this.disabled ? disabled : {}) }
    }

    get showCheckmark() {
        if (this.type == 'radio')
            return this.vModel == this.value
        if (this.type == 'checkbox' && this.vModel !== undefined) {
            if (Array.isArray(this.vModel))
                return this.vModel.indexOf(this.value) >= 0
            else
                return this.vModel
        }
        return this.checked
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
        this.$emit('click')
        if (this.type == 'radio') {
            this.$emit('input', this.value)
        }
        else if (this.type == 'checkbox' && this.vModel !== undefined) {
            if (Array.isArray(this.vModel)) {
                const i = this.vModel.indexOf(this.value)
                const copy = this.vModel.slice()
                if (i >= 0) {
                    copy.splice(i, 1)
                }
                else {
                    copy.push(this.value)
                }
                this.$emit('input', copy)
            }
            else {
                this.$emit('input', !this.vModel)
            }
        }
        this.menubaritem && this.menubaritem.onMenuiatemFired()
    }

    private async flash() {
        if (this.menuStyle.animation) {
            const d = 50
            for (let i = 0; i < 3; ++i) {
                this.hover = false
                await sleep(d)
                this.hover = true
                await sleep(d)
            }
        }
        this.hover = false
    }

    private childMenu() {
        const childMenu = this.$refs.childMenu
        return childMenu ? (childMenu as MenuType) : undefined
    }

    mouseenter(e: MouseEvent) {
        this.disabled || sync.lock(async () => {
            if (this.parentMenu.isOpen) {
                this.hover = true
                this.activate()
            }
        })
    }

    mouseleave(e: MouseEvent) {
        sync.lock(async () => {
            this.parentMenu.isOpen && (this.hover = false)
        })
    }

    mouseup(e: MouseEvent) {
        this.$slots.body || this.hover && sync.lock(async () => {
            if (this.parentMenu.isOpen && !this.$slots.default)
                sync.lock(async () => {
                    this.sync || await this.flash()
                    this.fire()
                    e.shiftKey || this.parentMenu.close(true, true)
                })
        })
    }
}


function sleep(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message)
    }
}