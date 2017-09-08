import { Vue } from "vue-property-decorator";
import { MenubarType } from "../menubar/script";
import { MenuStyle } from "../style";
export declare class MenubaritemType extends Vue {
    label: string;
    menubar: MenubarType;
    menuStyle: MenuStyle;
    hover: boolean;
    isOpen: boolean;
    mounted(): void;
    readonly style: Partial<CSSStyleDeclaration>;
    private menu();
    private activate();
    private mousedown();
    private mouseenter();
    private mouseleave();
    readonly active: boolean;
}
