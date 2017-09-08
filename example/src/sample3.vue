<template>
    <hsc-menu-style-white>
        <hsc-contextmenu style="margin: 50px;">
            <div class="box" style="padding: 1em;">
                Secondary click here
            </div>
            <template slot="contextmenu">
                <hsc-menuitem label="MenuItem 1" />
                <hsc-menuitem label="MenuItem 2" />
            </template>
        </hsc-contextmenu>
    </hsc-menu-style-white>
</template>


<style>
.box {
    box-shadow: 0 0 4pt rgba(0, 0, 0, 0.25);
    border-radius: 20pt;
    background-color: rgba(255, 255, 255, 0.25);
    user-select: none;
}
</style>