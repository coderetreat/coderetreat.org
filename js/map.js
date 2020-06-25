import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TopoJSON from "ol/format/TopoJSON";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";

var style = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.6)",
  }),
  stroke: new Stroke({
    color: "#319FD3",
    width: 1,
  }),
});

var vector = new VectorLayer({
  source: new VectorSource({
    url:
      "https://openlayers.org/en/latest/examples/data/topojson/world-110m.json",
    format: new TopoJSON({
      // don't want to render the full world polygon (stored as 'land' layer),
      // which repeats all countries
      layers: ["countries"],
    }),
    overlaps: false,
  }),
  style: style,
});

var map = new Map({
  layers: [vector],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 1,
  }),
});
