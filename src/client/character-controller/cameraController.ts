import * as THREE from "three";
import camera from "../camera"
import CharacterController from "./characterController"

type CameraControllerTypes = {
    battle: Function,//far
    dialog: Function,//near
}
class CameraController {
    player!:CharacterController;
    target!:THREE.Vector3;
    types!:CameraControllerTypes;
    type!: CameraControllerTypes[keyof CameraControllerTypes];
    flag!:boolean;
    setPlayer(player:CharacterController) {
        this.player = player
        this.player.camera = this
        this.target = new THREE.Vector3()
        this.types = {
            battle: this.battle,//far
            dialog: this.dialog,//near
        }
        this.type = this.types.battle
        this.flag = false
    }
    swticher = (data:any) => {
        if (data[0] == 'Tab' && data[1]) {//tab
            this.flag = !this.flag
            this.type = (!this.flag) ? this.types.battle : this.types.dialog
        }
    }
    run() {
        if(this.player.obtacle) return
        this.type()
    }
    battle = () => {
        camera.position.x = this.player.mesh.position.x - 0
        camera.position.z = this.player.mesh.position.z - 4
        camera.position.y = this.player.mesh.position.y + 4
        this.target.set(this.player.mesh.position.x, this.player.mesh.position.y + 1, this.player.mesh.position.z)
        camera.lookAt(this.target)
    }
    dialog = ()=> {
        camera.position.x = this.player.mesh.position.x -1
        camera.position.z = this.player.mesh.position.z - 1.5
        camera.position.y = this.player.mesh.position.y + 1.8
        this.target.set(this.player.mesh.position.x -1, this.player.mesh.position.y + 1.5, this.player.mesh.position.z)
        camera.lookAt(this.target)
    }
    start() {
        this.player.eventBus.subscribe('keyListener', this.swticher)
    }
    stop() {
        this.player.eventBus.unSubscribe('keyListener', this.swticher)
    }
}
export default CameraController