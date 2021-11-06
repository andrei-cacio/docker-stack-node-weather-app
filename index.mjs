import express from 'express';
import exphbs from 'express-handlebars';

import initRoutes from './src/routes.mjs';


let settings = { method: 'GET' };

const app = express();
const port = 8080;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

initRoutes(app);

app.listen(port, () => console.log('running on ', port));