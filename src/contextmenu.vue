<template>
    <div @contextmenu="contextmenu" style="display: inline-block;">
        <slot/>
        <x-menu ref="menu">
            <slot name="contextmenu" />
        </x-menu>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import Menu from "./menu/index.vue"
import { MenuType, Direction } from "./menu/script"
import { once } from "./event"


@Component({
    components: { XMenu: Menu }
})
export default class ContextmenuType extends Vue {
    @Prop({ type: Function })
    position?: (e: MouseEvent) => { x: number, y: number, direction: Direction }

    private cancelMouseup?: () => void
    private cancelMousedown?: () => void

    private menu() {
        return this.$refs.menu as MenuType
    }

    contextmenu(mousedown: MouseEvent) {
        mousedown.preventDefault()
        this.clearCancellers()

        if (this.menu().isOpen) {
            return this.close()
        }

        this.cancelMouseup = once(document, 'mouseup', mouseup => {
            if (mouseup.timeStamp - mousedown.timeStamp >= 500)
                this.close()
            else {
                this.cancelMousedown = once(document, 'mousedown', (e: MouseEvent) => {
                    if (!isContextmenu(e))
                        this.close()
                })
            }
        })

        const position = (this.position || defaultPosition)(mousedown)
        this.menu().open(position.x, position.y, position.direction)
    }

    private close() {
        this.clearCancellers()
        this.menu().close(true)
    }

    private clearCancellers() {
        this.cancelMouseup && this.cancelMouseup()
        this.cancelMousedown && this.cancelMousedown()
    }
}


function defaultPosition(e: MouseEvent) {
    return {
        x: e.clientX,
        y: e.clientY,
        direction: 'right' as Direction
    }
}


function isContextmenu(e: MouseEvent) {
    return e.button == 2 || e.ctrlKey
}
</script>