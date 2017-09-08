import Vue from 'vue';
import Menubar from "./menubar/index.vue";
import Menubaritem from "./menubaritem/index.vue";
import Contextmenu from "./contextmenu.vue";
import Menu from "./menu/index.vue";
import Menuitem from "./menuitem/index.vue";
import Separator from "./separator.vue";
import { MenubarType } from "./menubar/script";
import { MenuType } from "./menu/script";
import { MenuitemType } from "./menuitem/script";
import { MenuStyle, StyleFactory, StyleWhite, StyleBlack } from "./style";
export { Menubar, Menu, Menubaritem, Contextmenu, Menuitem, Separator, MenubarType, MenuType, MenuitemType, MenuStyle, StyleFactory, StyleBlack, StyleWhite };
export declare function install(vue: typeof Vue, options?: {
    prefix: string;
}): void;
