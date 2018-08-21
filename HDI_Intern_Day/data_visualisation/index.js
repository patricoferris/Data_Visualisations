let url = 'https://raw.githubusercontent.com/factbook/factbook.json/master/';

function getExportingPartners(continent, countryCode) {
  let svg = d3.select('svg');
  fetch(url + continent + '/' + countryCode + ".json")
    .then(response => response.json())
    .then(json => json.Economy['Exports - partners'].text)
    .then(text => processPartners(text))
    .then(arr => drawCircle(arr, svg))
    .catch(err => console.log(err));
}

function processPartners(text) {
  let partnerPercents = text.split(", ");
  let singles = partnerPercents.map(pair => pair.split(" "));
  let result = singles.map(arr => arr.filter(years => years[0] != "("));
  return result;
}

function drawCircle(array, svg) {
  for(let i = 0; i < array.length; i++) {
    svg.append('circle')
      .attr('cx', 40 * (i + 1))
      .attr('cy', 50)
      .attr('r', parseFloat(array[i][1]));
  }
}

getExportingPartners('europe', 'ei');
