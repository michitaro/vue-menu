import { Vue } from "vue-property-decorator";
import { MenuStyle } from "../style";
export declare class MenubarType extends Vue {
    menuStyle: MenuStyle;
    active: boolean;
    deactivate(): void;
    private cancelMouseup?;
    private cancelMousedown?;
    private mousedown(mousedown);
    private clearCancellers();
}
