<template>
    <div @contextmenu="contextmenu" style="display: inline-block;">
        <slot/>
        <x-menu ref="menu">
            <slot name="contextmenu" />
        </x-menu>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Menu from "../menu/index.vue"
import { MenuType } from "../menu/script"
import { once } from "../event"

@Component({
    components: { XMenu: Menu }
})
export default class ContextmenuType extends Vue {
    private cancelMouseup?: () => void
    private cancelMousedown?: () => void

    private menu() {
        return this.$refs.menu as MenuType
    }

    contextmenu(mousedown: MouseEvent) {
        mousedown.preventDefault()

        console.log('CONTEXTMENU')
        this.clearCancellers()

        // if (this.menu().isOpen) {
        //     return this.close()
        // }

        this.cancelMouseup = once(document, 'mouseup', mouseup => {
            if (mouseup.timeStamp - mousedown.timeStamp >= 500)
                this.close()
            else {
                this.cancelMousedown = once(document, 'mousedown', (e: MouseEvent) => {
                    console.log(`MOUSEDOWN${e.button}`)
                    // this.close()
                })
            }
        })
        this.menu().open(mousedown.clientX, mousedown.clientY)
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
</script>