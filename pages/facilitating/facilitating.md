---
layout: default
title: Facilitating a Coderetreat
description: Help improve developers in your community by facilitating a coderetreat in your city
---

Help improve developers in your community by facilitating a coderetreat in your city.

The **facilitator** is an essential part of coderetreat. Responsibilities include:

* introducing the day
* guiding participants through each session
* leading inter-session retrospectives
* leading the closing circle

It is the job of the facilitator to help people learn as much as possible during the coderetreat.

If possible, [attend at least one coderetreat](/events) before attempting to facilitate a coderetreat yourself.

There are many resources on this site to help you prepare for facilitating a coderetreat.

When you feel ready, volunteer to facilitate a coderetreat!

<div style="display: flex; flex-wrap: wrap">
{% for topic in site.data.facilitating %}
    <a href="{{topic.url}}" title="{{topic.title}}">
        {% include topic-card.html %}
    </a>
{% endfor %}
</div>

<p class="last-section">
    <a href="http://slack.softwarecrafters.org/">Join us on Software Crafters Slack Team at #coderetreat channel</a>
</p>
