import eventBus from "../eventBus"
import keyListener from "../keyListener"
import CharacterController from "./characterController"

class InputController {
    player!: CharacterController;
    isJumping: boolean = false;
    setPlayer(player:CharacterController) {
        this.player = player
        this.player.x = 0
        this.player.y = 0
        this.isJumping = false
    }
    run() {
        this.player.x = 0
        this.player.y = 0
        if (this.isJumping) return
        if (keyListener.isPressed('ArrowLeft')) this.player.x -= 1
        if (keyListener.isPressed('ArrowRight')) this.player.x += 1
        if (keyListener.isPressed('ArrowUp')) this.player.y += 1
        if (keyListener.isPressed('ArrowDown')) this.player.y -= 1
    }
    jumping = (flag:boolean) => {
        this.isJumping = flag
    }
    dispatchKeys = (data:any) => {
        this.player.eventBus.dispatch('keyListener', data)
    }
    
    start() {
        this.player.eventBus.subscribe('jumping', this.jumping)
        eventBus.subscribe('keyListener', this.dispatchKeys)
    }
    stop(){
        this.player.eventBus.unSubscribe('jumping', this.jumping)
        eventBus.unSubscribe('keyListener', this.dispatchKeys)
    }
}

export default InputController