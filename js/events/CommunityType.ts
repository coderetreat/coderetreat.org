export type Community = {
    location: RealLocation | VirtualLocation;
    /**
     * Name of the community
     */
    name: string;
    /**
     * An URL leading to further information about your event, e.g. sign up on meetup/eventbrite
     */
    url: string;
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
    country:      string;
}

/**
 * Lat/Long values, given in EPSG:3857 (http://wiki.openstreetmap.org/wiki/EPSG:3857)
 */
export type Coordinates = {
    latitude:  number;
    longitude: number;
}

export enum VirtualLocation {
    Virtual = "virtual",
}

export type CommunityWithId = Community & { id: string };

export const communityHasPhysicalLocation = (
    community: CommunityWithId
  ): community is CommunityWithId & {
    location: Required<RealLocation>;
  } => community.location !== "virtual" &&
    typeof community.location?.coordinates === "object";
  
export const communityToGeoJSONFeature = (community: Community & { id: string; } & { location: Required<RealLocation>; }): GeoJSON.Feature => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        community.location.coordinates.longitude,
        community.location.coordinates.latitude,
      ],
    },
    properties: {
      name: community.name,
      id: community.id,
      url: community.url
    },
  });