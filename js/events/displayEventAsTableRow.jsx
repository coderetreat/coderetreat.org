import { render, h } from "preact";
import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";

const { convert } = jsjoda;

export default function displayEventAsTableRow(event) {

  const dateTimeFormatter = new Intl.DateTimeFormat("default", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return <tr key={event.id}>
    <th>
      {dateTimeFormatter.format(convert(event.date.start).toDate())}
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