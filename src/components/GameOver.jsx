import React from 'react';
import mainStore from '../stores/MainStore';


class GameOver extends React.Component {
    render () {
        const overlayStyle = {
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 10,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
        };
        const gameOverStyle = {
            borderStyle: 'solid',
            borderWidth: '3px',
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            width: '30%',
            position: 'absolute',
            top: '10%',
            left: '35%',
            textAlign: 'center',
            paddingBottom: '20px'
        };
        const yesBtnStyle = {
            display: 'inline-block',
            marginLeft: '8px',
            marginRight: '8px',
            fontSize: '23px',
            cursor: 'pointer',
            borderStyle: 'solid',
            borderWidth: '3px',
            borderColor: 'rgba(4, 184, 55, 0.8)',
            borderRadius: '5px',
            backgroundColor: 'rgba(4, 184, 55, 0.6)',
            width: '80px',
            height: '35px'
        };
        const noBtnStyle = {
            display: 'inline-block',
            marginLeft: '8px',
            marginRight: '8px',
            fontSize: '23px',
            cursor: 'pointer',
            borderStyle: 'solid',
            borderWidth: '3px',
            borderColor: 'rgba(186, 2, 20, 0.8)',
            borderRadius: '5px',
            backgroundColor: 'rgba(186, 2, 20, 0.6)',
            width: '80px',
            height: '35px'
        };
        return <div style={overlayStyle}>
            <div style={gameOverStyle}>
                <p style={{fontSize: '25px'}}>Game Over</p>
                <p style={{fontSize: '19px'}}>Your score: {this.props.score}</p>
                <p style={{fontSize: '19px'}}>Wanna try again?</p>
                <div style={{display: 'inline'}}>
                    <div style={yesBtnStyle} onClick={() => mainStore.newGame()}>Yes</div>
                    <div style={noBtnStyle} onClick={() => mainStore.backToMenu()}>No</div>
                </div>
            </div>
        </div>;
    }
}

export default GameOver;