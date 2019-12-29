import React from 'react';
import {observer} from 'mobx-react';
import gameStore from '../stores/GameStore';
import 'index.css';


@observer
class GameBoard extends React.Component {
    render() {
        const mainStyle = {
            width: '30%',
            height: '90%',
            borderStyle: 'solid',
            borderWidth: '8px',
            borderRadius: '10px',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            marginLeft: '25px',
            marginTop: '20px',
            backgroundColor: 'rgb(110, 110, 110)',
            position: 'relative'
        };

        const scoreStyle = {
            width: '15%',
            height: '20%',
            borderStyle: 'solid',
            borderWidth: '8px',
            borderRadius: '10px',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            marginTop: '20px',
            backgroundColor: 'rgb(110, 110, 110)',
            textAlign: 'center',
            paddingTop: '10px',
            color: '#ffffff',
            fontSize: '25px'
        };

        const nextStyle = {
            width: '15%',
            height: '50%',
            borderStyle: 'solid',
            borderWidth: '8px',
            borderRadius: '10px',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            marginLeft: '25px',
            marginTop: '20px',
            backgroundColor: 'rgb(110, 110, 110)',
            textAlign: 'center',
            paddingTop: '10px',
            color: '#ffffff',
            fontSize: '25px'
        };

        const wrapperStyle = {
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        };

        return <div style={{width: '100%', height: '100%', position: 'relative', margin: '0 auto'}}>
            <div style={wrapperStyle}>
                <div style={scoreStyle}>
                    <div>Score:</div>
                    <div>{gameStore.score}</div>
                </div>
                <div style={mainStyle}>
                    <div class={gameStore.movingBlock.cssClass}
                        style={{position: 'absolute', top: gameStore.movingBlock.position * 50}}>
                        <img src={`blocks/${gameStore.movingBlock.number}.png`}/>
                    </div>
                </div>
                <div style={nextStyle}>
                    <div style={{marginBottom: '15px'}}>Next:</div>
                    {gameStore.nextBlocks.map(x => {
                        return <div key={Math.random()} style={{marginTop: '25px'}}><img src={`blocks/${x}.png`} alt={x}/></div>;
                    })}
                </div>
            </div>
        </div>
    }
}

export default GameBoard;