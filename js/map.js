function hasCoordinates(event) {
  return (
    event.location !== "virtual" &&
    typeof event.location.coordinates === "object" &&
    typeof event.location.coordinates.latitude === "number" &&
    typeof event.location.coordinates.longitude === "number"
  );
}
var clusterStyleCache = {};
var clusterStyle = function(feature) {
  var size = feature.get("features").length;
  var style = clusterStyleCache[size];
  if (!style) {
    style = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 10,
        stroke: new ol.style.Stroke({
          color: "#fff"
        }),
        fill: new ol.style.Fill({
          color: "#3399CC"
        })
      }),
      text: new ol.style.Text({
        text: size.toString(),
        fill: new ol.style.Fill({
          color: "#fff"
        })
      })
    });
    clusterStyleCache[size] = style;
  }
  return style;
};

var extractFeaturesFromEventsLayer = function(feature) {
  var features = [feature.get(property)];
  return features;
};

var extractFeaturesFromClusterLayer = function(feature) {
  var features = feature.getProperties().features;
  return features;
};

var getPopupContent = function(features) {
  var content = "";
  if (features.length == 1) {
    var eventUrl = features[0].get("urls");
    var eventName = features[0].get("name");
    content +=
      '<p><a href="' + eventUrl + '" target="_blank">' + eventName + "</a></p>";
  } else {
    content += "<p>";
    for (var i = 0; i < features.length; i++) {
      var eventUrl = features[i].get("urls");
      var eventName = features[i].get("name");
      content +=
        '<a href="' + eventUrl + '" target="_blank">' + eventName + "</a><hr/>";
    }
    content += "</p>";
  }
  return content;
};

var mapEventsDataToMapFormat = function(data) {
  return Object.values(data)
    .filter(hasCoordinates)
    .map(function(item) {
      return {
        timeZone: item.timezone,
        offset: item.utcOffset,
        country: item.location.country,
        urls: [item.url],
        name: item.title,
        coords: [
          item.location.coordinates.latitude,
          item.location.coordinates.longitude
        ],
        city: item.location.city
      };
    });
};

var flyTo = function(map, coord, duration, resolution) {
  duration = duration || 500;
  const view = map.getView();
  view.animate({ duration: duration, center: coord, zoom: 5 });
};

var translateToMapCoords = function(coords) {
  return ol.proj.transform(coords, "EPSG:4326", "EPSG:3857");
};

var toPoint = function(loc) {
  var coords = translateToMapCoords([loc.coords[1], loc.coords[0]]);
  return new ol.geom.Point(coords);
};

var eventIconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    scale: 0.05,
    anchor: [0.5, 1],
    src: "/images/map-pin.png"
  })
});

var events = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: eventIconStyle
});

// a clustered source is configured with another vector source that it
// operates on
var clusterSource = new ol.source.Cluster({
  source: events.getSource()
});

// it needs a layer too
var clusterLayer = new ol.layer.Vector({
  source: clusterSource,
  style: clusterStyle
});

var addEventsToMap = function(locations) {
  events.getSource().clear();
  $.each(locations, function() {
    events.getSource().addFeature(
      new ol.Feature({
        geometry: toPoint(this),
        name: this.name,
        urls: this.urls
      })
    );
  });
};

var initEventsOnMap = function(pathToLocationsJson) {
  $.get(pathToLocationsJson, addEventsToMap);
};

$(function() {
  var styleCache = {};
  var countriesLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: "/geodata/countries.geojson"
    }),
    style: function(feature, resolution) {
      var text = resolution < 5000 ? feature.get("name") : "";
      if (!styleCache[text]) {
        styleCache[text] = [
          new ol.style.Style({
            fill: new ol.style.Fill({ color: "#57B26E" }),
            stroke: new ol.style.Stroke({ color: "#7EC486", width: 1 })
          })
        ];
      }
      return styleCache[text];
    }
  });

  var popupElem = document.getElementById("popup");

  var popup = new ol.Overlay({
    element: popupElem,
    positioning: "top-center",
    stopEvent: true,
    insertFirst: true
  });

  var map = new ol.Map({
    interactions: ol.interaction.defaults({
      mouseWheelZoom: false
    }),
    controls: ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
        collapsible: false
      })
    }),
    layers: [countriesLayer, clusterLayer],
    overlays: [popup],
    target: document.getElementById("map"),
    view: new ol.View({
      center: translateToMapCoords([0, 40]),
      zoom: 1.2,
      minZoom: 1.2,
      maxZoom: 7,
      extent: [-17400000, -6040000, 19400000, 16200000]
    })
  });

  // display popup on click
  map.on("click", function(evt) {
    $(popupElem).popover("destroy");
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(
      feature,
      layer
    ) {
      if (layer == clusterLayer) return feature;
    });
    if (feature) {
      var geometry = feature.getGeometry();
      var coord = geometry.getCoordinates();
      var features = extractFeaturesFromClusterLayer(feature);
      var content = getPopupContent(features);
      popup.setPosition(coord);
      $(popupElem).popover({
        animation: false,
        placement: "auto",
        html: true,
        content: content
      });

      $(popupElem).popover("show");
    }
  });

  // change mouse cursor when over marker
  $(map.getViewport()).on("mousemove", function(e) {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      return layer == clusterLayer;
    });
    if (hit) {
      map.getTarget().style.cursor = "pointer";
    } else {
      map.getTarget().style.cursor = "";
    }
  });
});
