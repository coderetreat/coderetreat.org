---
layout: default
---

{% capture nowunix %}{{'now' | date: '%s'}}{% endcapture %}

<div id="main">
    <div id="content">

    <section class="videos">
      <h1>Pre-recorded training sessions</h1>

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

      <h1>Upcoming training sessions</h1>
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
            <a href="mailto:gdcr@coderetreat.org?subject=Request%20training%20for%20GDCR2017">Request One!</a>
          </h3><br>
        {% endunless %}
      </div>

      <h1>GDCR calendar</h1>
      <div class="tip">Use the calendar below to get a sense of when the next training sessions are happening.</div>

      <div class="Umd">
        <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=30td8sjjqdjb6j1aovas0tg0ug%40group.calendar.google.com&amp;color=%235F6B02&amp;ctz=Europe%2FBucharest" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
      </div>

      <hr/>

      <div id='past-training'>
        <h1>Past training sessions - 2017</h1>
        <div class="Umd">
          {% for training in site.data.trainings.trainings-2017 %}
            {% capture posttime %}{{training.dateTime | date: '%s'}}{% endcapture %}
            {% if posttime < nowunix %}
              {% include session.html %}
            {% endif %}
          {% endfor %}
        </div>

        <h1>Past training sessions - 2016</h1>
        <div class="Umd">
          {% for training in site.data.trainings.trainings-2016 %}
            {% include session.html %}
          {% endfor %}
        </div>
      </div>
    </div>
</div>

<!--/main-->
