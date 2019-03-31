---
layout: default
title: Coderetreat Contributors
description: Coderetreat pioneers, Global Day of Coderetreat (GDCR) trainers and coordinators of the past 10 years
image:
    src: /images/10-years/thank-you.jpg
---

On the special occasion of celebrating **10 years of coderetreat**, we want to give credit to the many people who have contributed by promoting and taking this idea forward. 

Here are some\* of the **coderetreat pioneers**, **Global Day of Coderetreat (GDCR) trainers** and **coordinators** of the past 10 years:

<div style="display: flex; flex-wrap: wrap">	
{% for contributor in site.data['10_years'].contributors.contributors %}
	{% include contributor.html %}
{% endfor %}
</div>

\* This list includes only the people who explicitly agreed on being included on this page. If you are a **coderetreat pioneer**, a **GDCR trainer** or a **coordinator** of the past 10 years and want to be included on this page, <a href="mailto:gdcr@coderetreat.org">please, let us know</a>.
