class LoopMachine {
    looping: boolean;
    callbacks: Array<() => void>;
    constructor() {
        this.looping = false;
        this.callbacks = [];
    }
    addCallback(callback: () => void) {
        this.callbacks.push(callback);
    }
    removeCallback(callback: () => void) {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
    }
    run = () => {
        if (!this.looping) {
            return;
        }
        this.callbacks.forEach(cb => cb());
        requestAnimationFrame(this.run);
    }
    start = () => {
        if (this.looping) {
            return;
        }
        this.looping = true;
        this.run();
    }
    stop = () => {
        this.looping = false;
    }
}
const machine = new LoopMachine();
export default machine;