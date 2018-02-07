import React from 'react';

const History = (props) => {
  return (
    <div className="history">
      <div className="history__side">
        <h2>Пользователь</h2>
        {props.userCities.map(city => (<div className="city-name" key={city}>{city}</div>))}
      </div>
      <div className="history__side">
        <h2>Компьютер</h2>
        {props.computerCities.map(city => (<div className="city-name" key={city}>{city}</div>))}
      </div>
    </div>
  );
};

export default History;
