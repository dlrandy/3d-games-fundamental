import * as THREE from 'three';
import camera from './camera';
class Resize {
    renderer:THREE.Renderer|null;
    constructor() {
        this.renderer = null;
    }
    start = (renderer:THREE.Renderer) => {
        this.renderer = renderer;
        window.addEventListener('resize', this.resize);
    }
    stop = ()=>{
        window.removeEventListener('resize', this.resize);
    }
    resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        this.renderer?.setSize(window.innerWidth, window.innerHeight);
        
    }
}

const resize = new Resize();
export default resize;