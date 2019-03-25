---
layout: default
title: 10 years of Coderetreat
description: Special things done because of 10th anniversary
---

It's a pleasure for us to celebrate the 10th anniversary of the coderetreat format this year.

We're preparing special things. 

We'll inform about them here and at <a href="https://twitter.com/coderetreat">Twitter</a>. Stay tuned!

<div style="display: flex; flex-wrap: wrap">	
{% for special in site.data.10_years.specials %}
	<a href="{{special.link}}" target="{{special.target}}">
		{% include 10-years-card.html %}
	</a>
{% endfor %}
</div>
