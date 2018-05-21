<template>
    <div class="separator" :style="menuStyle.separator">
    </div>
</template>

<script lang="ts">
import { MENU_STYLE_KEY } from "./style";
export default {
    inject: { menuStyle: MENU_STYLE_KEY }
}
</script>


<style lang="scss" scoped>
.separator {
  height: 1pt;
  margin: 4pt 0;
}
</style>
