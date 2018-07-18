import Vue from 'vue'

import Menubar from "./menubar/index.vue"
import Menubaritem from "./menubaritem/index.vue"
import Contextmenu from "./contextmenu.vue"
import Buttonmenu from './buttonmenu.vue'
import Menu from "./menu/index.vue"
import Menuitem from "./menuitem/index.vue"
import Separator from "./separator.vue"
import { MenubarType } from "./menubar/script"
import { MenuType } from "./menu/script"
import { MenuitemType } from "./menuitem/script"
import { MenuStyle, StyleFactory, StyleWhite, StyleBlack, StyleMetal } from "./style"

export {
    Menubar,
    Menu,
    Menubaritem,
    Contextmenu,
    Buttonmenu,
    Menuitem,
    Separator,
    MenubarType,
    MenuType,
    MenuitemType,
    MenuStyle,
    StyleFactory,
    StyleBlack,
    StyleWhite,
    StyleMetal,
}

export function install(vue: typeof Vue, options = { prefix: 'hsc-menu' }) {
    const { prefix } = options
    vue.component(`${prefix}-bar`, Menubar)
    vue.component(`${prefix}-bar-item`, Menubaritem)
    vue.component(`${prefix}-context-menu`, Contextmenu)
    vue.component(`${prefix}-button-menu`, Buttonmenu)
    vue.component(`${prefix}-item`, Menuitem)
    vue.component(`${prefix}-separator`, Separator)
    vue.component(`${prefix}-style-black`, StyleBlack)
    vue.component(`${prefix}-style-white`, StyleWhite)
    vue.component(`${prefix}-style-metal`, StyleMetal)
}