class LoopMachine {
    flag: boolean;
    callbacks: Array<() => void>;
    constructor() {
        this.flag = false;
        this.callbacks = [];
    }
    addCallback(callback: () => void) {
        this.callbacks.push(callback);
    }
    removeCallback(callback: () => void) {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
    }
    run = () => {
        if (!this.flag) {
            return;
        }
        this.callbacks.forEach(cb => cb());
        requestAnimationFrame(this.run);
    }
    start = () => {
        if (this.flag) {
            return;
        }
        this.flag = true;
        this.run();
    }
    stop = () => {
        this.flag = false;
    }
}
const machine = new LoopMachine();
export default machine;