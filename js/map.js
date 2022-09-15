import "regenerator-runtime/runtime";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map/style.scss";

import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";
const { ZonedDateTime } = jsjoda;

import pastEvents from "./map/all-events.json";

const run = async () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicnJhZGN6ZXdza2kiLCJhIjoiY2o3OWg4ZHV0MDFrdjM3b2FvcXFqdmtidiJ9.oULZ0ljtFZqMHFDbyvkwVQ";

  const map = new mapboxgl.Map({
    container: "map", // container element id
    style: "mapbox://styles/mapbox/light-v10",
    center: [-74.0059, 40.7128], // initial map center in [lon, lat]
    zoom: 1,
  });

  const log = document.querySelector("#event-log");

  const eventsWithLocation = pastEvents
    .filter((event) => !!event.location?.coordinates)
    .map((event) => ({
      ...event,
      date: {
        start: ZonedDateTime.parse(event.date.start),
        end: ZonedDateTime.parse(event.date.end),
      },
    }))
    .sort((a, b) => a.date.start.compareTo(b.date.start));

  let eventDataSource = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: eventsWithLocation.map((event, i) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            event.location.coordinates.longitude,
            event.location.coordinates.latitude,
          ],
        },
        properties: {
          title: event.title,
          start: event.date.start.toString(),
          timeStart: event.date.start.toEpochSecond(),
          num: i + 1,
          opacity: 1,
        },
      })),
    },
  };
  console.log(eventDataSource);

  map.on("load", () => {
    map.addSource("events", eventDataSource);
    map.addLayer({
      id: "events",
      type: "circle",
      source: "events",
      filter: [
        "<=",
        ["number", ["get", "timeStart"]],
        eventDataSource.data.features[0].properties.timeStart,
      ],
      paint: {
        "circle-color": "#0FF",
        "circle-radius": 5,
        "circle-opacity": ["number", ["get", "opacity"]],
      },
    });
    updateCurrentDate();
  });

  const currentDate = document.querySelector("#current-date");

  const slider = document.querySelector("#time-slider");
  slider.min = 0;
  slider.max = eventsWithLocation.length - 1;
  slider.step = 1;

  const updateCurrentDate = (e) => {
    console.log(e);
    const event = eventsWithLocation[slider.value];
    currentDate.innerHTML = event.date.start.toLocalDate().toString();

    eventDataSource.data.features = eventDataSource.data.features.map(
      (feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          opacity: Math.max(0.2, feature.properties.num / (slider.value + 1)),
        },
      })
    );
    map.getSource("events").setData(eventDataSource.data);

    map.setFilter("events", [
      "<=",
      ["number", ["get", "timeStart"]],
      event.date.start.toEpochSecond(),
    ]);

    log.innerHTML = eventDataSource.data.features
      .filter(
        (ref) => ref.properties.timeStart <= event.date.start.toEpochSecond()
      )
      .map((event) => `<p>${event.properties.title}</p>`)
      .join("");
    window.setTimeout(() => {
      log.scrollTo({top: log.scrollHeight, behavior: "smooth"})
    })
  };

  slider.addEventListener("input", updateCurrentDate);
  window.THEMAP = map;
};

run();
