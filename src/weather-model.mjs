import { get } from './api.mjs';
import { getWeatherByCity, storeWeather, updateWeather } from './weather-db.mjs';
import { fromCache, invalidateKey, toCache, ttl } from './cache.mjs';

const WEATHER_API = 'http://api.weatherapi.com/v1';
const url = city => `${WEATHER_API}/current.json?key=e66ad9b29be84f7b83b174405210311&q=${city}&aqi=no`;

const cacheKey = city => `weather-${city}`;
const DATA_SOURCE = {
  DB: 'DB',
  LIVE: 'LIVE',
  CACHE: 'CACHE'
}


const diffInSeconds = dateTime => Math.floor(((new Date()) - (new Date(dateTime))) / 1000);

const weatherModel = {
  async getByCity(city) {
    const cachedValue = await fromCache(cacheKey(city));
    if (cachedValue) {      
      console.info(`city ${city} [CACHE]`)
      return { weather: cachedValue, source: DATA_SOURCE.CACHE };
    }

    const storedValue = await getWeatherByCity(city);
    if (diffInSeconds(storedValue?.changeTime) > ttl.SHORT) {
      console.info(`city ${city} [CACHE EXPIRED] [LIVE][DB HIT]`)
      const weather = await grabWeather(city);
      updateWeather(city, weather);

      return { weather: storedValue?.value, source: DATA_SOURCE.DB };
    }
    else if (storedValue?.value) {
      console.info(`city ${city} [DB HIT]`)
      toCache(cacheKey(city), storedValue?.value, ttl.SHORT);

      return { weather: storedValue?.value, source: DATA_SOURCE.DB };
    }

    console.info(`city ${city} [LIVE][DB HIT]`)
    const weather = await grabWeather(city);
    storeWeather(city, weather);

    return { weather, source: DATA_SOURCE.LIVE };
  }
}


async function grabWeather(city) {
  const weatherData = await get(url(city));

  return weatherData.current.feelslike_c;
}

export default weatherModel;