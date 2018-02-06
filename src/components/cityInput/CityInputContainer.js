import { connect } from 'react-redux';
import CityInput from './CityInput';
import { addUserCity, checkCity, generateRandomCity } from '../../actions/cityActions'

const mapDispatchToProps = {
  addUserCity,
  checkCity,
  generateRandomCity,
};

export default connect(null, mapDispatchToProps)(CityInput);
