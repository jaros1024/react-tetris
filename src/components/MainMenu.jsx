import React from 'react';
import mainStore from '../stores/MainStore';
import { observer } from 'mobx-react';


@observer
class MainMenu extends React.Component {
    render() {
        const menuStyle = {
            padding: '15px',
            width: '40%',
            position: 'relative',
            margin: '0 auto'
        };

        const btnStyle = {
            borderStyle: 'solid',
            borderWidth: '8px',
            borderRadius: '10px',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '20px',
            padding: '10px',
            fontFamily: 'Palantino',
            fontSize: '25px',
            color: '#ffffff',
            cursor: 'pointer'
        };

        return <div>
            <div style={{textAlign: 'center'}}><img src="tetris.png" alt="logo" height="25%" width="25%"/></div>
            <div style={{textAlign: 'center'}}><div style={menuStyle}>
                <div style={btnStyle} onClick={() => mainStore.startGame()}>New Game</div>
                <div style={btnStyle} onClick={() => mainStore.showTopScores()}>Top Scores</div>
            </div></div>
        </div>;
    }
}

export default MainMenu;