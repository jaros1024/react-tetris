import React from 'react';
import MainMenu from './components/MainMenu';
import mainStore from './stores/MainStore';
import {VIEWS} from './stores/MainStore';
import { observer } from 'mobx-react';
import GameBoard from './components/GameBoard';
import TopScores from './components/TopScores';
import 'index.css';


@observer
class App extends React.Component {
    render() {
        const mainStyle = {
            width: '100%',
            height: '100%',
            backgroundImage: 'url(bg.jpg)',
            backgroundRepeat: 'repeat',
            position: 'absolute'
        };

        return <div style={mainStyle}>
            {mainStore.visible == VIEWS.MAIN_MENU && <MainMenu/>}
            {mainStore.visible == VIEWS.GAME_BOARD && <GameBoard/>}
            {mainStore.visible == VIEWS.TOP_SCORES && <TopScores scores={mainStore.topScores}/>}
        </div>
    }
}

export default App;
