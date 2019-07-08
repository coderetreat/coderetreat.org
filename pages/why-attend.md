---
layout: default
title: Why Attend
description: If you have never attended a coderetreat and you would like to know the reason why it's so special
---

<div class="posts-container">

{% for reason in site.data.why-attend %}
<h2>{{ reason.title }}</h2>

{% for quote in reason.examples %}
<blockquote class="quote">
  <p class="first">{{ quote.text }}</p>
  <cite><a href="{{ quote.url }}">{{ quote.author }}</a></cite>
</blockquote>
{% endfor %}
{% endfor %}

<p class="last-section">
    <a href="{% link pages/10-years/index.md %}">Do you know that we're celebrating 10th Coderetreat Anniversary?</a>
</p>

</div>
