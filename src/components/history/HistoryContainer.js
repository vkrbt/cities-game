import { connect } from 'react-redux';
import History from './History';

const mergeAnswers = (userCities, computerCities) => {
  const merged = [];
  while (userCities.length || computerCities.length) {
    const lastUserCity = userCities.pop();
    if (lastUserCity) {
      lastUserCity.isUser = true;
      // eslint-disable-next-line no-unused-expressions
      lastUserCity && merged.push(lastUserCity);
    }


    const lastComputerCity = computerCities.pop();
    if (lastComputerCity) {
      lastComputerCity.isUser = false;
      // eslint-disable-next-line no-unused-expressions
      lastComputerCity && merged.push(lastComputerCity);
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
