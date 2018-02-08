import React from 'react';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';

const mapState = {
  center: [0, 0],
  zoom: 0,
  controls: [],
};

const CustomPlacemark = ({ city, color }) => (
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
      iconColor: color,
    }}
  />
);

const CitiesMap = (props) => (
  <YMaps>
    <Map state={mapState} width="100%" height="20vh">
      <Clusterer
        options={{
          groupByCoordinates: false,
          clusterDisableClickZoom: true,
          preset: 'islands#nightClusterIcons'
        }}
      >
        {props.userCities.items.map((city => (
          <CustomPlacemark city={city} color="#E0FBFC" />
        )))}

        {props.computerCities.items.map((city => city.location ? (
          <CustomPlacemark city={city} color="#98C1D9" />
        ) : null
        ))}

      </Clusterer>
    </Map>
  </YMaps>
);

export default CitiesMap;
