<template>
    <div>
        <x-keybinder v-if="keybind" :source="keybind" :enabled="!disabled" @keybindmatch="$emit('click')" />
        <div class="menuitem" :style="style" @mouseenter.stop="mouseenter" @mouseleave="mouseleave" @mouseup="mouseup" @mousedown.stop.prevent>
            <div style="padding: 0 0.3em;" :style="{ visibility: checked ? 'visible' : 'hidden' }">&check;</div>
            <div class="label">
                <slot v-if="$slots.body" name="body" />
                <div v-else v-html="label" />
            </div>
            <div style="padding-left: 1em;">
                <span v-if="$slots.default">&rtrif;</span>
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
    display: flex;
    align-items: baseline;
    padding: 2px 8pt 2px 4pt;
    white-space: nowrap;
}

.label {
    flex-grow: 1;
}
</style>