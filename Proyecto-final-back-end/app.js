const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/local_library';
mongoose.connect(mongoDB);
//mongoose.Promise = global.Promise; A partir de ES6 no hace falta porque ya existen las promesas nativas.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', console.error.bind(console, 'Conected to MongoDB'));

/*// view engine setup. Eliminamos estas dos lineas porque se van a servir datos, no plantillas HTML que es para lo que sirven estas lineas.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');*/

app.use(logger('dev')); //Devuelve ante una petición el tipo, donde accede y el tiempo que ha tardado (GET /stylesheets/style.css 304 3.175 ms - -)
app.use(cors());
app.use(express.json()); //Al hacer una petición detecta como se envía la información e inyecta en req.body un objeto con esos datos en un objeto json.
app.use(express.urlencoded({ extended: false })); //Igual que el anterior pero en la url. Ambos recogen los trozos en los que viaja la información y los une para devolverla.
app.use(cookieParser()); //Ayuda a trabajar mejor con la información recibida con una cookie.
app.use(express.static(path.join(__dirname, 'public'))); //


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
