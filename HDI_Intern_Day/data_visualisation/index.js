
function printCountry(continent, countryCode) {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://raw.githubusercontent.com/factbook/factbook.json/master/europe/ei.json');
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var res = request.response;
    console.log(res);
  }
}

printCountry('europe', 'ei');
