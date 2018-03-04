<template>
    <my-theme>
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
            <hsc-menu-bar-item label="File">
                <hsc-menu-item label="New" />
                <hsc-menu-item label="Open" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Save" :disabled="true" />
                <hsc-menu-item label="Export to">
                    <hsc-menu-item label="PDF" />
                    <hsc-menu-item label="HTML" />
                </hsc-menu-item>
            </hsc-menu-bar-item>
            <hsc-menu-bar-item label="Edit">
                <hsc-menu-item label="Undo" keybind="meta+z" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Cut" keybind="meta+x" />
                <hsc-menu-item label="Copy" keybind="meta+c" />
                <hsc-menu-item label="Paste" keybind="meta+v" :disabled="true" />
            </hsc-menu-bar-item>
        </hsc-menu-bar>
    </my-theme>
</template>

<script lang="ts">
import { StyleFactory } from '../../src'
import Vue from 'vue'

const active = {
    backgroundColor: '#436f7c'
}

const disabled = {
    opacity: '0.5'
}

const separator = {
    backgroundColor: 'rgba(255, 0, 0, 0.5)'
}

export default <any>{
    components: {
        'my-theme': StyleFactory({
            menu: {
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.25), #436f7c)',
                color: 'white',
                boxShadow: '0 2pt 4pt rgba(0, 0, 0, 0.5)'
            },
            menubar: {
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.25), #436f7c)',
                color: 'white',
                boxShadow: '0 4pt 4pt rgba(0, 0, 0, 0.25)'
            },
            active,
            disabled,
            separator,
            animation: true,
        })
    }
}
</script>