import { get } from './api.mjs';
import { getWeatherByCity, storeWeather } from './weather-db.mjs';

const WEATHER_API = 'http://api.weatherapi.com/v1';
const DATA_SOURCE = {
  DB: 'DB',
  LIVE: 'LIVE',
  CACHE: 'CACHE'
}

const url = city => `${WEATHER_API}/current.json?key=e66ad9b29be84f7b83b174405210311&q=${city}&aqi=no`;

function initRoutes(app) {
  app.get('/:city',  async (req, res) => {
    const city = req.params.city;
    let weather = (await getWeatherByCity(city))?.value;
    
    let source;
    if (weather) {
      source = DATA_SOURCE.DB;
    }
    else {
      source = DATA_SOURCE.LIVE
      weather = await grabWeather(city);
      storeWeather(city, weather);
    } 

    res.render('weather', { weather, city, source });
  });
}




async function grabWeather(city) {
  const weatherData = await get(url(city));

  return weatherData.current.feelslike_c;
}

export default initRoutes;