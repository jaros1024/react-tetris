import {observable, action} from 'mobx';


class GameStore {
    @observable isMenu = true;

    @action
    startGame() {
        this.isMenu = false;
    }
}

const gameStore = new GameStore();

export default gameStore;