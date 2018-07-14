let map = new L.Map("mapid", {center: [51.5074, -0.1], zoom: 10})
    .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

let svgLayer = L.svg();
svgLayer.addTo(map);

let svg = d3.select('#mapid').select('svg');
let g = svg.select('g');

d3.csv("/data/hospitals.csv", (error, data) => {
  if(error) throw error;

  data.forEach((d) => {
    d.latlng = new L.LatLng(d['Latitude'], d['Longitude']);
  });

  let feature = g.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .style("stroke", "black")
    .style("opacity", .7)
    .style("fill", "red")
    .attr("r", 5);

    function drawAndUpdateCircles() {
      feature.attr("transform",
          function(d) {
              var layerPoint = map.latLngToLayerPoint(d.latlng);
              return "translate("+ layerPoint.x +","+ layerPoint.y +")";
          }
      );
    }
    drawAndUpdateCircles();
    map.on("moveend", drawAndUpdateCircles);
});
