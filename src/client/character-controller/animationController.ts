import keyListener from "../keyListener"
import AnimatorModeAdapter from './animatorModeAdapter';
import CharacterController from "./characterController"

class AnimationController {
    player!:CharacterController;
    animatorAdapter!:AnimatorModeAdapter;
    isJumping!:boolean;
    setPlayer(player:CharacterController) {
        this.player = player
        this.animatorAdapter = new AnimatorModeAdapter(this.player.mesh, this.player.mesh.modes)
        this.isJumping = false
    }
    run() {
        if(this.player.obtacle) return
        if(!this.animatorAdapter.animator.inProgress && this.isJumping){
            this.isJumping = false
            this.jumping(this.isJumping)
        }
        if (keyListener.isPressed('Space') && !this.isJumping) {// space
            this.animatorAdapter.setMode('normal')
            this.animatorAdapter.run('jump')
            this.isJumping = true
            this.jumping(this.isJumping)
        } else {
            if (this.player.x != 0 || this.player.y != 0) this.animatorAdapter.run('ahead')
            if (this.player.x == 0 && this.player.y == 0) this.animatorAdapter.run('idle')
        }
    }
    jumping = (flag:boolean) =>{
        this.player.eventBus.dispatch('jumping', flag)//to everyone
    }
    keyListener = (data:any) => {
        if (data[0] == "Shift") {//shift
            this.animatorAdapter.setMode((data[1]) ? 'run' : 'normal')
        }
    }
    start() {
        this.animatorAdapter.start()
        this.player.eventBus.subscribe('keyListener', this.keyListener)
    }
    stop() {
        this.animatorAdapter.stop()
        this.player.eventBus.unSubscribe('keyListener', this.keyListener)
    }
}
export default AnimationController