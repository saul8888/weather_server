
const store = require('./stores/stores');
const weather_list = require('./weather_list/list');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', {weather: null, error: null});
})

app.post('/', (req, res) => {
  let tienda = req.body.tienda;
  let tarea = store.Getubi(tienda);
  let listado = store.getStore();
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${ listado[tarea].lat }&lon=${ listado[tarea].lon }&appid=32f843d833c38373032f825c4a92418a&units=metric`

  request(url, (err, response, body) => {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${tienda}!`;
        const tarea1 = weather_list.crear(tienda,weather.main.temp)
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(port, () => {
  console.log(`listening on port ${ port }`)
})
