<template>
    <div class="menubar" :style="menuStyle.menubar" @mousedown.prevent="mousedown">
        <slot/>
    </div>
</template>


<script lang="ts">
import { MenubarType } from "./script"
export default MenubarType
</script>


<style lang="scss" scoped>
.menubar {
    display: inline-block;
    font-family: sans-serif;
    padding: 0 0.5em;
    user-select: none;
    cursor: default;
}
</style>