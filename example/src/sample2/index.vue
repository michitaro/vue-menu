<template>
    <hsc-menu-style-white>
        <hsc-menubar style="border-radius: 0 0 4pt 0;">
            <hsc-menubaritem label="File">
                <hsc-menuitem label="Open Directory" :disabled="true" />
            </hsc-menubaritem>
            <hsc-menubaritem label="Edit">
                <hsc-menuitem label="Open Directory" :disabled="true" />
            </hsc-menubaritem>
            <hsc-menubaritem label="Directory">
                <directory />
            </hsc-menubaritem>
        </hsc-menubar>
    </hsc-menu-style-white>
</template>

<script>
import directory from './directory'

export default {
    components: { directory }
}
</script>
