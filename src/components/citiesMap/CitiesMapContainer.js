import { connect } from 'react-redux';
import CitiesMap from './CitiesMap';

const mapStateToProps = (state) => ({
  userCities: state.userCities,
  computerCities: state.computerCities,
});

export default connect(mapStateToProps, null)(CitiesMap);
