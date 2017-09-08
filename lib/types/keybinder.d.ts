import { Vue } from 'vue-property-decorator';
export declare class Keybinder extends Vue {
    source: string;
    enabled: boolean;
    off: () => void;
    created(): void;
    updated(): void;
    beforeDestroy(): void;
    render(h: Vue.CreateElement): void;
}
