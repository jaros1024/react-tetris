import {observable, action} from 'mobx';


const BLOCK_MAP = {
    1: [[1, 1, 1, 1]],
    2: [[2, 0, 0], [2, 2, 2]],
    3: [[0, 0, 3], [3, 3, 3]],
    4: [[4, 4], [4, 4]],
    5: [[0, 5, 5], [5, 5, 0]],
    6: [[0, 6, 0], [6, 6, 6]],
    7: [[7, 7, 0], [0, 7, 7]]
};


class Block {
    @observable number = null;
    @observable rotation = 0;
    @observable posX = 4;
    @observable posY = 0;
    matrix = [];


    constructor(number) {
        this.number = number;
        this.matrix = JSON.parse(JSON.stringify(BLOCK_MAP[number]));
    }

    @action
    rotateRight() {
        let newMatrix = [];

        for (let i = 0; i < this.matrix[0].length; i++) {
            newMatrix.push(new Array(this.matrix.length));
        }

        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                let newX = -i + this.matrix.length - 1;
                let newY = j;
                newMatrix[newY][newX] = this.matrix[i][j];
            }
        }

        this.matrix = newMatrix;
    }

    @action
    moveLeft() {
        if (this.posX > 0) {
            this.posX--;
        }
    }

    @action
    moveRight(limit) {
        if (this.posX + this.matrix[0].length < limit) {
            this.posX++;
        }
    }

    @action
    moveDown(limit) {
        if (this.posY + this.matrix.length < limit) {
            this.posY++;
            return true;
        }
        return false;
    }
}

export default Block;