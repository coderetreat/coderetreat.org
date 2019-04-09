---
layout: default
title: Why attend
description: If you have never attended a coderetreat and you would like to know the reason why it's so special
---

{% for reason in site.data.why-attend %}
## {{ reason.title }}

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
