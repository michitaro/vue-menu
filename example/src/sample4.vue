<template>
    <hsc-menu-style-black>
        <hsc-menu-context-menu style="position: absolute; margin: 50px;">
            <div class="box" style="padding: 1em;">
                Secondary click here
            </div>
            <template slot="contextmenu">
                <hsc-menu-item label="MenuItem 1" />
                <hsc-menu-item label="MenuItem 2" />
            </template>
        </hsc-menu-context-menu>
    
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
    </hsc-menu-style-black>
</template>

<style>
.box {
    box-shadow: 0 0 4pt rgba(0, 0, 0, 0.25);
    border-radius: 20pt;
    background-color: rgba(255, 255, 255, 0.25);
    user-select: none;
    cursor: context-menu;
}
</style>
