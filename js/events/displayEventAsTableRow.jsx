import { render, h } from "preact";
import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";

const { convert } = jsjoda;

export default function displayEventAsTableRow(event, timeZone) {

  const DATE_FORMAT = jsjoda.DateTimeFormatter.ofPattern("u-M-F, HH:mm");

  return <tr key={event.id}>
    <th>
      {event.date.start.withZoneSameInstant(timeZone).format(DATE_FORMAT)}
    </th>
    <td>
      <a href={event.url}>{event.title}</a>
    </td>
    <td>
      {event.location === "virtual"
        ? "Virtual"
        : `${event.location.city}, ${event.location.country}`}
    </td>
  </tr>;
}