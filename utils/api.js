export const getWeather = async city => {

  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5817b972e7e6c3386e8c3e0d4d937f9a`
  );

  let { name, weather, dt, main, sys, wind } = await response.json();

  return {
    location: name,
    weather: weather[0],
    timestamp: dt,
    temperature: main.temp,
    wind: wind,
    sunrise: sys.sunrise,
    sunset: sys.sunset
  };
};