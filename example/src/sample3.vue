<template>
    <hsc-menu-style-white>
        <hsc-menu-context-menu style="margin: 50px;">
            <div class="box" style="padding: 1em;">
                Secondary click here
            </div>
            <template slot="contextmenu">
                <hsc-menu-item label="MenuItem 1" />
                <hsc-menu-item label="MenuItem 2" />
                <hsc-menu-item label="MenuItem 2">
                    <hsc-menu-item label="MenuItem 4" />
                    <hsc-menu-item label="MenuItem 5" />
                </hsc-menu-item>
            </template>
        </hsc-menu-context-menu>
        <hsc-menu-button-menu style="margin: 50px;" @open="open" @close="close">
            <button>Click Here</button>
            <template slot="contextmenu">
                <hsc-menu-item label="MenuItem 1" />
                <hsc-menu-item label="MenuItem 2" />
                <hsc-menu-item label="MenuItem 2">
                    <hsc-menu-item label="MenuItem 4" />
                    <hsc-menu-item label="MenuItem 5" />
                </hsc-menu-item>
            </template>
        </hsc-menu-button-menu>
    </hsc-menu-style-white>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        open() {
            console.log('open')
        },
        close() {
            console.log('close')
        }
    }
})
</script>


<style>
.box {
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.25);
  border-radius: 20pt;
  background-color: rgba(255, 255, 255, 0.25);
  user-select: none;
  cursor: context-menu;
}
</style>