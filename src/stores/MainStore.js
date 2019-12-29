import {observable, action} from 'mobx';
import SharedStore from './SharedStore';
import gameStore from './GameStore';


class MainStore extends SharedStore {
    @observable isMenu = true;

    @action
    startGame() {
        this.isMenu = false;
        gameStore.run();
    }
}

const mainStore = new MainStore();

export default mainStore;