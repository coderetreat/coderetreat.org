---
layout: post
title: Activity Catalog
audience: facilitators
description: A catalog of challenges or activities attempted at previous coderetreats
---

<h1 class="display-1">Constraints</h1>
Since Coderetreat has started, facilitators have been coming up with activities, constraints, or challenges to give to groups during a coderetreat. However, if you are a new facilitator, you might not know what activities to use when. This page contains a catalog of activities.

Most of the activities documented here are designed to help participants think about writing code differently than they would otherwise. Every activity has a specific learning goal in mind.

You should not feel that the list below are the only activities you can try at a coderetreat. You are welcome and encouraged to find challenges which best meet the needs of the group you are facilitating. In fact, you do not have to use any of the activities presented here.

<!--
## Suggesting a new Activity

If you have an activity you would like to see added to this list, please post the suggestion on the What are some exercises and constraints that people use during sessions? topic under the Facilitator Group's forum (note: you will have to join the group first before you can post).
-->

## Basic Activities

Simple activities which are good for less-experienced groups.

- **Ping Pong**: One person writes the test, the other implements the test.
- **Mute Ping Pong**: Same as Ping Pong, but the pair is not allowed to talk. No cheating with comments or any form of writing. You can talk about things not related to the problem, but you cannot talk about design. (Facilitator note: this should be teaching about expressive design).
- **Evil Coder**: An activity where the person implementing tries to implement the code in a way the tester doesn’t expect (also teaches expressive design).
- You could combine Mute ping pong and Evil coder.
- **Navigator-driver**

## Missing Tool Activities

Activities which involve removing a tool developers are used to using in order to help them learn how to use other tools more effectively.

- **No Mouse**: Not allowed to touch the mouse (you can use the mouse to discover the keystrokes)
- **Text editor only**: No editor (not the best idea) teaches people to know their languages well enough they don’t need
- **Paper only**

## Missing Feature Activities

Activities which involve removing a common langauge feature developers are used to using in order to help them learn how to use higher-levels of abstraction to write better code.

- **No naked primitives**: They must be enclosed in a class
- **No conditional statements**: No ifs, no switch, no loops for conditional.
  - The alternatives are polymorphism and hashtables
  - Conditional statements are a form of primitive obsession (we tend to use the lowest level of abstraction instead of choosing a higher level). For example, we may choose an int for an employee number instead of an employee number class.
- **Every method must be void**: Very challenging; it encourages “tell don’t ask” style. In game of life, you might have a `GetNextGenaration` method. Instead you might write `CreateNextGeneration`.
- **No loops**

## Quality Constraint Activities

Activities which impose specific quality constraints to help developers practice a particur aspect of well-written code.

- **Only four lines per method**
- **Immutables only, please**

## Stretch Activities

Activities designed to stretch a group. Most of these activities tend to try to push developers into new ways of thinking about their code.

- **Verbs instead of Nouns**
- **Code Swap**: A good activity for the last two activities of the day are:
  - After the second to last session have them stand up but don’t delete their code, then sit down and write what you do and don’t like about your code
  - And then for the last session they aren’t going to swap pairs, instead they are going to swap stations and work on another pair’s code. You need to facilitate this in a very active way. Ask each pair what they’ve decided to improve on. Encourage them to go back to the four rules. This activity does not work if every pair is in a different programming language.
- **Mute with find the loophole**
- **TDD as if you meant it**
- **Taking Baby steps**: Every pair has their own timer. They set it for 5 minutes. They have 5 minutes to write the code. Then 5 minutes to implement the test. Then 5 minutes to refactor. If they don’t finish before the timer goes off they have to delete and start over. (People get frustrated for the first 10 minutes.)

## Videos

<div class="row">
  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">Adversarial Ping Pong<br />by Mike Gardiner (01:05)</div>
        </h5>
        <iframe src="https://player.vimeo.com/video/54658144" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">Baby Steps<br />by Toni Tassani (00:38)</div>
        </h5>

        <iframe src="https://player.vimeo.com/video/54580988" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">Code Swap Part 1<br />by Peter Aitken (00:35)</div>
        </h5>

        <iframe src="https://player.vimeo.com/video/54829522" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">Code Swap Part 2<br />by Alan Gardner (00:53)</div>
        </h5>

        <iframe src="https://player.vimeo.com/video/54845015" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">Mixed Constraints<br />by Jesse Wolgamott (01:04)</div>
        </h5>

        <iframe src="https://player.vimeo.com/video/54845248" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">Mute Ping Pong<br />by Ray Grasso (00:59)</div>
        </h5>

        <iframe src="https://player.vimeo.com/video/54658140" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">No Conditional Statements<br />by Manuel Kiessling (00:28)</div>
        </h5>

        <iframe src="https://player.vimeo.com/video/54580990" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">No Return Values<br />by Joseph Yao (00:42)</div>
        </h5>

        <iframe src="https://player.vimeo.com/video/54828355" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>

  <div class="col-lg-4 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="title">Verbs Instead of Nouns<br />by Miha Filej (00:27)</div>
        </h5>

        <iframe src="https://player.vimeo.com/video/54581232" frameborder="0" webkitallowfullscreen=""
          mozallowfullscreen="" allowfullscreen=""></iframe>
      </div>
    </div>
  </div>
</div>  

<p class="last-section">
    <a href="https://drive.google.com/drive/folders/0B3idvASFqaEbN2RkNDYyYjktYTlkZi00ZjFiLWFmMDEtNjJhYTBkYzM2ZDlh?usp=sharing">Look at this exhaustive collection of constraints by Adrian Bolboaca</a>
</p>
