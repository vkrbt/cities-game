import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { checkCityExistance } from '../../actions/cityActions';
import Modal from '../modal/Modal';
import ResultsContainer from '../results/ResultsContainer';
import recognize, { SpeechRecognition } from '../../speech/recognize';

class CityInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.lastLetter.toUpperCase(),
      errorMessage: '',
      showErrorMessage: false,
      isModalOpened: props.isWin,
      isRecording: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userCities.success || !nextProps.lastLetter) {
      this.setState({
        city: nextProps.lastLetter.toUpperCase(),
      }, () => {
        this.city.focus();
      });
    }
  }

  cityInputRef = (city) => {
    this.city = city;
  }

  handleCityChange = (e) => {
    const city = e.target.value.length > 0 || !this.props.lastLetter ?
      e.target.value :
      this.props.lastLetter.toUpperCase();
    this.setState({ city });
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter' && !(this.props.computerCities.loading || this.props.userCities.loading || !this.state.city)) {
      this.handleAnswer();
    }
  }

  openModal = () => {
    this.setState({
      isModalOpened: true,
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpened: false,
    });
  }

  showError = (error) => {
    this.setState({
      errorMessage: error,
      showErrorMessage: true,
    });
    setTimeout(() => {
      this.setState({
        showErrorMessage: false,
      });
    }, 2000);
  }

  handleAnswer = () => {
    const isCityWasUsed = checkCityExistance(
      this.state.city,
      this.props.userCities,
      this.props.computerCities,
    );
    if (isCityWasUsed) {
      this.setState({
        errorMessage: 'Этот город уже был назван.',
        showErrorMessage: true,
      });
    } else {
      this.props.checkCity(this.state.city.trim())
        .then((res) => {
          if (res) {
            this.props.generateRandomCity()
              .then((city) => {
                if (!city.location) {
                  this.showError('Город не найден на карте.');
                }
              })
              .catch(() => {
                this.setState({
                  isModalOpened: true,
                });
              });
            this.setState({
              showErrorMessage: false,
            });
          } else {
            this.showError('Такого города не существует.');
          }
        })
        .catch();
    }
  }

  handleRecord = () => {
    this.setState({ isRecording: true });
    recognize()
      .then((cityName) => {
        if (!this.props.lastLetter || cityName[0].toLowerCase() === this.props.lastLetter) {
          this.setState({
            isRecording: false,
            city: cityName,
          }, this.handleAnswer);
        } else {
          throw Error('Неверная первая буква.');
        }
      })
      .catch(() => {
        this.setState({ isRecording: false });
        this.showError('Попробуйте еще раз.');
      });
  }

  render() {
    const isButtonDisabled = this.props.computerCities.loading ||
      this.props.userCities.loading ||
      !this.state.city.trim();
    return (
      <div className="city-input">
        {this.props.lastLetter ?
          <button
            className={classnames({
              btn: true,
              'btn--end-game': true,
              'btn--disabled': this.props.computerCities.loading || this.props.userCities.loading,
            })}
            onClick={this.openModal}
            disabled={this.props.computerCities.loading || this.props.userCities.loading}
          >
            Сдаться
          </button> :
          <label className="city-input__label" htmlFor="city">Введите название города ниже: </label>
        }
        <div className="city-input-wrapper">
          {
            SpeechRecognition ? (
              <button
                onClick={this.handleRecord}
                disabled={this.state.isRecording}
                className={classnames({
                  btn: true,
                  'city-input__record': true,
                  'btn--disabled': this.state.isRecording,
                })}
              >
                <span
                  className={classnames({
                    circle: true,
                    'circle--pulse': this.state.isRecording,
                  })}
                />
              </button>
            ) : null
          }
          <input
            ref={this.cityInputRef}
            onChange={this.handleCityChange}
            value={this.state.city}
            type="text"
            name="city"
            id="city"
            onKeyPress={this.handleSubmit}
            className={classnames({
              'city-input__input': true,
              'city-input__input--left-border': !SpeechRecognition,
            })
            }
          />
          <button
            onClick={this.handleAnswer}
            disabled={isButtonDisabled}
            className={classnames({
              btn: true,
              'btn--primary': true,
              'city-input__button': true,
              'btn--disabled': isButtonDisabled,
            })}
          >
            {
              this.props.computerCities.loading || this.props.userCities.loading ?
                <span className="small-spinner" /> :
                <span className="next-arrow" />
            }
          </button>
        </div>
        <p
          className={classnames({
            'error-message': true,
            'error-message--animate': this.state.showErrorMessage,
          })}
        >
          {this.state.errorMessage}
        </p>
        <Modal isOpen={this.state.isModalOpened} >
          <ResultsContainer closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
}

CityInput.propTypes = {
  userCities: PropTypes.shape({
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  computerCities: PropTypes.shape({
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  lastLetter: PropTypes.string.isRequired,
  checkCity: PropTypes.func.isRequired,
  generateRandomCity: PropTypes.func.isRequired,
  isWin: PropTypes.bool.isRequired,
};

export default CityInput;
