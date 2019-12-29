import React from 'react';
import MainMenu from './components/MainMenu';
import mainStore from './stores/MainStore';
import { observer } from 'mobx-react';
import GameBoard from './components/GameBoard';
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
            {mainStore.isMenu && <MainMenu/>}
            {!mainStore.isMenu && <GameBoard/>}
        </div>
    }
}

export default App;
