export declare class Sync {
    private q;
    private open;
    lock(cb: () => Promise<void>): Promise<void>;
    private challenge();
}
