import path from 'path';

import express from 'express';
import mustacheExpress from 'mustache-express';

const app = express();

const currentPath = path.join(global.ROOT_PATH, 'dist', 'server');
const publicPath = path.join(global.ROOT_PATH, 'dist', 'public');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', currentPath + '/views');

app.use(express.static(publicPath));

app.get('/favicon.ico', (req, res) => res.status(500).end());

app.get('*', async (request: express.Request, response: express.Response) => {
  response.render('index', {
    body: 'Success',
  });
});

app.listen(process.env.PORT, () => {
  console.info(`Application started at ${process.env.PORT} port`);
});
