import Vue from 'vue'


export type Style = Partial<CSSStyleDeclaration>


export interface MenuStyle {
    menubar: Style
    menu: Style
    separator: Style
    active: Style
    disabled: Style
}


export function StyleFactory(menuStyle: MenuStyle): Vue.ComponentOptions<Vue> {
    return {
        provide() {
            return { menuStyle }
        },
        render(this: Vue, h: Vue.CreateElement) {
            return h('div', this.$slots.default)
        }
    }
}


export const StyleBlack: Vue.ComponentOptions<Vue> = StyleFactory((() => {
    const base: Style = {
        backgroundColor: 'rgba(31, 31, 31, 0.9)',
        color: 'white',
        boxShadow: '0 0 4pt rgba(255, 255, 255, 0.25)',
    }
    return {
        menu: base,
        menubar: base,
        separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
        active: { backgroundColor: 'rgba(127, 127, 127, 0.75)' },
        disabled: { opacity: '0.5' },
    }
})())


export const StyleWhite: Vue.ComponentOptions<Vue> = StyleFactory((() => {
    const base: Style = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)',
    }
    return {
        menu: base,
        menubar: base,
        separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
        active: { backgroundColor: 'rgba(127, 127, 127, 0.75)', color: '#fff' },
        disabled: { opacity: '0.5' },
    }
})())