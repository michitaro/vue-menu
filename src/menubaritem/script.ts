import { Component, Vue, Prop, Inject } from "vue-property-decorator"
import { MenubarType, MENUBAR_KEY } from "../menubar/script"
import { MenuType } from "../menu/script"
import Menu from "../menu/index.vue"
import { sync } from "../global"
import { MenubaritemActivateEvent, MenuCloseEvent, MenubarDactivateEvent } from "../event"
import { MenuStyle, MENU_STYLE_KEY } from "../style"


@Component({
    components: { XMenu: Menu }
})
export class MenubaritemType extends Vue {
    @Prop({ type: String, required: true })
    label!: string

    @Inject(MENUBAR_KEY)
    menubar!: MenubarType

    @Inject(MENU_STYLE_KEY)
    menuStyle!: MenuStyle

    hover = false
    isOpen = false

    mounted() {
        this.menu().$on(MenuCloseEvent.type, (e: MenuCloseEvent) => {
            this.isOpen = false
            e.fromChild && this.menubar.deactivate()
        })
        this.menubar.$on(MenubaritemActivateEvent.type, (e: MenubaritemActivateEvent) => {
            this != e.menubaritem && this.menu().close(false)
        })
        this.menubar.$on(MenubarDactivateEvent.type, (e: MenubarDactivateEvent) => {
            this.menu().close(true)
        })
    }

    get style() {
        return this.active ? this.menuStyle.active : {}
    }

    private menu() {
        return this.$refs.menu as MenuType
    }

    private activate() {
        const rect = this.$el.getBoundingClientRect()
        this.menu().open(rect.left, rect.bottom)
        this.menubar.$emit(MenubaritemActivateEvent.type, new MenubaritemActivateEvent(this))
        this.isOpen = true
    }

    private mousedown() {
        sync.lock(async () => {
            this.activate()
        })
    }

    private mouseenter() {
        sync.lock(async () => {
            this.hover = true
            this.menubar.active && this.activate()
        })
    }

    private mouseleave() {
        sync.lock(async () => {
            this.hover = false
        })
    }

    get active() {
        return this.hover || this.isOpen
    }
}