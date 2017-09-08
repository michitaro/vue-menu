<template>
    <hsc-menu-style-white>
        <hsc-menubar style="border-radius: 0 0 4pt 0;">
            <hsc-menubaritem label="File" />
            <hsc-menubaritem label="Edit" />
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
