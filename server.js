const express = require('express');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').config();
const app = express();
app.set('trust proxy', 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: true,
  credentials: true
}));


app.use('/api', require('./email.router'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Page not found' } });
});

const listener = () => console.log(`Listening on port ${port}!`);
app.listen(port, listener);

module.exports = app;