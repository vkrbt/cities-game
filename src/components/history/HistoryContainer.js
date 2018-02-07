import { connect } from 'react-redux';
import History from './History';

const mapStateToProps = (state) => ({
  userCities: state.userCities.items.slice(0, 15),
  computerCities: state.computerCities.items.slice(0, 15),
});

export default connect(mapStateToProps, null)(History);
