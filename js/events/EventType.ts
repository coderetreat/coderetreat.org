export type Event = {
  /**
   * A link to your code of conduct (if your CoC is on your sign up page, just repeat that URL
   * here
   */
  code_of_conduct?: string;
  /**
   * The start and end time of your event. Please use your local timezone so we know which
   * timezone you're in and can promote your event accordingly
   */
  date: DateClass;
  /**
   * A description of your event. Here's where you could mention any particular TechStack,
   * language or tool that you will be using
   */
  description?: string;
  /**
   * Whether your event will specifically use pair-programming or ensemble/mob-programming.
   * Optional, can be any string
   */
  format?: string;
  location?: RealLocation | VirtualLocation;
  moderators?: Moderator[];
  /**
   * The spoken language your event will take place in (e.g. English, Chinese, German).
   */
  spoken_language: string;
  sponsors?: Sponsor[];
  /**
   * The title/name of your event
   */
  title: string;
  /**
   * An URL leading to further information about your event, e.g. sign up on meetup/eventbrite
   */
  url: string;
}

/**
 * The start and end time of your event. Please use your local timezone so we know which
 * timezone you're in and can promote your event accordingly
 */
export type DateClass = {
  end: Date;
  start: Date;
}

/**
 * Further data about the location your event takes place at
 */
export type RealLocation = {
  city: string;
  /**
   * Lat/Long values, given in EPSG:3857 (http://wiki.openstreetmap.org/wiki/EPSG:3857)
   */
  coordinates?: Coordinates;
  country: string;
}

/**
 * Lat/Long values, given in EPSG:3857 (http://wiki.openstreetmap.org/wiki/EPSG:3857)
 */
export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type VirtualLocation = "virtual";

/**
 * List of moderators
 */
export type Moderator = {
  /**
   * Moderator's name
   */
  name: string;
  /**
   * Moderator's url: Twitter profile, GitHub profile, website, ...
   */
  url?: string;
}

/**
 * List of sponsors
 */
export type Sponsor = {
  /**
   * Sponsor's name
   */
  name: string;
  /**
   * Sponsor's url: Twitter profile, GitHub profile, website, ...
   */
  url?: string;
}

export type EventWithId = Event & { id: string };

export const eventHasPhysicalLocation = (
  event: EventWithId
): event is EventWithId & {
  location: Required<RealLocation>;
} => event.location !== "virtual" &&
  typeof event.location?.coordinates === "object";

export const eventToGeoJSONFeature = (event: Event & { id: string; } & { location: Required<RealLocation>; }): GeoJSON.Feature => ({
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
    url: event.url
  },
});