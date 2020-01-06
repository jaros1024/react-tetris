import SharedStore from './SharedStore';
import mainStore from './MainStore';
import {observable, computed, action, configure, toJS, runInAction} from 'mobx';
import Block from '../util/Block';


const BOARD_SIZE_X = 10;
const BOARD_SIZE_Y = 20;

const DIRECTION = {UP: 1, RIGHT: 2, DOWN: 3, LEFT: 4};

configure({enforceActions: 'always'})


class GameStore extends SharedStore {
    @observable level = 1;
    @observable score = 0;
    @observable nextBlocks = [];
    @observable gameOver = false;
    @observable paused = false;

    @observable board = [];
    solidBoard = [];

    movingBlock = null;

    constructor() {
        super();

        this.initNextBlocks();
        this.initBoard();
    }

    @action
    initNextBlocks() {
        let nextBlocks = [];
        for (let i = 0; i < 3; i++) {
            nextBlocks.push(this.getRandomInt(1,7));
        }
        this.nextBlocks = nextBlocks;
    }

    @action
    initBoard() {
        for (let i = 0; i < BOARD_SIZE_Y; i++) {
            this.board[i] = [];
            for (let j = 0; j < BOARD_SIZE_X; j++) {
                this.board[i][j] = 0;
            }
        }
        this.solidBoard = toJS(this.board);
    }

    @action
    initKeyHandle() {
        document.onkeyup = (e) => {
            if (e.keyCode == 38) {
                // UP
                let matrix = this.movingBlock.matrix;
                this.movingBlock.rotateRight();
                if (this.hasCollision()) {
                    this.movingBlock.matrix = matrix;
                }
                this.drawBoard();
            }
            else if (e.keyCode == 39) {
                // RIGHT
                if (!this.hasCollision(DIRECTION.RIGHT)) {
                    this.movingBlock.moveRight(BOARD_SIZE_X);
                    this.drawBoard();
                }
            }
            else if (e.keyCode == 40) {
                // DOWN
                if (!this.hasCollision()) {
                    if (this.movingBlock.moveDown(BOARD_SIZE_Y)) {
                        this.drawBoard();
                        runInAction(() => {this.score++});
                    }
                }
            }
            else if (e.keyCode == 37) {
                // LEFT
                if (!this.hasCollision(DIRECTION.LEFT)) {
                    this.movingBlock.moveLeft();
                    this.drawBoard();
                }
            }
            else if (e.keyCode == 27) {
                // ESC
                this.pause();
            }
        };
    }

    resetKeyHandle() {
        document.onkeyup = () => {};
    }

    run() {
        this.movingBlock = null;
        this.initKeyHandle();
        this.mainLoop();
    }

    async mainLoop() {
        let date = new Date();
        while (!this.gameOver && !this.paused) {
            let time1 = date.getTime();
            this.doUpdate();
            let timeElapsed = (date.getTime() - time1);
            let timeToSleep = this.baseTime() - timeElapsed;
            await new Promise(r => setTimeout(r, timeToSleep));
        }
    }

    baseTime() {
        let result = (850 - (this.level - 1) * 100);
        if (result < 500) {
            return 500;
        }
        return result;
    }

    @action
    doUpdate() {
        while (this.isBottomRowFull) {
            this.moveRowsDown();
            this.drawBoard();
            this.score += 100;
        }
        if (!this.movingBlock || this.hasCollision()) {
            if (this.movingBlock) {
                this.solidBoard = this.board;
            }
            this.movingBlock = new Block(this.nextBlocks[0]);
            this.updateNextBlocks();
            if (this.hasCollision()) {
                this.gameOver = true;
                mainStore.updateTopScores(this.score);
            }
        }
        else {
            this.movingBlock.posY++;
        }
        this.drawBoard();
    }

    @action
    drawBoard() {
        let newBoard = JSON.parse(JSON.stringify(this.solidBoard));
        
        let startX = this.movingBlock.posX;
        let startY = this.movingBlock.posY;
        for (let i = 0; i < this.movingBlock.matrix.length; i++) {
            for (let j = 0; j < this.movingBlock.matrix[i].length; j++) {
                if (this.movingBlock.matrix[i][j]) {
                    newBoard[startY + i][startX + j] = this.movingBlock.matrix[i][j];
                }
            }
        }

        this.board = newBoard;
    }

    hasCollision(direction) {
        let startX, startY;
        if (direction === DIRECTION.RIGHT) {
            startX = this.movingBlock.posX + 1;
            startY = this.movingBlock.posY;
        }
        else if (direction === DIRECTION.LEFT) {
            startX = this.movingBlock.posX - 1;
            startY = this.movingBlock.posY;
        }
        else {
            startX = this.movingBlock.posX;
            startY = this.movingBlock.posY + 1;
        }

        if (startY + this.movingBlock.matrix.length > BOARD_SIZE_Y) {
            return true;
        }

        if (startX < 0 || startX + this.movingBlock.matrix[0].length > BOARD_SIZE_X) {
            return true;
        }

        for (let i = 0; i < this.movingBlock.matrix.length; i++) {
            for (let j = 0; j < this.movingBlock.matrix[i].length; j++) {
                if (this.solidBoard[startY + i][startX + j] && this.movingBlock.matrix[i][j]) {
                    return true;
                }
            }
        }
        return false;
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

    @action
    pause() {
        this.paused = true;
    }

    @action
    unpause() {
        this.paused = false;
        this.mainLoop();
    }

    @action
    moveRowsDown() {
        for (let i = BOARD_SIZE_Y - 1; i >= 1; i--) {
            for (let j = 0; j < BOARD_SIZE_X; j++) {
                this.solidBoard[i][j] = this.solidBoard[i-1][j];
            }
        }
        for (let j = 0; j < BOARD_SIZE_X; j++) {
            this.solidBoard[0][j] = 0;
        }
    }

    @computed
    get isBottomRowFull() {
        if (!this.board.length) {
            return false;
        }

        for (let i = 0; i < BOARD_SIZE_X; i++) {
            if (!this.board[BOARD_SIZE_Y-1][i]) {
                return false;
            }
        }
        return true;
    }
}

const gameStore = new GameStore();

export default gameStore;