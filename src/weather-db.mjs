import query from './db.mjs';

export async function getWeatherByCity(city) {
  const res =  await query('SELECT * FROM local_weather where city = ?', [city]);

  return res[0];
}

const now = () => (new Date()).toISOString();

export async function storeWeather(city, weather) {
  const res =  await query('INSERT INTO local_weather (value, city, changeTime) VALUES (?, ?, ?)', [weather, city, now()]);  

  return res[0];
}

export async function updateWeather(city, weather) {
  await query('UPDATE local_weather SET value = ?, changeTime = ? WHERE city = ?', [weather, now(), city]);
}