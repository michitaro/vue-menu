<template>
    <div class="menubaritem" :style="style" @mousedown="mousedown" @mouseover="mouseenter" @mouseleave="mouseleave">
        {{label}}
        <x-menu ref="menu">
            <slot/>
        </x-menu>
    </div>
</template>

<script lang="ts">
import { MenubaritemType } from "./script"
export default MenubaritemType
</script>

<style lang="scss" scoped>
.menubaritem {
    display: inline-block;
    padding: 6pt 0.5em 4pt 0.5em;
}
</style>