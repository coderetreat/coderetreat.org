import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.vectorgrid";
import geo from "./map/ne_10m_time_zones.json";

var mymap = L.map('map').setView([45, Math.random()*180], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 2,
    id: 'rradczewski/ckcggc2xd0azq1iqd9t5f0yhk',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicnJhZGN6ZXdza2kiLCJhIjoiY2tjZ2cyenJqMGp1YzJ0bHBrOTR5dHlsdyJ9.6kI34USWMzJ3hxS7j946xg'
}).addTo(mymap);

console.log(geo);

var vectorGrid = L.vectorGrid.slicer( geo, {
  rendererFactory: L.svg.tile,
  vectorTileLayerStyles: {
    sliced: function(properties) {
      return {
        stroke: true,
        opacity: 0.2,
        weight: 0.5,
      }
    }
  },
  interactive: true,
  getFeatureId: function(f) {
    return f.properties.wb_a3;
  }
})

vectorGrid.addTo(mymap);