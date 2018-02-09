import React from 'react';

const History = (props) => (
  <div className="history">
    <h2 className="history__headline">Пользователь</h2>
    <h2 className="history__headline">Компьютер</h2>
    <div className="history__side">
      {props.cities.map(city => (
        <span
          key={city.cityName}
          className={`city-name ${city.isUser ? 'city-name--user' : 'city-name--computer'}`}
        >
          {city.cityName}
        </span>
      ))}
    </div>
  </div>
);

export default History;
