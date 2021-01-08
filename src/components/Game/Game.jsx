import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { ROUTE_CONSTANTS, GAME_CONSTANTS } from '../../constants';
import { playerAction } from '../../redux/actions';
import { Button } from '../Common';
import PlayerDetails from './PlayerDetails';
import './Game.css';

const Game = (props) => {
  const {
    history: { push }
  } = props;

  const [players, setPlayers] = useState([]);
  const [id, setId] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

  const dispatch = useDispatch();

  const onPlay = () => {
    const dispatchingPlayers = players.map((player) => {
      return { ...player };
    });
    dispatch(playerAction.setPlayers([...dispatchingPlayers]));
    push(ROUTE_CONSTANTS.GAMEPLAY);
  };

  const onAddPlayer = () => {
    const playerObject = {
      id,
      playerName: '',
      playerDesc: '',
      money: 200,
      wins: 0,
      loses: 0,
      bet: ''
    };
    setPlayers([...players, { ...playerObject }]);
    setId((prevId) => prevId + 1);
  };

  const onChange = (playerId, name, value) => {
    const updatedPlayers = [];
    players.forEach((player) => {
      if (player.id === playerId) {
        const updatedPlayer = { ...player, [name]: value };
        updatedPlayers.push({ ...updatedPlayer });
      } else updatedPlayers.push({ ...player });
    });
    setPlayers([...updatedPlayers]);
  };

  const noOfPlayers = players.length;

  const isPlayButtonDisabled = () => {
    const noOfPlayersCriteria =
      noOfPlayers < GAME_CONSTANTS.MIN_PLAYERS || noOfPlayers > GAME_CONSTANTS.MAX_PLAYERS;

    const isInputInvalid = !players.every(
      (player) =>
        !!player.playerName &&
        Number(player.bet) >= GAME_CONSTANTS.MIN_BET &&
        Number(player.bet) <= GAME_CONSTANTS.MAX_BET
    );

    return noOfPlayersCriteria || isInputInvalid;
  };

  const onShowHint = () => setShowTooltip(true);

  const onHideHint = () => setShowTooltip(false);

  return (
    <div className="game">
      <div className="addPlayerBox">
        <Button
          buttonText="Add Players (Min 2, Max 4)"
          onButtonClick={onAddPlayer}
          isButtonDisabled={noOfPlayers === GAME_CONSTANTS.MAX_PLAYERS}
        />
      </div>

      {players.map((player) => (
        <PlayerDetails key={player.id} player={player} onChange={onChange} />
      ))}

      <div className="playButtonBox">
        <Button
          buttonText="PLAY"
          onButtonClick={onPlay}
          isButtonDisabled={isPlayButtonDisabled()}
        />
        <span onMouseEnter={onShowHint} onMouseLeave={onHideHint}>
          ?
        </span>
        {showTooltip && (
          <div className="hint">add each players name and valid bet to enable play button</div>
        )}
      </div>
    </div>
  );
};

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Game;