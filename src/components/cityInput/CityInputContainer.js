import { connect } from 'react-redux';
import CityInput from './CityInput';
import { checkCity, generateRandomCity } from '../../actions/cityActions';

const mapStateToProps = state => ({
  computerCities: state.computerCities,
  userCities: state.userCities,
  lastLetter: state.lastLetter,
  isWin: state.userCities.items.length > state.computerCities.items.length,
});

const mapDispatchToProps = {
  checkCity,
  generateRandomCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);
