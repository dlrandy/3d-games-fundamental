import * as THREE from "three";
import eventBus from "../eventBus";
import CharacterController from "./characterController";

class DisplacementController {
    player!:CharacterController;
    v2!:THREE.Vector2;
    speedReference!:number;
    speed!:number;
    clock!:THREE.Clock;
    timer!:number;
    isJumping!: boolean;
    center!:THREE.Vector3;
    radio!:number;
    setPlayer(player:CharacterController) {
        this.player = player
        this.v2 = new THREE.Vector2();
        this.speedReference = 1.5
        this.speed = this.speedReference
        this.clock = new THREE.Clock();
        this.timer = new Date().getTime()
        this.isJumping = false
        this.center = new THREE.Vector3()
        this.radio = 45
    }
    run() {
        const delta = this.clock.getDelta();
        this.resetTimer()
        if (this.isJumping) return
        if (this.timer + 200 > new Date().getTime()) return
        // this.v2.set(-this.player.x, this.player.y).normalize()
        this.v2.set(Math.sin(this.player.mesh.rotation.y), Math.cos(this.player.mesh.rotation.y))
        this.player.mesh.position.x += this.v2.x * this.speed * delta
        this.player.mesh.position.z += this.v2.y * this.speed * delta
        if (!this.radioEdge()) return
        this.player.mesh.position.x -= this.v2.x * this.speed * delta*1.5
        this.player.mesh.position.z -= this.v2.y * this.speed * delta*1.5

    }
    radioEdge = ()=> {
        if(this.player.obtacle) return true
        return this.player.mesh.position.distanceTo(this.center) > this.radio
    }
    resetTimer = () => {
        if (this.player.x == 0 && this.player.y == 0 || this.isJumping)
            this.timer = new Date().getTime()
    }
    keyListener = (data:any) => {
 console.log("data ", data);
        if (data[0].includes('Shift')) {//shift
            this.speed = (data[1]) ? this.speedReference * 2 : this.speedReference
        }
    }
    jumping = (flag:boolean)=> {
        this.isJumping = flag
    }
    start() {
        eventBus.subscribe('keyListener', this.keyListener)
        this.player.eventBus.subscribe('jumping', this.jumping)
    }
    stop() {
        eventBus.unSubscribe('keyListener', this.keyListener)
    }
}

export default DisplacementController