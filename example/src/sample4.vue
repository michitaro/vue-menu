<template>
    <hsc-menu-style-black>

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
    
        <hsc-contextmenu style="position: absolute; margin: 50px; z-index: -1;">
            <div class="box" style="padding: 1em;">
                Secondary click here
            </div>
            <template slot="contextmenu">
                <hsc-menuitem label="MenuItem 1" />
                <hsc-menuitem label="MenuItem 2" />
            </template>
        </hsc-contextmenu>
        
    </hsc-menu-style-black>
</template>

<style>
.box {
    box-shadow: 0 0 4pt rgba(0, 0, 0, 0.25);
    border-radius: 20pt;
    background-color: rgba(255, 255, 255, 0.25);
    user-select: none;
}
</style>
