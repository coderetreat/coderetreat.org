---
layout: post
comments: true
audience: facilitators
title: Conway's Game of Life
description: The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
---
<h1 class="display-1">Game Of Life</h1>
<div class="ratio-16-9 my-5">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/FdMzngWchDk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.


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

<div class="row">
  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">GameOfLife<br />by Liao-Yuan Zhang (01:24)</div>
        </h5>
        <iframe
          src="https://www.youtube.com/embed/xc491GY5AgU"
          frameborder="0"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">
            Conways Game of Life on the GPU<br />by Ivett Ördög (03:54)
          </div>
        </h5>
        <iframe
          src="https://www.youtube.com/embed/7opDDBW7JaU"
          frameborder="0"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">
            Conway's Game Of Life in APL<br />by DyalgLtd (07:47)
          </div>
        </h5>
        <iframe
          src="https://www.youtube.com/embed/a9xAKttWgP4"
          frameborder="0"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">SmoothLifeL<br />by Tim Hutton (03:36)</div>
        </h5>
        <iframe
          src="https://www.youtube.com/embed/KJe9H6qS82I"
          frameborder="0"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">Life in life<br />by Phillip Bradbury (01:29)</div>
        </h5>
        <iframe
          src="https://www.youtube.com/embed/xP5-iIeKXE8"
          frameborder="0"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">
            Epic conway's game of life<br />by Emanuele Ascani (06:32)
          </div>
        </h5>
        <iframe
          src="https://www.youtube.com/embed/C2vgICfQawE"
          frameborder="0"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
  </div>
</div>


## Game of Life schemas provided by the community

There are useful to hang it to a near wall as a reminder for the game rules or you can print copies for attendees.

You can find the schema by Marco Emrich in other formats: [PDF or SVG](https://github.com/marcoemrich/game-of-life-rules/). 

And another PDF version by [Lemi Orhan Ergin, Software Craftsmanship Turkey](/facilitators/assets/gol-schemas/Game-of-Life-Rules.pdf).

Last but not least, Markus Decke created a [pocketmod handout](https://github.com/mrksdck/coderetreat-pocketmod)!

## Game of Life challenge

To practice on paper in order to understand the rules of Conway's Game of Life:

* [Blank grid](/facilitators/assets/gol-schemas/gol-blank-grid.pdf)
* [Challenge](/facilitators/assets/gol-schemas/gol-challenge.pdf)
* [Solution](/facilitators/assets/gol-schemas/gol-solution.pdf)

