
import soundList from './soundList';
type SoundListType = { coin: string; environment: string; win: string; bep: string; };
interface AudioElment extends HTMLMediaElement { _volume?: number; currentTime: number }
class SoundHandler {

    audioList: SoundListType;
    nodeList: Record<keyof SoundListType, AudioElment>;
    constructor(soundList: SoundListType) {
        this.nodeList = {} as Record<keyof SoundListType, AudioElment>;
        this.audioList = {} as SoundListType;
        if (soundList) this.setSoundList(soundList)
    }

    setSoundList(soundList: SoundListType) {
        this.audioList = soundList
        Object.keys(this.audioList).map((name: string) => {

            if (this.audioList?.[name as any as keyof SoundListType]) {

                let audio: AudioElment = new Audio(this.audioList[name as any as keyof SoundListType]);
                audio.volume = 1;
                audio._volume = 1;
                this.nodeList[name as any as keyof SoundListType] = audio
                document.body.appendChild(audio);
            }
        })
    }

    play = (name: keyof SoundListType) => {
        if (this.nodeList?.[name] != null) {
            this.nodeList[name].pause();
            this.nodeList[name].currentTime = 0;
            this.nodeList[name].play()
        }
    }

    setVolume(sound: keyof SoundListType, value: number) {
        this.nodeList[sound].volume = value;
    }

    updateGeneralVolumen(generalVolume: number) {
        Object.keys(this.audioList).map(name => {
            let audio = this.nodeList[name as keyof SoundListType]
            audio._volume = audio._volume || 1;
            audio.volume = audio._volume * generalVolume;
        })
    }

    setAsLoop(name: keyof SoundListType,) {
        this.nodeList[name].loop = true
    }

    stop(name: keyof SoundListType) {
        this.nodeList[name].pause();
        this.nodeList[name].currentTime = 0;
    }

    stopAll() {
        Object.keys(this.audioList).map(name => {
            const alias = name as keyof SoundListType;
            this.nodeList[alias].pause();
            this.nodeList[alias].currentTime = 0;
        })
    }

}

const soundHandler = new SoundHandler(soundList)

export default soundHandler