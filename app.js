const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts"); 
 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

let allBeers
let randomBeer


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

app.get('/random-beer', async (req, res) => {
  try{
    allBeers = await punkAPI.getBeers();
    randomBeer = allBeers[Math.floor(Math.random()*allBeers.length)]
    console.log("random beer", randomBeer);
    res.render(__dirname + '/views/random-beer.ejs');
  }
  catch(error){
    console.log("Error getting the beers", error);
  }
});



app.listen(3001, () => console.log('🏃‍ on port 3001'));