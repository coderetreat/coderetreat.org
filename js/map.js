var mapEventsDataToTheProperFormat = function(data) {
  return Object.values(data).map(function(item) {
    return {
      "timeZone": item.timezone,
      "offset": item.utcOffset,
      "country": item.location.country,
      "urls": [item.url],
      "name": item.title,
      "coords": [
        item.location.coordinates.latitude,
        item.location.coordinates.longitude
      ],
      "city": item.location.city
    }
  })
};

var flyTo = function(map, coord, duration, resolution) {
  duration = duration || 500;
  const view = map.getView();
  view.animate({ duration: duration, center: coord, zoom: 5 });
}

var translateToMapCoords = function(coords) {
  return ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857')
}

var toPoint = function(loc) {
  var coords = translateToMapCoords([loc.coords[1], loc.coords[0]]);
  return new ol.geom.Point(coords);
};

var eventIconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    scale: 0.05,
    anchor: [0.5, 1],
    src: '/images/map-pin.png'
  })
});

var events = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: eventIconStyle
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
  })
}

var initEventsOnMap = function(pathToLocationsJson) {
  $.get(pathToLocationsJson, addEventsToMap);
};



$(function() {
  var styleCache = {};
  var countriesLayer = new ol.layer.Vector({
    source:  new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: '/geodata/countries.geojson'
    }),
    style: function(feature, resolution) {
      var text = resolution < 5000 ? feature.get('name') : '';
      if (!styleCache[text]) {
        styleCache[text] = [new ol.style.Style({
          fill: new ol.style.Fill({ color: '#57B26E' }),
          stroke: new ol.style.Stroke({ color: '#7EC486', width: 1 })
        })];
      }
      return styleCache[text];
    }
  });

  var popupElem = document.getElementById('popup');

  var popup = new ol.Overlay({
    element: popupElem,
    positioning: 'top-center',
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
    layers: [countriesLayer, events],
    overlays: [popup],
    target: document.getElementById('map'),
    view: new ol.View({
      center: translateToMapCoords([0, 40]),
      zoom: 1.2,
      minZoom: 1.2,
      maxZoom: 7,
      extent: [-17400000,-6040000,19400000,16200000]
    })
  });

  var geocoder = new Geocoder('nominatim', {
    provider: 'photon',
    lang: 'en',
    placeholder: 'Search for ...',
    limit: 5,
    debug: true,
    autoComplete: true,
    keepOpen: false,
    preventDefault: true
  });
  map.addControl(geocoder);

  geocoder.on('addresschosen', function(evt){
    flyTo(map, evt.coordinate);
  });

  // display popup on click
  map.on('click', function(evt) {
    $(popupElem).popover('destroy');
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
          if (layer == events)
             return feature;
        });
    if (feature) {
      var geometry = feature.getGeometry();
      var coord = geometry.getCoordinates();
      var content = ""
      var eventUrls = feature.get('urls')
      if (eventUrls.length == 1) {
        content += "<p><a href=\"" + eventUrls[0] + "\" target=\"_blank\">View&nbsp;Event</a></p>"
      } else {
        content += "<p>"
        for(var i = 0; i < eventUrls.length; i++) {
          content += "<a href=\"" + eventUrls[i] + "\" target=\"_blank\">View&nbsp;Event&nbsp;#" + (i + 1) + "</a></br>"
        }
        content += "</p>"
      }
      popup.setPosition(coord);
      $(popupElem).popover({
        'animation': false,
        'placement': 'top',
        'html': true,
        'title': feature.get('name'),
        'content': content
      });
      // workaround for already displayed popovers
      $( "div.popover-content" ).text(feature.get('name'))

      $(popupElem).popover('show');
    }
  });

  // change mouse cursor when over marker
  $(map.getViewport()).on('mousemove', function(e) {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      return layer == events;
    });
    if (hit) {
      map.getTarget().style.cursor = 'pointer';
    } else {
      map.getTarget().style.cursor = '';
    }
  });
});
