import React from 'react';
import { observer } from 'mobx-react';
import mainStore from '../stores/MainStore'


@observer
class TopScores extends React.Component {
    render () {
        const wrapperStyle = {
            width: '40%',
            margin: '30px auto 0 auto',
            textAlign: 'center'
        };

        const scoreStyle = {
            borderStyle: 'solid',
            borderWidth: '8px',
            borderRadius: '10px',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '20px',
            padding: '10px',
            fontFamily: 'Palantino',
            fontSize: '25px',
            color: '#ffffff'
        };

        const backStyle = {
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: '#ffffff',
            cursor: 'pointer'
        };

        let scores = this.props.scores || [];
        let results;
        if (scores.length) {
            results = this.props.scores.map(e => <li>{e}</li>);
        }
        else {
            results = <div>There are no entries. Maybe play the game first?</div>;
        }

        return <div style={wrapperStyle}>
            <div style={backStyle} onClick={() => mainStore.backToMenu()}>&larr; Back</div>
            <div style={scoreStyle}>Top Scores</div>
            <div style={scoreStyle}>
                {results}
            </div>
        </div>;
    }
}

export default TopScores;