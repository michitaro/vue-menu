<template>
    <div @mousedown="openMenu" style="display: inline-block;">
        <slot/>
        <x-menu ref="menu" :style="menuStyle">
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
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    return {
        x: rect.left,
        y: rect.bottom,
        direction: 'right' as Direction
    }
}
</script>