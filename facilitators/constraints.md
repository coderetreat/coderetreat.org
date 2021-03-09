---
layout: post
title: Activity Catalog
audience: facilitators
description: A catalog of challenges or activities attempted at previous Coderetreats
---

<h1 class="display-1">Constraints</h1>
Since Coderetreat has started, facilitators have been coming up with activities, constraints, or challenges to give to groups during a coderetreat. However, if you are a new facilitator, you might not know what activities to use when. This page contains a catalog of activities.

Most of the activities documented here are designed to help participants think about writing code differently than they would otherwise. Every activity has a specific learning goal in mind.

You should not feel that the list below are the only activities you can try at a coderetreat. You are welcome and encouraged to find challenges which best meet the needs of the group you are facilitating. In fact, you do not have to use any of the activities presented here.

## Pairing Constraints
- **Strong-Style Pairing**: The person at the keyboard (Driver) types the code. The person who is not at the keyboard (Navigator) makes all code design decisions.  The Navigator instructs the Driver to implement their intent with the highest level of abstraction that the Driver can fluently work with. Driver and Navigator switch on a fixed boundary  (eg: 2-5 minute timer, or completing code to make test pass)
- **Ping-Pong**: One pair partner writes the test (Test-First code!), the other implements the code to make the test pass.  With this pattern, with one partner may write all the tests, or the partners may take turns.
- **Mute Ping-Pong**: Similar as Ping-Pong, but one partner will only be writing tests, and the other will be only writing the code to make the test pass.  The pair may not to discuss or communicate about the problem in any way other than through the code (no comments, etc.: Follow the intent!)
- **Ball-Board**: One partner controls the mouse, but may not type any code.  Other partner controls the keyboard, but is not allowed to use any cursor navigation or hot-key shortcuts.
- **Mobbing**: Group of three or more people, with Driver and Navigator roles rotating.  Partners who are not Driver or Navigator suggest problem strategies and answer questions from Navigator. 

## Test-Driven Development Constraints 
- **Lazy Coder** (Use with Ping-Pong): The Driver actively tries to use the least amount of code to make a test pass.  This helps guide test construction strategies and build minimal code. 
- **Evil Coder (aka "Adversarial Coder","Find the Loophole")** (Use with Ping-Pong): The Driver is antagonistic: They will implement the code that makes the test pass, but may introduce as much complexity into the code as they wish or choose an obscure implementation strategy. This helps guide expressive test intent. (Evil Coder combined with Mute Ping-Pong is a very advanced activity, but can be extremely fun for experienced coders.)
- **TDD As If You Meant It** [(blog post)](https://cumulative-hypotheses.org/2011/08/30/tdd-as-if-you-meant-it/): All code must **_only_** be written in the test.  The **_only_** way to create production code is through refactoring (via Extract Method/Class/Field/Variable, etc).  This creates very tight, minimal production code.
- **Test-and-Commit-or-Revert (TCR)** [(blog post)](https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864) : (Requires source control) The key requirement in this constraint is that the tests must always be passing.  Whenever the pair runs the tests, the code will automatically revert if the tests fail!  The pair may write any amount of code or create tests that have simplifications that allow them to pass (though those shortcuts should be short-lived).  This differs from the typical "Red-Green-Refactor" TDD cycle, but it creates a similar incentive to create smaller, more easily testable (and modifiable) increments of code.  
- **Baby Steps** [(blog post)](http://blog.adrianbolboaca.ro/2013/03/taking-baby-steps/) (Requires source control): Similar to TCR, the goal is to keep the tests passing (green), but each pair has an interval timer set for 5 minutes (or whatever interval the group/pair agrees on). During that time, they write a test and the code to make it pass. If the test code is green when the timer expires, they commit the code. If the tests do not pass, then they must revert the code to the last green state (effectively deleting the last 5 minutes worth of work!)  Pairs may also choose to use the interval for refactoring, but the same rule applies: Failure to refactor to green in time requires a revert.  This creates an incentive for smaller, more incremental changes to code.
- **Steeplechase**: Like Test-and-Commit-or-Revert, but the timer interval gets progressively _shorter_ throughout the session. (eg. start at 5 minutes, but shrinks to 2 minutes by the end of the session.)  **This constraint can be extremely challenging, and is recommended for pairs who have basic TDD habits already in place.**

## Development Tool Constraints
- **No Mouse**: Not allowed to touch the mouse (might need to use it at first to discover the right keystroke shortcuts)
- **Text editor only**: Do not use an integrated environment, only a pain text editor and command-line compiler.  This helps expose how much a developer really knows about their language syntax, and can highlight how IDE features accelerate development (syntax highlighting, auto-completion, refactoring, etc)
- **No computer**: Developers write and simulate all code without a computer.  Very useful for understanding the problem domain (Game of Life) and exploring design strategies or language fluency.  Other tools other than paper, such as physical counters or other items might help the group simulate their code.

## Programming Language Constraints
- **No Primitives**: All methods (other than constructors) must take classes as arguments.  Bare integers, strings, etc are not permitted.  Advanced: Try to avoid any primitives as return values (This makes predicate test methods more challenging!)   
- **No conditional statements**: No if/switch/while/loop statements permitted.  Coders may explore decision-control though polymorphism, lookup structures (control arrays, hash tables), list comprehension, etc). Weakening of this constraint (allowing loops, for instance) is the discretion of the facilitator.
- **"Tell, Don’t Ask"**: A style of [Imperative Programming](https://en.wikipedia.org/wiki/Imperative_programming), no method may return a value (i.e. every method must be void): This can be very challenging as many coders have not been exposed to language syntax for delegates, callback methods, or pass-by-reference modification.
- **Immutable Code**: A style of [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming), oOnce a memory location ("variable") value has been set, it may not be modified.  All methods are effectively stateless.  (There may need to one or two exceptions in the main body of the program for some languages, but encourage the pairs to avoid them when possible.) 

## Software Design Legibility Constraints
- **Short methods**: Limit the number of statements permitted for a function.  For terse languages (Python, etc), this can be a little as 3 lines.  For more verbose languages (C++, Java), five are permitted.
- **One Level of Indentation**: As the title says, each method cannot contain statements that require more than one level of indentation (conditional statements, loops, etc)  This avoids the "sawtooth" effect [or "Anti-Arrow"](http://wiki.c2.com/?ArrowAntiPattern) in code, which increases the difficulty of reading, and indicates that the method may contain too much complexity.
- **Literate Programming**: Write you code read as if it were proper sentences. ("Let the code be read as if it was a small story.")
- **Code Swap**: Instead of deleting code, the pairs swap code with another pair for the next iteration! This activity might be challenging, depending on how comfortable the group is with multiple programming languages.

## Software Problem Domain Constraints
- **Build Different Feature**:  If pair has written code top-down, have them try bottom-up.  If they worked on rules previously, have them try building the grid or time-stepping, etc.
- **Mid-iteration Requirements Change**: After 25-30 minutes, pause the group, and add an additional requirement that may work contrary to the code they may have already built.  Examples:
   - Zombies:  Once a cell dies and then comes back alive, it returns as a zombie and can never be killed again.
   - Live cells are colored:  When born, takes on the color of the majority of its neighbors. (Three-way ties are a neutral color.)
   - Hexagonal grid instead of squares: (6 neighbors, switch rules to B2/S34 instead of B3/S23)
   - 3D space instead of 2D grid: (26 neighbors, switch rules to B4/S4 instead of B3/S23) 
     [BS notation](https://conwaylife.com/wiki/Rulestring)
   

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

<a href="https://drive.google.com/drive/folders/0B3idvASFqaEbN2RkNDYyYjktYTlkZi00ZjFiLWFmMDEtNjJhYTBkYzM2ZDlh?usp=sharing">Look at this exhaustive collection of constraints by Adrian Bolboaca</a>
