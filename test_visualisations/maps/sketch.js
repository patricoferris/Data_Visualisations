let map;
let canvas;
let dataTable;
let longLat;
let spheres = [];
let paraInfo;

let maxGDP = 0;
let minGDP = 10000000000;

let processedData;
let countriesData = {};

const mappa = new Mappa('Leaflet');
const options = {
  lat: 30,
  lng: 0,
  zoom: 3,
  style: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

function preload() {
  dataTable = loadTable("gdp_data_2016.csv", "csv", "header");
  longLat = loadTable("https://gist.githubusercontent.com/tadast/8827699/raw/7255fdfbf292c592b75cf5f7a19c16ea59735f74/countries_codes_and_coordinates.csv", "csv", "header");
  console.log("Everything Loaded");
}

function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  map = mappa.tileMap(options);
  map.overlay(canvas)
  paraInfo = createElement("h1", "Click on a circle to find out more!");
  //Data Processing
  let rows = dataTable.getRows();
  for(i = 0; i < rows.length; i++) {
    let countryObject = {};
    let countryCode = rows[i].getString('Country Code');
    let longLatRow = longLat.findRow(' "' + countryCode + '"', 'Alpha-3 code');
    let val = rows[i].getNum('Value');

    if(val > maxGDP) {
      maxGDP = val;
    }

    if(val < minGDP) {
      minGDP = val;
    }

    if(longLatRow != null) {
      countryObject['lat'] = Number(longLatRow.getString('Latitude (average)').split(/[""]/)[1]);
      countryObject['long'] = Number(longLatRow.getString('Longitude (average)').split(/[""]/)[1]);
      countryObject['gdp'] = val;
      countriesData[countryObject['Country'] = rows[i].getString('Country Name')] = countryObject;
    }
  }

  for(let c in countriesData) {
    let hue = ((countriesData[c]['gdp'] - minGDP)/(maxGDP - minGDP)) * 120;
    let s = new Sphere(countriesData[c]['lat'], countriesData[c]['long'], 15, hue, c, countriesData[c]['gdp']);
    spheres.push(s);
  }

}

function windowResized() {
  canvas = resizeCanvas(window.innerWidth, window.innerHeight);
}

function mousePressed() {
  for(i = 0; i < spheres.length; i++) {
    spheres[i].clicked();
  }
}

function draw(){
  clear();
  for(i = 0; i < spheres.length; i++) {
    spheres[i].show();
  }
}

class Sphere {
  constructor(lat, long, r, hue, name, value) {
    this.lat = lat;
    this.long = long;
    this.r = r;
    this.hue = hue;
    this.name = name;
    this.value = value;
  }

  clicked() {
    const country = map.latLngToPixel(this.lat, this.long);
    let d = dist(mouseX, mouseY, country.x, country.y);
    if(d < this.r) {
      let val = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      paraInfo.html("Country: " + this.name + ", GDP: $" + val);
    }
  }

  show() {
    colorMode(HSL, 360);
    fill(this.hue, 360, 180);
    const country = map.latLngToPixel(this.lat, this.long);
    let el = ellipse(country.x, country.y, this.r, this.r);
  }
}
