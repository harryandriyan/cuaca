const images = {
  Clear: require('../assets/clear.png'),
  Snow: require('../assets/hail.png'),
  Clouds: require('../assets/cloud.png'),
  Mist: require('../assets/mist.png'),
  Fog: require('../assets/mist.png'),
  Rain: require('../assets/rain.png'),
  Drizzle: require('../assets/drizzle.png'),
  Snow: require('../assets/snow.png'),
  Thunderstorm: require('../assets/thunder.png')
};

export default weather => images[weather];