import * as THREE from 'three'

class MeshWithCoins extends THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial> {
    coins:number;
    constructor(geometry?: THREE.BoxGeometry | undefined, material?: THREE.MeshPhongMaterial | undefined) {
        super(geometry, material);
        this.coins = 0;
    }
}
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const box = new MeshWithCoins(geometry, material);
box.castShadow = true; //default is false
box.position.y = 2.5 //up
box.position.z = 5 //up
export default box


