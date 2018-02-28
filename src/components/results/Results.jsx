import React from 'react';
import PropTypes from 'prop-types';

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

const joinCitiesName = cities => cities
  .reverse()
  .map(city => capitalize(city.cityName))
  .join(', ');

const Results = (props) => {
  const newGame = () => {
    props.finishGame();
    props.closeModal();
  };

  const userCitiesCount = props.userCities.items.length;
  const computerCitiesCount = props.computerCities.items.length;

  return (
    <div className="results">
      <h2 className="results__headline">
        {
          userCitiesCount === computerCitiesCount ?
            'Вы проиграли' :
            'Вы выиграли!'
        }
      </h2>
      <div>
        <p className="results__paragraph">
          <strong className="accent">Всего названо слов: </strong>
          <span className="italic">{computerCitiesCount + userCitiesCount}</span>
        </p>
        <p className="results__paragraph">
          <strong className="accent">Из них вами: </strong>
          <span className="italic">{userCitiesCount}</span>
        </p>
        <p className="results__paragraph">
          <strong className="accent">Вы назвали города: </strong>
          <span className="italic">{joinCitiesName(props.userCities.items)}</span>
        </p>
        <p className="results__paragraph">
          <strong className="accent">Сгенерированные игрой города: </strong>
          <span className="italic">{joinCitiesName(props.computerCities.items)}</span>
        </p>
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
