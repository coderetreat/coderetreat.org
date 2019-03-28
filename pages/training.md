---
layout: default
title: Training
description: Pre-recorded training sessions and calendar
image:
    src: /images/facilitating/blackboard.jpg
---

{% capture nowunix %}{{'now' | date: '%s'}}{% endcapture %}

<h2>Pre-recorded training sessions</h2>

<section class="videos">
  <ul class="video-list">
    {% assign videos = site.data.videos-training | sort: 'date' %}
    {% for video in videos %}
    <li class="video">
      {% if video.youtube %}
      <iframe src="https://www.youtube.com/embed/{{ video.youtube }}" frameborder="0" allowfullscreen></iframe>
      {% endif %}

      {% if video.vimeo %}
      <iframe src="https://player.vimeo.com/video/{{video.vimeo}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      {% endif %}

      <div class="title">{{video.added}} by {{video.author}}</div>
    </li>
    {% endfor %}
  </ul>
</section>

<h2>Upcoming training sessions</h2>

<div class="tip">Like last year, we will have Hangout sessions to help you get started with running and facilitating a coderetreat.</div>
<div class="tip">Tip: visit the event page to see the date and time converted to your local timezone.</div>

<div class="Umd">
  {% for training in site.data.trainings.trainings-2018 reversed %}
    {% capture posttime %}{{training.dateTime | date: '%s'}}{% endcapture %}
    {% if posttime > nowunix %}
      {% include session.html %}
      {% assign some_current_training = true %}
    {% endif %}
  {% endfor %}
  {% unless some_current_training == true %}
    <br><h3>
      No trainings currently scheduled.<br>
      <a href="mailto:gdcr@coderetreat.org?subject=Request%20training%20for%20Global%20Day%20of%20Coderetreat">Request One!</a>
    </h3><br>
  {% endunless %}
</div>

<h2>GDCR calendar</h2>
<div class="tip">Use the calendar below to get a sense of when the next training sessions are happening.</div>

<div class="Umd">
  <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=30td8sjjqdjb6j1aovas0tg0ug%40group.calendar.google.com&amp;color=%235F6B02&amp;ctz=Europe%2FBucharest" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
</div>

<hr/>

<div id='past-training'>
    <h2>Past training sessions - 2018</h2>
    <div class="Umd">
    {% for training in site.data.trainings.trainings-2018 %}
      {% capture posttime %}{{training.dateTime | date: '%s'}}{% endcapture %}
      {% if posttime < nowunix %}
        {% include session.html %}
      {% endif %}
    {% endfor %}
    </div>
    
    <h2>Past training sessions - 2017</h2>
    <div class="Umd">
      {% for training in site.data.trainings.trainings-2017 %}
        {% capture posttime %}{{training.dateTime | date: '%s'}}{% endcapture %}
        {% if posttime < nowunix %}
          {% include session.html %}
        {% endif %}
      {% endfor %}
    </div>
</div>
