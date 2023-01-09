import cache from "./cache"

class Coin{
    coinDisplay: HTMLDivElement
    counter: number
    constructor(){
        this.coinDisplay = document.createElement('div')
        this.coinDisplay.classList.add('coin-dislay')
        this.counter = 0
    }
    add(){
        this.counter++
        this.coinDisplay.innerText = this.counter + ` Coins`
    }
    start(){
        document.body.appendChild(this.coinDisplay)
    }
    stop(){
        cache.appendChild(this.coinDisplay)
    }
}

const coin = new Coin()

export default coin