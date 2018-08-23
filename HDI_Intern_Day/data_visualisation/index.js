let url = 'https://raw.githubusercontent.com/factbook/factbook.json/master/';
let width = 500;
let height = 500;
const r = 250;

let countryCodes = [];

function getExportingPartners(continent, countryCode) {
  let svg = d3.select('svg');
  let result;
  return fetch(url + continent + '/' + countryCode + ".json")
    .then(response => response.json())
    .then(json => json.Economy['Exports - partners'].text)
    .then(text => processPartners(text))
    .then(arr =>  arr)
    .catch(err => console.log(err));
}

function processPartners(text) {
  let arr = []
  let partnerPercents = text.split(", ");
  let singles = partnerPercents.map(pair => pair.split(" "));
  let result = singles.map(arr => arr.filter(years => years[0] != "("));

  for(let i = 0; i < result.length; i++) {
    arr.push({'label': result[i][0], 'value': parseFloat(result[i][1].split("%")[0])});
  }

  return arr;
}

function drawCircle(array, svg) {
  for(let i = 0; i < array.length; i++) {
    svg.append('circle')
      .attr('cx', 40 * (i + 1))
      .attr('cy', 50)
      .attr('r', parseFloat(array[i][1]));
  }
}

async function pieChart(continent, countryCode) {
  let arr = await getExportingPartners(continent, countryCode);
  var color = d3.scale.category20c();
  var svg = d3.select("body")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([arr])                   //associate our data with the document
            .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", height)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
          .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) {
          return d.value;
        });    //we must tell it out to access the value of each element in our data array

    var arcs = svg.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text")                                     //add a label to each slice
            .attr("transform", function(d) {                    //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d, i) { return arr[i].label; });
}

pieChart('europe', 'ei');
