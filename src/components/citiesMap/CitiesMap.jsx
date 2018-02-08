import React from 'react';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';

const mapState = {
  center: [0, 0],
  zoom: 0,
  controls: [],
};

const CitiesMap = (props) => (
  <YMaps>
    <Map state={mapState} width="100%" height="20vh">
      <Clusterer
        options={{
          groupByCoordinates: false,
          clusterDisableClickZoom: true,
          clusterHideIconOnBalloonOpen: false,
          geoObjectHideIconOnBalloonOpen: false,
        }}
      >
        {props.userCities.items.map((city => (
          <Placemark
            key={city.cityName}
            geometry={{
              coordinates: city.location
            }}
            properties={{
              iconCaption: city.cityName,
            }}
            options={{
              preset: "islands#circleIcon",
              iconColor: '#117ed8',
            }}
          />
        )))}

        {props.computerCities.items.map((city => city.location ? (
          <Placemark
            key={city.cityName}
            geometry={{
              coordinates: city.location
            }}
            properties={{
              iconCaption: city.cityName,
            }}
            options={{
              preset: "islands#circleIcon",
              iconColor: '#11d86a',
            }}
          />
        ) : null
        ))}

      </Clusterer>
    </Map>
  </YMaps>
);

export default CitiesMap;
