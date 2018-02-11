import React from 'react';
import PropTypes from 'prop-types';

const joinSitiesName = cities => cities.reverse().reduce((string, city) => `${string} ${city.cityName}`, '');

const Results = (props) => {
  const newGame = () => {
    props.finishGame();
    props.closeModal();
  };

  const userCitiesCount = props.userCities.items.length;
  const computerCitiesCount = props.computerCities.items.length;

  return (
    <div className="results">
      <h2>
        {
          userCitiesCount === computerCitiesCount ?
          'Вы проиграли' :
          'Вы выйграли!'
        }
      </h2>
      <div>
        <p>Всего названо слов: {computerCitiesCount + userCitiesCount}</p>
        <p>Из них вами: {userCitiesCount}</p>
        <p>Вы назвали города: {joinSitiesName(props.userCities.items)}</p>
        <p>Сгенерированные игрой города: {joinSitiesName(props.computerCities.items)}</p>
      </div>
      <button className="btn btn--primary btn--new-game" onClick={newGame}>Новая Игра</button>
    </div>
  );
};

Results.propTypes = {
  finishGame: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  computerCities: PropTypes.shape({
    items: PropTypes.array,
  }).isRequired,
  userCities: PropTypes.shape({
    items: PropTypes.array,
  }).isRequired,
};

export default Results;
