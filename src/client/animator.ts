import * as THREE from 'three'
import { AnimationAction, AnimationClip, Object3D } from 'three';
import machine from './loopMachine';

class Animator {
    mesh: Object3D;
    mixer: THREE.AnimationMixer;
    clock: THREE.Clock;
    clips: AnimationAction[];
    lastClip: number | null;
    interpolationTime: number;
    inProgress: boolean;
    constructor(mesh: Object3D) {
        this.mesh = mesh;
        this.mixer = new THREE.AnimationMixer(mesh);
        this.clock = new THREE.Clock();
        this.clips = mesh.animations.map(animation => this.mixer.clipAction(animation));
        this.interpolationTime = 0.2;
        this.lastClip = null;
        this.inProgress = false;
    }
    run = () => {
        this.mixer.update(this.clock.getDelta())
    }
    start = () => {
        machine.addCallback(this.run)
    }
    stop = () => {
        machine.removeCallback(this.run);
    }
    onCycleFinished = () => {
        this.inProgress = false;
    }
    action = (animationId: number, timeScale: number, cycleFlag: boolean) => {
        if (this.inProgress) {
            return;
        }
        if (cycleFlag) {
            this.mixer.addEventListener('loop', this.onCycleFinished);
            this.inProgress = true;
        }
        this.mixer.timeScale = timeScale;
        if (this.lastClip === null) {
            this.clips[animationId].play();
            this.lastClip = animationId;
            return;
        }
        if (this.lastClip === animationId) {
            return;
        }
        this.clips[animationId].reset();
        this.clips[animationId].play();
        this.clips[this.lastClip].crossFadeTo(
            this.clips[animationId],
            this.interpolationTime,
            true
        );
        this.lastClip = animationId;
    }
}

export default Animator;