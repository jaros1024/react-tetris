import SharedStore from './SharedStore';
import {observable} from 'mobx';
import Block from '../util/Block';


class GameStore extends SharedStore {
    @observable level = 1;
    @observable score = 0;
    @observable nextBlocks = [];

    movingBlock = 0;
    timer = null;
    speed = 1;
    stop = false;

    constructor() {
        super();

        this.initNextBlocks();
    }

    initNextBlocks() {
        for (let i = 0; i < 3; i++) {
            this.nextBlocks.push(this.getRandomInt(1,7));
        }
    }

    initKeyHandle() {
        document.onkeyup = (e) => {
            if (e.keyCode == 38) {
                // UP
            }
            else if (e.keyCode == 39) {
                this.movingBlock.rotateRight();
            }
            else if (e.keyCode == 40) {
                // DOWN
            }
            else if (e.keyCode == 37) {
                this.movingBlock.rotateLeft();
            }
        };
    }

    resetKeyHandle() {
        document.onkeyup = () => {};
    }

    run() {
        this.initKeyHandle();
        this.mainLoop().then(() => {
            this.resetKeyHandle();
        });
    }

    async mainLoop() {
        let date = new Date();
        while (!this.stop) {
            let time1 = date.getTime();
            this.doUpdate();
            let timeElapsed = (date.getTime() - time1);
            let timeToSleep = this.baseTime() - timeElapsed;
            await new Promise(r => setTimeout(r, timeToSleep));
        }
    }

    baseTime() {
        let result = (1000 - (this.level - 1) * 100);
        if (result < 500) {
            return 500;
        }
        return result;
    }

    doUpdate() {
        if (!this.movingBlock) {
            this.movingBlock = new Block();
            this.movingBlock.number = this.nextBlocks[0];
            this.updateNextBlocks();
        }
        else {
            this.movingBlock.position++;
        }
    }

    updateNextBlocks() {
        let newBlock = this.getRandomInt(1, 7);
        let newArr = this.nextBlocks.slice();
        newArr.shift();
        newArr.push(newBlock);
        this.nextBlocks = newArr;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const gameStore = new GameStore();

export default gameStore;