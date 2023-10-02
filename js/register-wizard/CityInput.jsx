import { h, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const findCities = async (searchTerm) => {
  const response = await fetch(
    `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      searchTerm
    )}.json?types=place&access_token=pk.eyJ1IjoicnJhZGN6ZXdza2kiLCJhIjoiY2tjZ2cyenJqMGp1YzJ0bHBrOTR5dHlsdyJ9.6kI34USWMzJ3hxS7j946xg`
  );
  if (!response.ok)
    throw new Error("Error while fetching cities: " + JSON.stringify(response));

  return (await response.json()).features;
};

export const CityInput = ({ onAutoComplete, onBlur }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  return (
    <AsyncTypeahead
      isLoading={isLoading}
      labelKey="text"
      onChange={onAutoComplete}
      renderMenuItemChildren={(option) => option.place_name}
      onBlur={onBlur}
      onSearch={async (query) => {
        setIsLoading(true);
        const cities = await findCities(query);
        setIsLoading(false);
        setOptions(cities);
      }}
      options={options}
    />
  );
};
