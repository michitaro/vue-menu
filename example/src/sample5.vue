<template>
    <my-theme>
        <hsc-menubar style="border-radius: 0 0 4pt 0;">
            <hsc-menubaritem label="File">
                <hsc-menuitem label="New" />
                <hsc-menuitem label="Open" />
                <hsc-menu-separator/>
                <hsc-menuitem label="Save" :disabled="true" />
                <hsc-menuitem label="Export to">
                    <hsc-menuitem label="PDF" />
                    <hsc-menuitem label="HTML" />
                </hsc-menuitem>
            </hsc-menubaritem>
            <hsc-menubaritem label="Edit">
                <hsc-menuitem label="Undo" keybind="meta+z" />
                <hsc-menu-separator/>
                <hsc-menuitem label="Cut" keybind="meta+x" />
                <hsc-menuitem label="Copy" keybind="meta+c" />
                <hsc-menuitem label="Paste" keybind="meta+v" :disabled="true" />
            </hsc-menubaritem>
        </hsc-menubar>
    </my-theme>
</template>

<script>
import { StyleFactory } from '../../src'
import Vue from 'vue'

const baseColor = {
    backgroundColor: '#365c68',
    color: 'white',
    boxShadow: '0 4pt 4pt rgba(0, 0, 0, 0.25)'
}

const active = {
    backgroundColor: '#436f7c'
}

const disabled = {
    opacity: '0.5'
}

const separator = {
    backgroundColor: '#f00'
}

export default {
    components: {
        'my-theme': StyleFactory({
            menu: baseColor,
            menubar: baseColor,
            active,
            disabled,
            separator
        })
    }
}
</script>