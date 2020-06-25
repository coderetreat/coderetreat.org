import 'ol/ol.css';
import {Map, View} from 'ol';
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import countries from 'world-atlas/land-110m.json'
import TopoJSON from "ol/format/TopoJSON";
import {Fill, Stroke, Style} from 'ol/style';

var features = (
    new TopoJSON({
    })
).readFeatures(countries);

var source = new VectorSource({
    features: features,
    overlaps: false
});

var style = new Style({
    fill: new Fill({
        color: 'rgba(0, 255, 85, 0.4)'
    }),
    stroke: new Stroke({
        color: '#2020FF',
        width: 1
    })
});

var vectorLayer = new VectorLayer({
    source: source,
    style: style
});


var map = new Map({
    target: 'map',
    interactions: defaultInteractions().extend([
        new DragRotateAndZoom()
    ]),
    layers: [vectorLayer],
    view: new View({
        center: [0,0],
        zoom: 19
    })
});
