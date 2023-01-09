import { AnimationAction, AnimationClip, Group, Mesh, Object3D, Vector } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
class Loader {
    loader: FBXLoader;
    animationPromises: Promise<number>[];
    model: Promise<Object3D>;
    constructor(modelFileUrl: string,
        urlAnimationList: string[], scale: number) {
        this.loader = new FBXLoader();
        this.animationPromises = [];
        let animations: AnimationClip[] = [];
        const modelPromise = new Promise<Object3D>((resolve) => {
            this.loader.load(modelFileUrl, function onload(object: Object3D) {
                object.scale.set(scale, scale, scale);
                object.traverse((child) => {
                    if ((<THREE.Mesh>child).isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                })
                object.castShadow = true;
                object.receiveShadow = true;
                resolve(object);
            })
        });
        urlAnimationList.forEach((_, index) => {
            this.animationPromises[index] = new Promise(resolve => {
                this.loader.load(urlAnimationList[index], object => {
                    object.scale.set(scale, scale, scale);
                    animations[index * 1] = object.animations[0];
                    resolve(index);
                })
            })
        });
        const joinerPromise = Promise.all(this.animationPromises);
        this.model = new Promise(resolve => {
            Promise.all([modelPromise, joinerPromise]).then(data => {
                const object = data[0];
                if (animations.length > 0) {
                    object.animations = animations;
                }
                resolve(object);
            })
        })
    }
    getModel() {
        return this.model
    }
}
export default Loader;