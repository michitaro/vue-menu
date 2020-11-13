<template>
    <div>
        <hsc-menu-style-white>
            <hsc-menu-context-menu refs="contextmenu">
                <div style="display: none"></div>
                <template slot="contextmenu">
                    <hsc-menu-item label="MenuItem 1" />
                    <hsc-menu-item label="MenuItem 2" />
                    <hsc-menu-item label="MenuItem 2">
                        <hsc-menu-item label="MenuItem 4" />
                        <hsc-menu-item label="MenuItem 5" />
                    </hsc-menu-item>
                </template>
            </hsc-menu-context-menu>
        </hsc-menu-style-white>
        <button @click="click">Click Here</button>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        click(e) {
            const contextmenu = this.$refs.contextmenu.$refs.menu
            contextmenu.open()
            contextmenu.setPosition(e.pageX, e.pageY, 'right')
        },
    }
})
</script>
