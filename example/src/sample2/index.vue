<template>
    <hsc-menu-style-white>
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
            <hsc-menu-bar-item label="File">
                <hsc-menu-item label="Open Directory" :disabled="true" />
            </hsc-menu-bar-item>
            <hsc-menu-bar-item label="Directory">
                <directory />
            </hsc-menu-bar-item>
        </hsc-menu-bar>
    </hsc-menu-style-white>
</template>

<script lang="ts">
import directory from './directory'

export default <any>{
    components: { directory }
}
</script>
