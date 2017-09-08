export class Sync {
    private q: (() => Promise<void>)[] = []
    private open = true

    async lock(cb: () => Promise<void>) {
        this.q.push(cb)
        await this.challenge()
    }

    private async challenge() {
        if (this.open) {
            this.open = false
            while (this.q.length > 0) {
                const cb = this.q.shift()!
                await cb()
            }
            this.open = true
        }
    }
}