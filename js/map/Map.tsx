import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.scss";
import { Event, EventWithId, RealLocation } from "../events/EventType";

mapboxgl.accessToken =
  "pk.eyJ1IjoicnJhZGN6ZXdza2kiLCJhIjoiY2o3OWg4ZHV0MDFrdjM3b2FvcXFqdmtidiJ9.oULZ0ljtFZqMHFDbyvkwVQ";

export const Map = ({
  events,
  onClickOnEvent,
}: {
  events: EventWithId[];
  onClickOnEvent?: (String) => void;
}) => {
  const mapRef = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      dragRotate: false,
      container: mapRef.current!, // container element id
      style: "mapbox://styles/mapbox/light-v10",
      center: [Math.random() * 360 - 180, 40.7128], // initial map center in [lon, lat]
      zoom: 0,
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showAccuracyCircle: false,
        trackUserLocation: false,
        fitBoundsOptions: {
          maxZoom: 7,
        },
      })
    );

    map.current.on("load", ({ target }) => {
      const eventDataSource: mapboxgl.GeoJSONSourceRaw = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      };
      target.addSource("events", eventDataSource);
      target.addLayer({
        id: "events",
        type: "circle",
        source: "events",
        paint: {
          "circle-color": "#0FF",
          "circle-radius": 5,
        },
      });
      target.addLayer({
        id: "events-title",
        type: "symbol",
        source: "events",
        layout: {
          "text-field": ["get", "title"],
          "text-size": 12,
        },
      });

      target.on("click", ["events", "events-title"], (e) => {
        // Copy coordinates array.
        const feature = e.features?.[0];
        if (!feature) return;

        const div = document.createElement("div");
        div.innerHTML = `
        <h4>${feature.properties!.title}</h4>
        <p>${feature.properties!.city}, ${feature.properties!.country}</p>`;

        const link = document.createElement("a");
        link.addEventListener("click", (e) => {
          e.preventDefault();
          onClickOnEvent?.(feature.properties!.id);
          popup?.remove();
        });
        link.innerText = "View Event";
        link.href = "";
        div.appendChild(link);

        const popup = new mapboxgl.Popup()
          .setLngLat(
            (feature.geometry as GeoJSON.Point).coordinates as [number, number]
          )
          .setDOMContent(div)
          .addTo(target);
      });

      target.on("mouseenter", "events", () => {
        target.getCanvas().style.cursor = "pointer";
      });

      target.on("mouseleave", "events", () => {
        target.getCanvas().style.cursor = "";
      });

      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      setMapLoaded(false);
    };
  }, [mapRef]);

  console.log(events);
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    const newData: mapboxgl.GeoJSONSourceRaw["data"] = {
      type: "FeatureCollection",
      features: events
        .filter(
          (
            event
          ): event is EventWithId & {
            location: Required<RealLocation>;
          } =>
            event.location !== "virtual" &&
            typeof event.location?.coordinates === "object"
        )
        .map((event) => ({
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
            id: event.id,
            city: event.location.city,
            country: event.location.country,
          },
        })),
    };
    (map.current.getSource("events") as mapboxgl.GeoJSONSource).setData(
      newData
    );
  }, [events, map, mapLoaded]);

  return (
    <div className="map-container border">
      <div ref={mapRef} className="map"></div>
    </div>
  );
};
