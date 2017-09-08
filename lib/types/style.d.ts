import Vue from 'vue';
export declare type Style = Partial<CSSStyleDeclaration>;
export interface MenuStyle {
    menubar: Style;
    menu: Style;
    separator: Style;
    active: Style;
    disabled: Style;
}
export declare function StyleFactory(menuStyle: MenuStyle): Vue.ComponentOptions<Vue>;
export declare const StyleBlack: Vue.ComponentOptions<Vue>;
export declare const StyleWhite: Vue.ComponentOptions<Vue>;
