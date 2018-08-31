<template>
    <div>
        <hsc-menu-style-metal>
            <hsc-menu-button-menu :menuZIndex="3">
                <div class="box">button1</div>
                <template slot="contextmenu">
                    <hsc-menu-item label="MenuItem 1" />
                    <hsc-menu-item label="MenuItem 2" />
                </template>
            </hsc-menu-button-menu>
            <hsc-menu-button-menu :menuZIndex="3">
                <div class="box" style="z-index: 2; position: relative;">button2</div>
                <template slot="contextmenu">
                    <hsc-menu-item label="MenuItem 1" />
                    <hsc-menu-item label="MenuItem 2" />
                </template>
            </hsc-menu-button-menu>
        </hsc-menu-style-metal>

        <div class="overlay" style="z-index: 1;">
        </div>
    </div>
</template>


<style lang="scss" scoped>
.box {
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.25);
  border-radius: 20pt;
  background-color: lightgray;
  margin: 20px;
  padding: 20px;
}

.overlay {
  $color: orange;
  position: absolute;
  top: 50px;
  border: $color 2px solid;
  border-radius: 4pt;
  background-color: rgba($color, 0.25);
  width: 300px;
  height: 300px;
  margin: 4px;
  vertical-align: middle;
  text-align: center;
}
</style>