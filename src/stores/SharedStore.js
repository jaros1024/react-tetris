import {action, toJS} from 'mobx';


class SharedStore {
    _initialState = null;

    constructor() {
        this._initialState = toJS(this);
    }

    @action
    reset() {
        for (let key in this._initialState) {
            if (key != "_initialState") {
                this[key] = this._initialState[key];
            }
        }
    }
}

export default SharedStore;