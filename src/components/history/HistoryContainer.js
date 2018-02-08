import { connect } from 'react-redux';
import History from './History';

const mapStateToProps = (state) => ({
  userCities: state.userCities.items.slice(0, 15),
  userCount: state.userCities.items.length,
  computerCities: state.computerCities.items.slice(0, 15),
  computerCount: state.computerCities.items.length,
});

export default connect(mapStateToProps, null)(History);
