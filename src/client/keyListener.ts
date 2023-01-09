class KeyListener {
    keys: Record<string, boolean>;
    caster: (...a: any) => void;
    constructor(caster?: (...a: any) => void) {
        this.keys = {};
        this.caster = caster || console.log;
    }
    setCaster(caster: (...a: any) => void) {
        this.caster = caster;
    }
    isPressed = (key: string) => {
        return (this.keys[key]) ? this.keys[key] : false
    }
    down = (e: KeyboardEvent) => {
        console.log("e.code ", e.code, e.code.length);
        if (this.keys[e.code]) {
            return;
        }
        this.keys[e.code] = true;
        this.caster([e.code, true, this.keys]);
        e.preventDefault();
        e.stopPropagation();
    }
    up = (e: KeyboardEvent) => {
        this.keys[e.code] = false;
        this.caster([e.code, false, this.keys]);
        e.preventDefault();
        e.stopPropagation();
    }
    start() {
        window.addEventListener('keydown', this.down)
        window.addEventListener('keyup', this.up)
    }
    stop() {
        window.removeEventListener('keydown', this.down)
        window.removeEventListener('keyup', this.up)
    }
}

const keyListener = new KeyListener();

export default keyListener;