import {observable, computed} from 'mobx';


const CLASS_MAP = {
    0: "",
    1: "rotate90",
    2: "rotate180",
    3: "rotate270"
};


class Block {
    @observable number = null;
    @observable rotation = 0;
    @observable position = 0;

    @computed
    get cssClass() {
        return CLASS_MAP[this.rotation];
    }

    rotateLeft() {
        if (this.rotation == 0) {
            this.rotation = 3;
        }
        else {
            this.rotation--;
        }
    }

    rotateRight() {
        if (this.rotation == 3) {
            this.rotation = 0;
        }
        else {
            this.rotation++;
        }
    }
}

export default Block;