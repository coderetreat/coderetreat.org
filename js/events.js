var renderTemplate = function(template, objects, container) {
  var html =  $.templates(template).render(objects);
  $(container).html(html);
};

var renderEventTemplate = function(dataJson, template, container) {
  $.get(dataJson, function(events) {
    $.get(template, function(eventTemplate) {
      renderTemplate(eventTemplate, events, container);
    });
  });
};

var renderEventsJson = function(eventsJson, template, container) {
  var events = Object.values(eventsJson);
  $.get(template, function(eventTemplate) {
    renderTemplate(eventTemplate, events, container);
  });
};

var renderEvents = function(year) {
  if (year < 2017) {
    initEventsOnMap('gdcr'+year+'-stripped.json');
    renderEventTemplate('/events/gdcr'+year+'.json', "past-event.tmpl", "#events");
  } else {
    $.get('/events/gdcr'+year+'.json', function(eventsJson) {
      var gdcrEvents = mapEventsDataToMapFormat(eventsJson);
      addEventsToMap(gdcrEvents);
      renderEventsJson(eventsJson, "event.tmpl", "#events");
    });
  }
}
