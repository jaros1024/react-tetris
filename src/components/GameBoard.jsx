import React from 'react';
import {observer} from 'mobx-react';
import gameStore from '../stores/GameStore';
import GameOver from './GameOver';
import PauseMenu from './PauseMenu';
import 'index.css';


const BLOCK_SIZE = 25;


@observer
class GameBoard extends React.Component {
    render() {
        const mainStyle = {
            borderStyle: 'solid',
            borderWidth: '8px',
            borderRadius: '10px',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            marginLeft: '25px',
            marginTop: '20px',
            backgroundColor: 'rgb(110, 110, 110)',
            position: 'relative',
            display: 'table'
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

        const backStyle = {
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: '#ffffff',
            cursor: 'pointer'
        };

        return <div style={{width: '100%', height: '100%', position: 'relative', margin: '0 auto'}}>
            <div style={backStyle} onClick={() => gameStore.pause()}>&larr; Back</div>
            {gameStore.paused && <PauseMenu/>}
            {gameStore.gameOver && <GameOver score={gameStore.score}/>}
            <div style={wrapperStyle}>
                <div style={scoreStyle}>
                    <div>Score:</div>
                    <div>{gameStore.score}</div>
                </div>
                <div style={mainStyle}>
                    {
                        gameStore.board.map(row => {
                            return <div key={Math.random()} style={{display: 'table-row'}}>
                                {row.map(cell => {
                                    let cellStyle = {
                                        display: 'table-cell',
                                        width: BLOCK_SIZE,
                                        height: BLOCK_SIZE,
                                        borderStyle: 'solid',
                                        borderWidth: '1px',
                                        borderColor: 'rgba(75, 75, 75, 1.0)',
                                        padding: 0,
                                        margin: 0
                                    };
                                    if (cell) {
                                        cellStyle['backgroundImage'] = `url(blocks/${cell}.png)`;
                                    }
                                    return <div key={Math.random()} style={cellStyle}></div>;
                                })}
                            </div>;
                        })
                    }
                </div>
                <div style={nextStyle}>
                    <div style={{marginBottom: '15px'}}>Next:</div>
                    {gameStore.nextBlocks.map(x => {
                        return <div key={Math.random()} style={{marginTop: '25px'}}><img src={`blocks2/${x}.png`} alt={x}/></div>;
                    })}
                </div>
            </div>
        </div>
    }
}

export default GameBoard;