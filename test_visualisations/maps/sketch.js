let map;
let canvas;
let dataTable;
let longLat;
let spheres = [];
let paraInfo;
let toggleButton;

let perCapitaFlag = true;

let maxGDP = 0;
let minGDP = 10000000000;

let maxPC = 0;
let minPC = 10000000000;

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
  populationData = loadTable("population_2016.csv", "csv", "header");
  console.log("Everything Loaded");
}

function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  map = mappa.tileMap(options);
  map.overlay(canvas)
  paraInfo = createElement("h1", "Click on a circle to find out more!");
  toggleButton = createButton('Toggle GDP and Per Capita Data');
  toggleButton.mousePressed(toggle);

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
      countryObject['population'] = populationData.findRow(countryCode, 'Country Code').getNum('Value');
      let pc = val/countryObject['population'];

      if(pc > maxPC) {
        maxPC = pc;
      }

      if(pc < minPC) {
        minPC = pc;
      }
      countriesData[countryObject['Country'] = rows[i].getString('Country Name')] = countryObject;
    }
  }

  for(let c in countriesData) {
    let hue = ((countriesData[c]['gdp'] - minGDP)/(maxGDP - minGDP)) * 120;
    let r = ((countriesData[c]['gdp'] - minGDP)/(maxGDP - minGDP)) * 100 + 10;
    let s = new Sphere(countriesData[c]['lat'], countriesData[c]['long'], r, hue, c, countriesData[c]['gdp'], countriesData[c]['population']);
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

function toggle() {
  if(perCapitaFlag) {
    perCapitaFlag = false;
  } else {
    perCapitaFlag = true;
  }
}

function draw(){
  clear();
  for(i = 0; i < spheres.length; i++) {
    spheres[i].show();
  }
}

class Sphere {
  constructor(lat, long, r, hue, name, value, population) {
    this.lat = lat;
    this.long = long;
    this.r = r;
    this.hue = hue;
    this.name = name;
    this.population = population;
    this.value = value;
  }

  clicked() {
    const country = map.latLngToPixel(this.lat, this.long);
    let d = dist(mouseX, mouseY, country.x, country.y);
    if(d < this.r) {
      let val;
      let perCapita = "";
      if(perCapitaFlag) {
        val = Math.round((this.value/this.population)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        perCapita = "Per Capita";
      } else {
        val = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        perCapita = "";
      }
      paraInfo.html("Country: " + this.name + ", GDP " + perCapita + ": $" + val);
    }
  }

  show() {
    colorMode(HSL, 360);

    if(perCapitaFlag) {
      this.hue = (((countriesData[this.name]['gdp']/this.population) - minPC)/(maxPC - minPC)) * 120;
      this.r = (((countriesData[this.name]['gdp']/this.population) - minPC)/(maxPC - minPC)) * 50 + 10;
    } else {
      this.hue = ((countriesData[this.name]['gdp'] - minGDP)/(maxGDP - minGDP)) * 120;
      this.r = ((countriesData[this.name]['gdp'] - minGDP)/(maxGDP - minGDP)) * 100 + 10;
    }

    fill(this.hue, 360, 180);
    const country = map.latLngToPixel(this.lat, this.long);
    let el = ellipse(country.x, country.y, this.r, this.r);
  }
}
