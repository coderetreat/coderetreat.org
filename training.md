---
layout: default
---

<div id="main">
    <div id="content">
      <h1>Upcoming training sessions</h1>
      <div class="tip">Like last year, we will have Hangout sessions to help you get started with running and facilitating a coderetreat.</div>
      <div class="tip">Tip: visit the event page to see the date and time converted to your local timezone.</div>

      <div class="Umd">
        {% for training in site.data.trainings.trainings-2017 %}
          {% include session.html %}
        {% endfor %}
      </div>

      <hr/>

      <div id='past-training'>
        <h1>Past training sessions - 2016</h1>
        <div class="Umd">
          {% for training in site.data.past-trainings.trainings-2016 %}
            {% include session.html %}
          {% endfor %}
        </div>
      </div>
    </div>
</div>

<!--/main-->
