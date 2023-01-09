import CameraController from "./cameraController"
import machine from "../loopMachine"
import DisplacementController from "./displacementController"
import InputController from "./inputController"
import AnimationController from "./animationController"
import RotationController from "./rotationController"
import CollisionController from "./collisionController"
import { EventBus } from "../eventBus"
import ShadowController from "./shadowController"
import RaycasterController from "./raycasterController"
import * as THREE from 'three';
import { ModesType } from "../character/Xbot"
export class MeshObject  extends THREE.Object3D<Event>{
    modes!:ModesType;
}
class CharacterController {
    mesh: THREE.Object3D&{modes:ModesType};
    components: any[];
    flag: boolean;
    obtacle: boolean;
    eventBus: EventBus;
    x:number = 0;
    y:number = 0;
    camera!:CameraController;
    rotation!:RotationController;
    onTriggerEnter!: (obj: any, callback: any) => void
    onTriggerExit!: (obj: any, callback: any) => void
    collisionWith!: (obj: any, radio?: number) => void
    collisionWithUndo!: (obj: any) => void

    constructor(mesh: MeshObject) {
        this.mesh = mesh
        this.components = []
        this.flag = false
        this.obtacle = false
        this.eventBus = new EventBus()
        this.components.push(new InputController())
        this.components.push(new AnimationController())
        this.components.push(new DisplacementController())
        this.components.push(new RaycasterController())
        this.components.push(new RotationController())
        this.components.push(new CameraController())
        this.components.push(new CollisionController())
        this.components.push(new ShadowController())
    }
    run = () => {
        if (!this.flag) return
        this.components.forEach(component => {
            component.run()
        })
    }
    start = () => {
        if (this.flag) return
        this.flag = true
        this.components.forEach(component => {
            component.setPlayer(this)
        })
        this.components.forEach(component => {
            if (component.start) {
                component.start()
            }
        })
        machine.addCallback(this.run)
    }
    stop = () => {
        this.flag = false
        machine.removeCallback(this.run)
        this.components.forEach(component => {
            if (component.stop) component.stop()
        })
    }
}
export default CharacterController