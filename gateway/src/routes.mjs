import weatherModel from './weather-model.mjs';

function initRoutes(app) {
  app.get('/city/:city',  async (req, res) => {
    const city = req.params.city;
    const { weather, source } = await weatherModel.getByCity(city);
    
    res.render('weather', { weather, city, source });
  });
}

export default initRoutes;