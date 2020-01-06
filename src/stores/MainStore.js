import {observable, action} from 'mobx';
import SharedStore from './SharedStore';
import gameStore from './GameStore';


export const VIEWS = {
    MAIN_MENU: 1,
    GAME_BOARD: 2,
    TOP_SCORES: 3
};


class MainStore extends SharedStore {
    @observable visible = VIEWS.MAIN_MENU;
    @observable topScores = [];

    @action
    startGame() {
        this.visible = VIEWS.GAME_BOARD;
        this.newGame();
    }

    newGame() {
        gameStore.resetKeyHandle();
        gameStore.reset();
        gameStore.initNextBlocks();
        gameStore.initBoard();
        gameStore.run();
    }

    @action
    backToMenu() {
        gameStore.reset();
        gameStore.resetKeyHandle();
        this.visible = VIEWS.MAIN_MENU;
    }

    @action
    showTopScores() {
        this.visible = VIEWS.TOP_SCORES;
    }

    @action
    updateTopScores(score) {
        this.topScores.push(score);
        this.topScores.sort((a, b) => {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        });
        this.topScores = this.topScores.slice(0, 5);
    }
}

const mainStore = new MainStore();

export default mainStore;