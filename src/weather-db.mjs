import query from './db.mjs';

export async function getWeatherByCity(city) {
  const res =  await query('SELECT * FROM local_weather where city = ?', [city]);
  
  return res[0];
}

export async function storeWeather(city, weather) {
  const res =  query('INSERT INTO local_weather (value, city) VALUES (?, ?)', [weather, city]);  

  return res[0];
}