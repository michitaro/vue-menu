<template>
    <div @contextmenu.prevent.stop="openMenu" style="display: inline-block;">
        <slot/>
        <x-menu ref="menu">
            <slot name="contextmenu" />
        </x-menu>
    </div>
</template>


<script lang="ts">
import { Direction } from "./menu/script";
import { RootlessMenu } from "./rootlessmenu";
import { Component, Vue, Prop } from "vue-property-decorator";


@Component
export default class ContextmenuType extends RootlessMenu {
    @Prop({ type: Function, default: defaultPosition })
    position!: (e: MouseEvent) => { x: number, y: number, direction: Direction }
}


function defaultPosition(e: MouseEvent) {
    return {
        x: e.clientX,
        y: e.clientY,
        direction: 'right' as Direction
    }
}
</script>
