import React from 'react';
import PropTypes from 'prop-types';

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

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
        <h3 className="results__subheader">
          Всего названо слов:&ensp;
          <span className="italic">
            {computerCitiesCount + userCitiesCount}
          </span>
        </h3>
        <h3 className="results__subheader">
          Из них вами:&ensp;
          <span className="italic">
            {userCitiesCount}
          </span>
        </h3>
        <h3 className="results__subheader">Вы назвали города: </h3>
        <ol className="list results__list">
          {props.userCities.items.reverse().map(city => (
            <li className="list__item">{capitalize(city.cityName)}</li>
          ))}
        </ol>
        <h3 className="results__subheader">Сгенерированные игрой города: </h3>
        <ol className="list results__list">
          {props.computerCities.items.reverse().map(city => (
            <li className="list__item">{capitalize(city.cityName)}</li>
          ))}
        </ol>
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
