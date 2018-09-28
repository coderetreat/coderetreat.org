#!/usr/bin/env bash

DIRECTORY="_data/events_gdcr2018"
FILES=$(ls $DIRECTORY/*.json)

LAST_5_EVENTS=$(for i in $FILES; do git --no-pager log --diff-filter=A --follow --format="%at $i" -- $i | tail -1; done | sort | tail -n 5 | awk '{ print $2 }')

echo "Here are tweetable welcome messages for the latest five events registered (as per git)"
echo ""

for j in $LAST_5_EVENTS;
  do
    jq -r '
      "🌐 Welcome " +
      .location.city + ", " + .location.country +
      (if (.moderators | length) == 1 then
        " with " + .moderators[0]
      elif (.moderators | length) > 1 then
        " with " + (.moderators[:-1] | join(", ")) + " & " + (.moderators[-1])
      else "" end) +
      " to the Global Day Of Coderetreat 2018 on Nov 17th! #gdcr18 #coderetreat " + .url
      ' $j;
  done
