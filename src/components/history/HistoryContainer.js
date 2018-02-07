import { connect } from 'react-redux';
import History from './History';

const mapStateToProps = (state) => ({
  userCities: state.userCities.items,
  computerCities: state.computerCities.items,
});

export default connect(mapStateToProps, null)(History);
