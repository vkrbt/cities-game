/* eslint-disable no-undef */

export const checkYandexApi = () => ymaps.ready();

export const getCityCoordinatesUser = (cityName = '') => {
  const settings = { results: 1 };
  return ymaps.geocode('город ' + cityName, settings)
    .then((res) => {
      const geoObject = res.geoObjects.get(0);
      const geoInfo = geoObject && geoObject.properties.get('metaDataProperty');
      const geoName = geoObject && geoObject.properties.get('name');
      return (
        geoInfo &&
        geoInfo.GeocoderMetaData &&
        geoInfo.GeocoderMetaData.kind === 'locality' &&
        geoName.toLowerCase() === cityName.toLowerCase()
      ) ? geoObject.geometry.getCoordinates() : null;
    })
    .catch(() => null);
};

export const getCityCoordinatesComputer = (cityName = '') => {
  const settings = { results: 1 };
  return ymaps.geocode(cityName, settings)
    .then((res) => {
      const geoObject = res.geoObjects.get(0);
      const geoInfo = geoObject && geoObject.properties.get('metaDataProperty');
      return (
        geoInfo &&
        geoInfo.GeocoderMetaData &&
        geoInfo.GeocoderMetaData.kind === 'locality'
      ) ? geoObject.geometry.getCoordinates() : null;
    })
    .catch(() => null);
};

export const getRandomCity = letter => fetch(`https://cities-server-vkrbt.herokuapp.com/get-city/${letter}`)
  .then(res => res.json())
  .then(body => {
    console.log(body);
    return body.city;
  })
