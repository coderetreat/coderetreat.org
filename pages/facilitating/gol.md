---
layout: default
title: Conway's Game of Life
description: The programming challenge used at every traditional coderetreat, for every session 
image:
    src: /images/facilitating/game-of-life.png
---

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

![Conways Game of Life](/images/Gospers_glider_gun.gif)

The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

<ul class="video-list">
<li class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/FdMzngWchDk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<div class="title">John Conway Talks About the Game of Life (part 1)</div>
</li>
</ul>

The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead. 

Every cell interacts with its eight neighbors, which are the cells that are directly horizontally, vertically, or diagonally adjacent.

At each step in time, the following transitions occur:

* Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
* Any live cell with more than three live neighbours dies, as if by overcrowding.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any dead cell with exactly three live neighbours becomes a live cell.

The initial pattern constitutes the seed of the system.

The first generation is created by applying the above rules simultaneously to every cell in the seed: births and deaths happen simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the one before). 

The rules continue to be applied repeatedly to create further generations.

## Game of Life demos provided by the community

<section class="videos">
  <ul class="video-list">
    {% assign videos = site.data.videos | where:"type","demo" | sort: 'date' %}
    {% include video.html %}
  </ul>
</section>

## Game of Life schemas provided by the community

There are useful to hang it to a near wall as a reminder for the game rules or you can print copies for attendees.

<section>
{% for schema in site.data.gol-schemas %}
<a href="{{ schema.url }}" title="Schema by {{ schema.author}}"><img alt="" src="{{ schema.url }}" width="300px" style="float:left;padding:2em;"></a>
{% endfor %}
</section>

You can find the schema by Marco Emrich in other formats: [PDF or SVG](https://github.com/marcoemrich/game-of-life-rules/). 

And another PDF version by [Lemi Orhan Ergin, Software Craftsmanship Turkey](/docs/gol-schemas/Lemi-Orhan-Ergin.pdf).

Last but not least, Markus Decke created a [pocketmod handout](https://github.com/mrksdck/coderetreat-pocketmod)!

## Game of Life challenge

To practice on paper in order to understand the rules of Conway's Game of Life:

* [Blank grid](/docs/gol-schemas/gol-blank-grid.pdf)
* [Challenge](/docs/gol-schemas/gol-challenge.pdf)
* [Solution](/docs/gol-schemas/gol-solution.pdf)

