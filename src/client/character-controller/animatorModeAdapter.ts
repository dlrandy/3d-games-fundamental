import Animator from "../animator"
import { AnimationNameType, ModesType } from "../character/Xbot"
import { Event, Object3D } from 'three';

class AnimatorModeAdapter {
    modes: ModesType;
    mode: keyof ModesType;
    animator: Animator;
    constructor(mesh: Object3D<Event>, modes: ModesType) {
        this.modes = modes
        this.mode = 'normal'
        this.animator = new Animator(mesh)
    }
    setMode(mode: keyof ModesType) {
        this.mode = mode
    }
    run(animationName: AnimationNameType) {
        if (!this.modes[this.mode]) return
        if (!this.modes[this.mode][animationName]) return
        let animationId = this.modes[this.mode][animationName][0]
        let timeScale = this.modes[this.mode][animationName][1]
        let cycleFlag = this.modes[this.mode][animationName][2]
        this.animator.action(animationId as number, timeScale as number, cycleFlag as boolean)
    }
    start() {
        this.animator.start()
    }
    stop() {
        this.animator.stop()
    }
}

export default AnimatorModeAdapter