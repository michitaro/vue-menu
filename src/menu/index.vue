<template>
    <div class="fixed">
        <transition :name="fade">
            <div ref="menu" v-show="isOpen" class="menu" @mousedown.stop.prevent @mouseup.stop :style='style'>
                <slot/>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { MenuType } from "./script"
export default MenuType
</script>

<style lang="scss" >
.menu {
    position: absolute;
    display: inline-block;
    font-family: sans-serif;
    border-radius: 4pt;
    cursor: default;
    user-select: none;
    overflow: auto;
}

.fixed {
    position: fixed;
    top: 0;
    left: 0;
}

.fade-leave-active {
    transition: opacity .2s ease;
}

.fade-leave-to {
    opacity: 0;
}
</style>