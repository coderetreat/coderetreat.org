import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.vectorgrid/dist/Leaflet.VectorGrid";
import "proj4leaflet";
import geo from "./map/ne_10m_time_zones.json";

const map = L.map("map", {
  maxZoom: 18,
  minZoom: 2,
}).fitBounds([[45,-120], [45, 120]], { animate: false });

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "rradczewski/ckcggc2xd0azq1iqd9t5f0yhk",
    tileSize: 512,
    zoomOffset: -1,
    noWrap: true,
    bounds: [[-90, -180], [90, 180]],
    accessToken:
      "pk.eyJ1IjoicnJhZGN6ZXdza2kiLCJhIjoiY2tjZ2cyenJqMGp1YzJ0bHBrOTR5dHlsdyJ9.6kI34USWMzJ3hxS7j946xg",
  }
).addTo(map);

const timezones = new L.GeoJSON(geo, {
  style: function (feature) {
    return {
      fill: true,
      fillOpacity: 0,
      stroke: true,
      opacity: 0.2,
    };
  },
  onEachFeature: (f, layer) => {
    layer.on("mouseover", (e) => {
      highlightFeaturesInSameTimezone(e.target, layer);
    });
  },
});

const highlightFeaturesInSameTimezone = (layer) => {
  const allFeatureLayers = Object.values(map._layers).filter(layer => layer.feature && layer.feature.properties.featurecla === "Timezone");
  allFeatureLayers.forEach(layer => timezones.resetStyle(layer));
  const layersInSameTimezone = allFeatureLayers.filter(otherLayer => otherLayer.feature.properties.zone == layer.feature.properties.zone);
  layersInSameTimezone.forEach(layer => layer.setStyle({ opacity: 0.8 }));
}

timezones.addTo(map);
