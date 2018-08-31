<template>
    <div>
        <hsc-menu-style-metal>
            <hsc-menu-button-menu class="box" :menuZIndex="2">
                button1
                <template slot="contextmenu">
                    <hsc-menu-item label="MenuItem 1" />
                    <hsc-menu-item label="MenuItem 2" />
                </template>
            </hsc-menu-button-menu>
            <hsc-menu-button-menu class="box" :menuZIndex="2">
                button2
                <template slot="contextmenu">
                    <hsc-menu-item label="MenuItem 1" />
                    <hsc-menu-item label="MenuItem 2" />
                </template>
            </hsc-menu-button-menu>
        </hsc-menu-style-metal>

        <div class="overlay">
        </div>
    </div>
</template>


<style lang="scss" scoped>
.box {
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.25);
  border-radius: 20pt;
  background-color: rgba(255, 255, 255, 0.25);
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
  width: 200px;
  height: 200px;
  vertical-align: middle;
  text-align: center;
}
</style>