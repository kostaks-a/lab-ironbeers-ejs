const { render } = require('ejs');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

let allBeers

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));



// Add the route handlers here:
app.get('/', (req, res) => {
  
  res.render(__dirname + '/views/index.ejs')
});

app.get('/beers', async (req, res) => {
  try{
  allBeers = await punkAPI.getBeers();
 // console.log("here is the beers", allBeers);
  res.render(__dirname + '/views/beers.ejs');
  }
  catch(error){
    console.log("Error getting the beers", error);
  }
});

app.get('/random-beer', (req, res) => {
  try{
    //let randomBeer = allBeers[Math.floor(Math.random()*allBeers.length)]
    //console.log("here is the beers", randomBeer);
    res.render(__dirname + '/views/random-beer.ejs');
  }
  catch(error){
    console.log("Error getting the beers", error);
  }
});



app.listen(3001, () => console.log('🏃‍ on port 3001'));