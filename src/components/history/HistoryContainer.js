import { connect } from 'react-redux';
import History from './History';

const mapStateToProps = (state) => ({
  userCities: state.userCities,
  computerCities: state.computerCities,
});

export default connect(mapStateToProps, null)(History);
