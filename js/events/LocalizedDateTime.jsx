import * as jsjoda from "@js-joda/core";
import "@js-joda/timezone";

const DATETIME_FORMAT = jsjoda.DateTimeFormatter.ofPattern("u-M-d, HH:mm");
export function LocalizedDateTime({date, timeZone})
{
  return date.withZoneSameInstant(timeZone).format(DATETIME_FORMAT)
}

const DATE_FORMAT = jsjoda.DateTimeFormatter.ofPattern("u-M-d");
export function LocalizedDate({date, timeZone})
{
  return date.withZoneSameInstant(timeZone).format(DATE_FORMAT)
}