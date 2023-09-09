import { LocalizedDateTime } from "./LocalizedDateTime";

export default function displayEventAsTableRow(event, timeZone) {
  return (
    <tr key={event.id}>
      <th>
        <LocalizedDateTime date={event.date.start} timeZone={timeZone} />
      </th>
      <td>
        <a href={event.url}>{event.title}</a>
      </td>
      <td>
        {event.location === "virtual"
          ? "Virtual"
          : `${event.location.city}, ${event.location.country}`}
      </td>
    </tr>
  );
}
