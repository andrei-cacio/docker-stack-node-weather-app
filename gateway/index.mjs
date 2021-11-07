import express from 'express';
import exphbs from 'express-handlebars';

import initRoutes from './src/routes.mjs';
import { initCache } from './src/cache.mjs';


let settings = { method: 'GET' };

const app = express();
const port = 8080;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

initRoutes(app);
initCache();

app.listen(port, () => console.log('running on ', port));