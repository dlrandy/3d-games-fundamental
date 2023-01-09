import { Object3D } from "three"
import Loader from "../Loader"
import fileList from "./FileList"


const folder = "character/"

const list:string[] = []

Object.keys(fileList).forEach((element, index) => {
    list[index] = folder + "animations/" + fileList[index]
})
export const XbotModes = {
    'normal':{
        'idle':[0, 1, false],
        'jump':[1, 1, true],
        'left':[2, 1, false],
        'right':[5, 1, false],
        'ahead':[9, 1, false],
        'back':[9, -1, false],
    },
    'run':{
        'idle':[0, 1, false],
        'jump':[1, 1, true],
        'left':[3, 1, false],
        'right':[6, 1, false],
        'ahead':[8, 1, false],
        'back':[9, -1, false],
    },
}
export type ModesType = typeof XbotModes;
export type AnimationNameType = keyof typeof XbotModes.normal;
const Xbot:Promise<Object3D<THREE.Event>> = (new Loader(folder + 'xbot.fbx', list, 0.01)).getModel()

export default Xbot
