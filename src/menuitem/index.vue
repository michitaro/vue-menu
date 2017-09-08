<template>
    <div>
        <x-keybinder v-if="keybind" :source="keybind" :enabled="!disabled" @keybindmatch="$emit('click')" />
        <div class="menuitem" :style="style" @mouseenter.stop="mouseenter" @mouseleave="mouseleave" @mouseup="mouseup" @mousedown.stop.prevent>
            <div class="right">
                <span :style="{ visibility: $slots.default ? 'visible' : 'hidden' }">&rtrif;</span>
                <span v-html="keybindHTML" />
            </div>
            <div style="display: inline-block; padding: 0 0.3em;" :style="{ visibility: checked ? 'visible' : 'hidden' }">&check;</div>
            <div v-if="$slots.body" style="display: inline-block;">
                <slot name="body" />
            </div>
            <div v-else style="display: inline-block;">
                {{label}}
            </div>

            <div style="display: inline-block; visibility: hidden; margin: 0 0.5em;">
                <span>&rtrif;</span>
                <span v-html="keybindHTML" />
            </div>
            <div v-if="$slots.default">
                <x-menu ref="childMenu" :parentMenuitem="this">
                    <slot/>
                </x-menu>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { MenuitemType } from "./script"
export default MenuitemType
</script>

<style lang="scss" scoped>
.menuitem {
    padding: 2px 8pt 2px 4pt;
    white-space: nowrap;
}

.right {
    float: right;
}
</style>