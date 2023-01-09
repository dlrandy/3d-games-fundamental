import { directionalLight } from "../light"
import scene from "../scene"
import CharacterController from "./characterController"

class ShadowController {
    player!:CharacterController;
    setPlayer(player:CharacterController) {
        this.player = player
        scene.add(directionalLight.target)
    }
    run() {
        directionalLight.position.set(
            this.player.mesh.position.x + 5,
            this.player.mesh.position.y + 5,
            this.player.mesh.position.z - 2
        )
        directionalLight.target.position.set(
            this.player.mesh.position.x,
            this.player.mesh.position.y,
            this.player.mesh.position.z
        )
        // directionalLight.target.updateMatrixWorld() 
    }
}
export default ShadowController