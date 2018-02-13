import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const History = props => (
  <div className="history">
    <h2 className="history__headline">Пользователь</h2>
    <h2 className="history__headline">Компьютер</h2>
    <div className="history__side">
      {props.cities.map((city) => {
        const className = classnames({
          'city-name': true,
          'city-name--user': city.isUser,
          'city-name--computer': !city.isUser,
          'city-name--animate': city.isFirst,
        });
        return (
          <span
            key={city.cityName}
            className={className}
          >
            {city.cityName}
          </span>
        );
      })}
    </div>
  </div>
);

History.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    isUser: PropTypes.bool.isRequired,
    isFirst: PropTypes.bool,
  })).isRequired,
};

export default History;
