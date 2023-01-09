import * as THREE from "three";
import scene from "../scene";
import CharacterController from "./characterController";
type ObjectType = THREE.Object3D<THREE.Event>;
class CollisionController {
    player!: CharacterController;
    position!: THREE.Vector3 | null;
    size: any;
    objectWraper!: THREE.Box3;
    meshWraper!: THREE.Box3;
    helper!: THREE.Box3Helper;
    flag!: boolean;
    objectList!: Record<string, { obj: ObjectType, status: boolean, isNear: boolean, radio: number }>;
    timeToChekIfNear!: number;
    intervalTime!: number;
    validateFlag!: boolean;
    setPlayer(player: CharacterController) {
        this.player = player
        this.player.onTriggerEnter = this.onTriggerEnter.bind(this)//alias
        this.player.onTriggerExit = this.onTriggerExit.bind(this)//alias
        this.player.collisionWith = this.addObject.bind(this)//alias
        this.player.collisionWithUndo = this.removeObject.bind(this)//alias
        this.position = null
        this.size = new THREE.Vector3(.25, 1.6, .25)
        this.objectWraper = new THREE.Box3();
        this.meshWraper = new THREE.Box3();
        this.helper = new THREE.Box3Helper(this.meshWraper, new THREE.Color(0xffff00));
        this.flag = false
        this.objectList = {}
        this.timeToChekIfNear = new Date().getTime() //optimisation purposes
        this.intervalTime = 2 //optimisation purposes
        this.validateFlag = false //optimisation purposes
    }
    addObject(obj: ObjectType, radio = 3) {
        let status = false // no collision
        let isNear = false // it is not near to the player
        // the radio is the distance to consider one object near enough
        this.objectList[obj.uuid] = { obj, status, isNear, radio }
    }
    removeObject(obj: ObjectType) {
        delete this.objectList[obj.uuid]
    }
    run() {
        this.position = this.player.mesh.position.clone()
        this.position.y += (this.flag) ? 1.2 : .8 // when the player is jumpling
        this.meshWraper.setFromCenterAndSize(this.position, this.size)
        this.validate()
    }
    validate() {
        //identify closer elements
        if (this.timeToChekIfNear < new Date().getTime()) {
            this.timeToChekIfNear = new Date().getTime() + this.intervalTime * 1000 + 1 * Math.random() * 1000
            this.validateFlag = false
            Object.values(this.objectList).forEach(element => {
                element.isNear = (element.obj.position.distanceTo(this.player.mesh.position) < element.radio)
                if (element.isNear) this.validateFlag = true
            })
        }
        if (!this.validateFlag) return// no elements around
        Object.values(this.objectList).forEach(element => {
            if (!element.isNear) return // only near elements
            let obj = element.obj
            this.objectWraper.setFromObject(obj)
            //handling collisions
            let collided = this.meshWraper.intersectsBox(this.objectWraper)
            if (obj.uuid in this.objectList && !this.objectList[obj.uuid].status && collided) {
                this.player.eventBus.dispatch('onTriggerEnter', obj)
            }
            if (obj.uuid in this.objectList && this.objectList[obj.uuid].status && !collided) {
                this.player.eventBus.dispatch('onTriggerExit', obj)
            }
            if (obj.uuid in this.objectList) this.objectList[obj.uuid].status = collided
        })
    }
    delay() {
        setTimeout(() => { this.flag = true }, 800);
        setTimeout(() => { this.flag = false }, 1000);
    }
    jumping = (isJumping: boolean) => {
        if (isJumping) this.delay()
    }
    onTriggerEnter(obj: any, callback: Function) {
        this.player.eventBus.subscribe('onTriggerEnter', (innerObj: any) => {
            if (obj === innerObj) callback()
        })
    }
    onTriggerExit(obj: any, callback: Function) {
        this.player.eventBus.subscribe('onTriggerExit', (innerObj: any) => {
            if (obj === innerObj) callback()
        })
    }
    start() {
        // scene.add(this.helper);
        this.player.eventBus.subscribe('jumping', this.jumping)
    }
    stop() {
        this.player.eventBus.unSubscribe('jumping', this.jumping)
        scene.remove(this.helper);
    }
}

export default CollisionController
