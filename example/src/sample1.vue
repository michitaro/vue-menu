<template>
    <hsc-menu-style-white>
        <hsc-menubar style="border-radius: 0 0 4pt 0;">
            <hsc-menubaritem label="File">
                <hsc-menuitem label="New" @click="window.alert('New')" />
                <hsc-menuitem label="Open" @click="window.alert('Open')" />
                <hsc-menu-separator/>
                <hsc-menuitem label="Save" @click="window.alert('Save')" :disabled="true" />
                <hsc-menuitem label="Export to">
                    <hsc-menuitem label="PDF" />
                    <hsc-menuitem label="HTML" />
                </hsc-menuitem>
            </hsc-menubaritem>
            <hsc-menubaritem label="Edit">
                <hsc-menuitem label="Undo" keybind="meta+z" @click="window.alert('Undo')" />
                <hsc-menu-separator/>
                <hsc-menuitem label="Cut" keybind="meta+x" @click="window.alert('Cut')" />
                <hsc-menuitem label="Copy" keybind="meta+c" @click="window.alert('Copy')" />
                <hsc-menuitem label="Paste" keybind="meta+v" @click="window.alert('Paste')" :disabled="true" />
            </hsc-menubaritem>
            <hsc-menubaritem label="Checkmark">
                <hsc-menuitem label="Check" @click="checked=true" :disabled="checked" />
                <hsc-menuitem label="Unheck" @click="checked=false" :disabled="!checked" />
                <hsc-menu-separator/>
                <hsc-menuitem label="(Checked)" :checked="checked" :disabled="true" />
            </hsc-menubaritem>
        </hsc-menubar>
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