import * as THREE from 'three'
import scene from './scene';
import camera from './camera';
import renderer from './renderer';
import box from './box';
import light from './light';
import machine from './loopMachine';
import resize from './resize';
import Xbot, { XbotModes } from './character/Xbot';
import keyListener from './keyListener';
// import Animator from './animator';
import soundHandler from './sound/soundHandler';
// import AnimatorModeAdapter from './character-controller/animatorModeAdapter';
import CharacterController, { MeshObject } from './character-controller/characterController';
import coin from './coints';
import plane from './plane';
import area from './area';
import sky from './sky';
import wall from './wall';
import eventBus from './eventBus';
import './bootstrap';
scene.add(box)
camera.position.set(0,1.8,-3);
camera.lookAt(box.position);

scene.add(light)
scene.add(plane)
scene.add(sky)
scene.add(wall)
scene.add(area)
scene.fog = new THREE.FogExp2(0xcce0ff, 0.05);

keyListener.setCaster((data:any) => {
    eventBus.dispatch('keyListener', data)
})

document.querySelector('button')!.addEventListener('click',()=>{
    document.body.querySelector('h1')!.innerText = 'Press "W A S D"'
    document.body.querySelector('button')!.remove()
    //
    keyListener.start()
    machine.start()
    resize.start(renderer)
    coin.start()
    soundHandler.setAsLoop('environment')
    soundHandler.setVolume('environment', .3)
    soundHandler.play('environment')
})



// resize.start(renderer);

// Xbot.then(mesh=>{
//  console.log("mesh ", mesh);
//     scene.add(mesh);
//     // let anim = new Animator(mesh);
//     // anim.action(1,1,false);
//     // setTimeout(() => {
//     //     anim.action(2,1,false);
//     // }, 2000);
//     // setTimeout(() => {
//     //     anim.action(0, 1 , false);
//     // }, 3200);
//     // anim.start();
//    //=====
//     // let anim = new AnimatorModeAdapter(mesh, XbotModes);
//     // anim.start()
//     // anim.run('left');
//     // setTimeout(() => {
//     //     anim.setMode('run');
//     //     anim.run('left');
//     // }, 3000);
//     //=====
//     (<MeshObject>mesh).modes = XbotModes;
//     const characterController =  new CharacterController(mesh as MeshObject);
//     characterController.start();
//         characterController.collisionWith(box)
//     box.coins = 0
//     characterController.onTriggerEnter(box, () => {
//         box.material.color = new THREE.Color(0xff00000)//RED
//         box.coins += 1;
//         coin.add()//display coin increment
//         if (box.coins > 2) {
//             characterController.collisionWithUndo(box)
//             setTimeout(() => {
//                 document.body.querySelector('h1')!.innerText = 'Well done!'
//                 soundHandler.play('win')
//             }, 500)
//             let flag = false
//             setInterval(() => {
//                 document.body.querySelector('h1')!.innerText = (flag)?'Shift to run!':'Tab to switch camera!'
//                 flag = !flag
//             }, 5000)
//         }
//         soundHandler.play('coin')
//     })
//     characterController.onTriggerExit(box, () => {
//         box.material.color = new THREE.Color(0xffff00)//YELLOW  
//     })
//     // characterController.collisionWith(area)
//     // characterController.onTriggerEnter(area, () => {
//     //     if (box.coins != 0) return characterController.collisionWithUndo(area)
//     //     document.body.querySelector('h1').innerText = 'Press space key to jump'
//     //     setTimeout(() => {
//     //         document.body.querySelector('h1').innerText = ''
//     //     }, 3000);
//     // })
//     soundHandler.play('bep')
// })
// machine.addCallback(()=>{
//     if (keyListener.isPressed('Enter')) {
//         box.rotation.y += 0.01;
//     }
//     renderer.render(scene, camera)
// })

// keyListener.start();

// machine.start();