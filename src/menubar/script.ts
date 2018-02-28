import { Vue, Component, Prop, Provide, Inject } from "vue-property-decorator"
import { MenubarDactivateEvent, once } from '../event'
import { MenuStyle } from "../style"

@Component({
    provide() {
        return { menubar: this }
    }
})
export class MenubarType extends Vue {
    @Inject()
    menuStyle!: MenuStyle

    active = false

    deactivate() {
        this.active = false
        this.$emit(MenubarDactivateEvent.type, new MenubarDactivateEvent())
        this.clearCancellers()
    }

    private cancelMouseup?: () => void
    private cancelMousedown?: () => void

    private mousedown(mousedown: MouseEvent) {
        if (this.active)
            return this.deactivate()
        this.active = true
        this.clearCancellers()
        this.cancelMouseup = once(document, 'mouseup', mouseup => {
            if (mouseup.timeStamp - mousedown.timeStamp >= 500)
                this.deactivate()
            else
                this.cancelMousedown = once(document, 'mousedown', () => this.deactivate())
        })
    }

    private clearCancellers() {
        this.cancelMouseup && this.cancelMouseup()
        this.cancelMousedown && this.cancelMousedown()
    }
}