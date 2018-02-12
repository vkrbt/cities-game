import React from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';

const mapState = {
  center: [0, 0],
  zoom: 0,
  controls: [],
};

const CustomPlacemark = ({ city, color }) => (city.location ? (
  <Placemark
    key={city.cityName}
    geometry={{
      coordinates: city.location,
    }}
    properties={{
      iconCaption: city.cityName,
    }}
    options={{
      preset: 'islands#circleIcon',
      iconColor: color,
    }}
  />
) : null);

CustomPlacemark.propTypes = {
  city: PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    location: PropTypes.oneOfType([
      PropTypes.array,
    ]),
  }).isRequired,
  color: PropTypes.string.isRequired,
};

const CitiesMap = props => (
  <div className="map-container">
    <YMaps>
      <Map state={mapState} width="100%" height="35vh">
        <Clusterer
          options={{
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            preset: 'islands#nightClusterIcons',
          }}
        >
          {props.userCities.items.map((city => (
            <CustomPlacemark key={city.cityName} city={city} color="#E0FBFC" />
          )))}

          {props.computerCities.items.map((city => (
            <CustomPlacemark key={city.cityName} city={city} color="#98C1D9" />
          )))}

        </Clusterer>
      </Map>
    </YMaps>
  </div>
);

CitiesMap.propTypes = {
  userCities: PropTypes.shape({
    items: PropTypes.array.isRequired,
  }).isRequired,
  computerCities: PropTypes.shape({
    items: PropTypes.array.isRequired,
  }).isRequired,
};

export default CitiesMap;
