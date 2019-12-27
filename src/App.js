import React from 'react';
import MainMenu from './components/MainMenu';
import gameStore from './stores/GameStore';
import './App.css';


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
            {gameStore.isMenu && <MainMenu/>}
        </div>
    }
}

export default App;
