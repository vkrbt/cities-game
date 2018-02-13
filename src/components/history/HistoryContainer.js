import { connect } from 'react-redux';
import History from './History';

const mergeAnswers = (userCities, computerCities) => {
  const merged = [];

  const localUserCities = [...userCities];
  const localcomputerCities = [...computerCities];

  while (localUserCities.length || localcomputerCities.length) {
    const lastUserCity = localUserCities.pop();
    const lastUserCityCopied = lastUserCity ? { ...lastUserCity } : null;    
    if (lastUserCityCopied) {
      if (localUserCities.length === 0) {
        lastUserCityCopied.isFirst = true;
      }
      lastUserCityCopied.isUser = true;
      // eslint-disable-next-line no-unused-expressions
      lastUserCityCopied && merged.push(lastUserCityCopied);
    }


    const lastComputerCity = localcomputerCities.pop();
    const lastComputerCityCopied = lastComputerCity ? { ...lastComputerCity } : null;
    if (lastComputerCityCopied) {
      if (localcomputerCities.length === 0) {
        lastComputerCityCopied.isFirst = true;
      }
      lastComputerCityCopied.isUser = false;
      // eslint-disable-next-line no-unused-expressions
      lastComputerCityCopied && merged.push(lastComputerCityCopied);
    }
  }
  return merged.reverse();
};

const mapStateToProps = state => ({
  cities: mergeAnswers(
    state.userCities.items.slice(0, 15),
    state.computerCities.items.slice(0, 15),
  ),
});

export default connect(mapStateToProps, null)(History);
