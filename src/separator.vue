<template>
    <div class="separator" :style="menuStyle.separator">
    </div>
</template>

<script lang="ts">
export default {
    inject: ['menuStyle']
}
</script>


<style lang="scss" scoped>
.separator {
    height: 1pt;
    margin: 4pt 0;
}
</style>
