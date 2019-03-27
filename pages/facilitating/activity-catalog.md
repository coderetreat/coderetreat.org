---
layout: default
title: Activity Catalog
---

Since Coderetreat has started, facilitators have been coming up with activities, constraints, or challenges to give to groups during a coderetreat. However, if you are a new facilitator, you might not know what activities to use when. This page contains a catalog of activities.

Most of the activities documented here are designed to help participants think about writing code differently than they would otherwise. Every activity has a specific learning goal in mind.

You should not feel that the list below are the only activities you can try at a coderetreat. You are welcome and encouraged to find challenges which best meet the needs of the group you are facilitating. In fact, you do not have to use any of the activities presented here.

<!--
## Suggesting a new Activity

If you have an activity you would like to see added to this list, please post the suggestion on the What are some exercises and constraints that people use during sessions? topic under the Facilitator Group's forum (note: you will have to join the group first before you can post).
-->

## Basic Activities

Simple activities which are good for less-experienced groups.

    Ping pong
    Navigator-driver

## Missing Tool Activities

Activities which involve removing a tool developers are used to using in order to help them learn how to use other tools more effectively.

    No Mouse
    Text editor only
    Paper only

## Missing Feature Activities

Activities which involve removing a common langauge feature developers are used to using in order to help them learn how to use higher-levels of abstraction to write better code.

    No naked primitives
    No conditional statements
    No loops

## Quality Constraint Activities

Activities which impose specific quality constraints to help developers practice a particur aspect of well-written code.

    Only four lines per method
    Immutables only, please

## Stretch Activities

Activities designed to stretch a group. Most of these activities tend to try to push developers into new ways of thinking about their code.

    Verbs instead of Nouns
    Code Swap
    Mute with find the loophole
    TDD as if you meant it

## Videos

<section class="videos">
  <ul class="video-list">
    {% assign videos = site.data.videos | where:"type","session" | sort: 'title' %}
    {% include video.html %}
  </ul>
</section>

<p class="last-section">
    <a href="https://drive.google.com/drive/folders/0B3idvASFqaEbN2RkNDYyYjktYTlkZi00ZjFiLWFmMDEtNjJhYTBkYzM2ZDlh?usp=sharing">Look at this exhaustive collection of constraints by Adrian Bolboaca</a>
</p>
