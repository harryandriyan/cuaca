import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { getWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';
import getIconForWeather from './utils/getIconForWeather';

import SearchInput from './SearchInput';
import moment from 'moment';
import {toCamelCase} from 'string-manager'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleDate = this.handleDate.bind(this);

    this.state = {
      loading: false,
      error: false,
      location: '',
      weather: '',
      timestamp: '2000-01-01T00:00:00.000000Z',
      temperature: 0,
      wind: '',
      sunrise: '',
      sunset: ''
    };

  }
  
  componentDidMount() {
    this.handleUpdateLocation('Yogyakarta');
  }

  handleDate = date => moment(date).format("hh:mm");

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const { location, weather, timestamp, temperature, wind, sunrise, sunset } = await getWeather(city);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          timestamp,
          temperature,
          wind,
          sunrise,
          sunset
        });


      } catch (e) {

        this.setState({
          loading: false,
          error: true,
        });

      }
    });
  };

  render() {
    const { loading, error, location, weather, timestamp, temperature, wind, sunrise, sunset } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <StatusBar barStyle="light-content" />

        <ImageBackground
          source={getImageForWeather(weather.main)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >

          <View style={styles.detailsContainer}>

            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    😞 Tidak bisa menampilkan cuaca, coba beberapa saat lagi...
                  </Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.iconText, styles.textStyle]}>
                      {getIconForWeather(weather.main)}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.weatherText, styles.textStyle]}>
                       {weather.main}, {toCamelCase(weather.description)}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°C`}
                    </Text>
                    <Text style={[styles.weatherText, styles.textStyle]}>
                       {`${Math.round(wind.speed)} m/s`} | {`${Math.round(wind.deg)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Ketik nama kota"
                  onSubmit={this.handleUpdateLocation}
                />

                {!error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Update terakhir {this.handleDate(timestamp)}
                  </Text>
                )}

              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  iconText: {
    fontSize: 72,
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  weatherText: {
    fontSize: 22,
  }
});