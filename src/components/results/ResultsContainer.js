import { connect } from 'react-redux';
import Results from './Results';
import { finishGame } from '../../actions/cityActions';

const mapStateToProps = state => ({
  computerCities: state.computerCities,
  userCities: state.userCities,
});

const mapDispatchToProps = {
  finishGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
