<template>
    <hsc-menu-style-white>
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
            <hsc-menu-bar-item label="File">
                <hsc-menu-item label="New" @click="window.alert('New')" />
                <hsc-menu-item label="Open" @click="window.alert('Open')" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Save" @click="window.alert('Save')" :disabled="true" />
                <hsc-menu-item label="Export to">
                    <hsc-menu-item label="PDF" />
                    <hsc-menu-item label="HTML" />
                </hsc-menu-item>
            </hsc-menu-bar-item>
            <hsc-menu-bar-item label="Edit">
                <hsc-menu-item label="Undo" keybind="meta+z" @click="window.alert('Undo')" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Cut" keybind="meta+x" @click="window.alert('Cut')" />
                <hsc-menu-item label="Copy" keybind="meta+c" @click="window.alert('Copy')" />
                <hsc-menu-item label="Paste" keybind="meta+v" @click="window.alert('Paste')" :disabled="true" />
            </hsc-menu-bar-item>
            <hsc-menu-bar-item label="Checkmark">
                <hsc-menu-item label="Check" @click="checked=true" :disabled="checked" />
                <hsc-menu-item label="Unheck" @click="checked=false" :disabled="!checked" />
                <hsc-menu-separator/>
                <hsc-menu-item :label="checked ? '😃 Checked' : '😯 Not Checked'" :checked="checked" @click="checked = !checked" />
            </hsc-menu-bar-item>
            <hsc-menu-bar-item label="Window.open">
                <hsc-menu-item label="vue-menu" @click="window.open('https://github.com/michitaro/vue-menu')" :sync="true" />
                <hsc-menu-item label="vue-window" @click="window.open('https://github.com/michitaro/vue-window')" :sync="true" />
            </hsc-menu-bar-item>
        </hsc-menu-bar>
    </hsc-menu-style-white>
</template>

<script lang="ts">

export default <any>{
    data() {
        return { checked: true }
    },
    computed: {
        window() { return window }
    }
}
</script>