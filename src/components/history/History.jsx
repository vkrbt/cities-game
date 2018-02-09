import React from 'react';

const History = (props) => {
  return (
    <div className="history">
      <div className="history__side history__side--user">
        <h2 className="history__headline">Пользователь<span>{props.userCount}</span></h2>
        {props.userCities.map(city => (<span className="city-name city-name--user" key={city.cityName}>{city.cityName}</span>))}
      </div>
      <div className="history__side history__side--computer">
        <h2 className="history__headline">Компьютер<span>{props.userCount}</span></h2>
        {props.computerCities.map(city => (<span className="city-name city-name--computer" key={city.cityName}>{city.cityName}</span>))}
      </div>
    </div>
  );
};

export default History;
