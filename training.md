---
layout: default
---

<div id="main">
    <div id="content">
      <h1>Upcoming training sessions</h1>
      <div class="tip">Like last year, we will have Hangout sessions to help you get started with running and facilitating a coderetreat.</div>
      <div class="tip">Tip: visit the event page to see the date and time converted to your local timezone.</div>

      <div class="Umd">
        {% for training in site.data.trainings-2017 %}
          {% include session.html %}
        {% endfor %}
      </div>

      <h1>GDCR calendar</h1>
      <div class="tip">Use the calendar below to get a sense of when the next training sessions are happening.</div>

      <div class="Umd">
        <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=30td8sjjqdjb6j1aovas0tg0ug%40group.calendar.google.com&amp;color=%235F6B02&amp;ctz=Europe%2FBucharest" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
      </div>

      <hr/>

      <div id='past-training'>
        <h1>Past training sessions - 2016</h1>
        <div class="Umd">
          {% for training in site.data.past-trainings-2016 %}
            {% include session.html %}
          {% endfor %}
        </div>
      </div>
    </div>
</div>

<!--/main-->
