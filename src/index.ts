import Vue from 'vue'

import Menubar from "./menubar/index.vue"
import Menubaritem from "./menubaritem/index.vue"
import Contextmenu from "./contextmenu.vue"
import Menu from "./menu/index.vue"
import Menuitem from "./menuitem/index.vue"
import Separator from "./separator.vue"
import { MenubarType } from "./menubar/script"
import { MenuType } from "./menu/script"
import { MenuitemType } from "./menuitem/script"
import { MenuStyle, StyleFactory, StyleWhite, StyleBlack } from "./style"

export {
    Menubar,
    Menu,
    Menubaritem,
    Contextmenu,
    Menuitem,
    Separator,
    MenubarType,
    MenuType,
    MenuitemType,
    MenuStyle,
    StyleFactory,
    StyleBlack,
    StyleWhite,
}

export function install(vue: typeof Vue, options = { prefix: 'hsc-' }) {
    const { prefix } = options
    vue.component(`${prefix}menubar`, Menubar)
    vue.component(`${prefix}menubaritem`, Menubaritem)
    vue.component(`${prefix}contextmenu`, Contextmenu)
    vue.component(`${prefix}menuitem`, Menuitem)
    vue.component(`${prefix}menu-separator`, Separator)
    vue.component(`${prefix}menu-style-black`, StyleBlack)
    vue.component(`${prefix}menu-style-white`, StyleWhite)
}