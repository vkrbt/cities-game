/* eslint-disable no-undef */

export const checkYandexApi = () => ymaps.ready();

export const getCityCoordinatesUser = (cityName = '') => {

  return getCityCoordinatesComputer('город ' + cityName)
    .then(res => {
      if (res.cityName.toLowerCase() === cityName.toLocaleLowerCase()) {
        return res;
      } else {
        throw res;
      }
    })
    .catch(res => {
      return null;
    })
};

export const getCityCoordinatesComputer = (cityName = '') => {
  const settings = { results: 1 };
  return ymaps.geocode(cityName, settings)
    .then((res) => {
      const geoObject = res.geoObjects.get(0);
      const geoName = geoObject && geoObject.properties.get('name');
      const geoInfo = geoObject && geoObject.properties.get('metaDataProperty');
      return (
        geoInfo &&
        geoInfo.GeocoderMetaData &&
        geoInfo.GeocoderMetaData.kind === 'locality'
      ) ? {
          cityName: geoName,
          location: geoObject.geometry.getCoordinates(),
        } : null;
    })
    .catch(() => null);
};

export const getRandomCity = letter => fetch(`https://cities-server-vkrbt.herokuapp.com/get-city/${letter}`)
  .then(res => res.json())
  .then(body => {
    return body;
  })
