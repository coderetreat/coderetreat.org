---
layout: guide
title: About Coderetreat
audience: participants
toc: true
description: |
  Coderetreat is a pattern for deliberate practice of software development. We create a safe-to-fail environment free from the pressures of software delivery. Participants learn through working with each other, developing their habits for Test-Driven Development, XP practices, new languages, communication skills, and mentoring.
---

## What is a Coderetreat?
Coderetreat is a full-day event for practicing software development.  Away from the pressures of 'getting things done', developers focus on and develop specific aspects of **_how_** they build code to explore good software development techniques.  Developers work _together_ to build code and share their experiences.  Coderetreat uses a software [problem](#what-is-game-of-life) with just enough complexity to create rich learning without overburdening the developers. By repeatedly building an implementation, adding additional challenges, and changing work partners frequently, Coderetreat is a framework for continuous learning how to build software **better**. 

The pattern has been adopted worldwide, such that anyone joining a Coderetreat can have expectations about how the day will progress.

## Why attend a Coderetreat?
Software developers employ a broad ranges of skills to build products. Many of these techniques require rigorous practice in order to achieve proficiency.  Unfortunately, building products does not provide sufficient learning experience by itself, due to the incentives and risks implicit in the constraints of business.  Developers need dedicated practice opportunities to acquire and new skills and hone their habits. 

## Learning Goals
* Have fun!
* Use dedicated practice to explore new techniques  
* Write better code, using Test-Driven Development, pairing, and other software technical practices
* Take risks and experiment

## Format
A day of Coderetreat consists of 5-6 sessions, with breaks and lunch provided in between.  Each session's learning builds upon previous sessions. Early sessions give the chance for new attendees to become comfortable with the problem domain, pairing habits, and basic Test-Driven Development cycle. Later session constraints challenge pairs to stretch their skills and understanding of abstractions, modular design, and test-driven development.
  
Participants work in pairs the entire day, and the group reforms regularly to discuss the principles of software design.

### Coding Sessions
* Participants begin each session implementing Conway's Game of Life for 45 minutes. 
* After each iteration:
  * Each pair [deletes their code](#deleting-code).
  * The group holds a short retrospective (~15 minutes)
  * A short bio-break (stretching, restrooms, snack, etc)   
  * Pairs switch partners. If possible, everyone should pair with a different partner for every iteration.

### <a name="what-is-game-of-life">The Game Of Life</a>
{% comment %}This headline is a link to the "What Is This" link on /index.html, so please keep the name as it is here {% endcomment %}

Coderetreat uses [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) as the software problem for its sessions.  Game of Life is a zero-player cellular automaton game created in 1970 by John Conway _(1937-2020)_ to explore the domain of computational complexity and building richer, emergent structures upon simple rules.  

The rules of Game of Life are so simple they can be described in a few minutes.  A simple implementation can be created in about an hour.  However, completion ("getting done") is not the goal, and focusing on new habits or foreign constraints may slow code development to a crawl.  Also, the problem space has enough complications that one may implement a solution with a variety of design strategies dozens of times without creating largely similar code.

Using this common software problem makes Coderetreat a universal experience: Anyone can join an event anywhere in the world and have a reasonable expectation that they will understand the program. Repeatedly using the same program allows the problem domain to reside in the background, so that programmers may focus on their methods for creating code.

> I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times. -Bruce Lee

### <a name="deleting-code">Deleting Code</a>
The requirement to delete code after each iteration might seem counterintuitive and surprises many participants.  After all, the code they produce is often their measure for progress on the job!  Starting the code anew each session provides an opportunity for the pair to apply learning from previous sessions:
* They are confined by the design decisions of the previous pair
* They may choose to adopt a different design strategy
* The previous code may not conform to the current session constraint  
* They may choose a different programming language

Also, since the programming pairs change each round, keeping code from the previous round would introduce an aspect of legacy behavior to the session, which would require effort to learn and adapt the existing code (In fact, this is a valid session constraint that could be applied so that the developers may focus on habits around code maintainability.)

### Constraints
When building the solution to a particular problem over and over, a developer tends to converge on a single style, based on their existing skills and habits.  Later Coderetreat sessions add constraints on either the design structure, coding or communication patterns, or the language elements used in order to expand those boundaries and introduce new concepts.  This can be as simple as changing the amount of code developer may write (can you make all functions only three statements long?), or as broad as extending the problem domain to show tradeoffs in design strategy (can you make your two-dimensional code work in 3D?)
 
> At chess club, one member exasperatedly declared: "I don't see the point in the knights!  What use are they?"  The master said, "Fine, lets play without them."

### Retrospectives
The end of every session includes developers joining together to exchange their experiences, which might reflect insights on their pairing, the effect of the constraints on their coding, or other behaviors they observed.  These reflections may help the group identify the next constraint to try, or point out habits that they need to practice more in the future. 

## Software Technical Practices
Coderetreat emphasizes software coding habits that improve developer's focus on:
* understanding of the problem solved by the software
* conveying intent of code
* receiving fast feedback about the state of the software
* structuring code for ease of maintenance and extendability
* continuous improvement

Many of the technical practices for building software better are encapsulated in [Extreme Programming](https://en.wikipedia.org/wiki/Extreme_programming), initially described by Kent Beck and Ward Cunningham as mutually-reinforcing practices that software development teams can use to  

### Pair Programming
One for the universal constraints for Coderetreat is that no attendee works alone.  In doing so, attendees collaborate on their design and share learning.  This requirement increases developer's communication skills, and helps prevent individuals from getting "stuck" on any particular problem. While pairs of two are the default, some sessions form larger groups, often because of an odd number of attendees or a desire for greater shared learning.  

### Test-Driven Development
The other universal constraint for Coderetreat is the use of [Test-Driven Development (**TDD**)](https://martinfowler.com/bliki/TestDrivenDevelopment.html).  While pairing and communication  may both be learned "on-the-job" fairly easily, TDD is both a skill and a set of habits, so many newcomers to programming or to Coderetreat may not have been exposed to the technique yet.  Learning TDD is where the benefit of Coderetreat being a paired, focused practice really becomes apparent: Developers can focus on this new method much easier than if they were trying this on production code under delivery pressure.  

Test-Driven Development fundamentally flips the order of how many older developers have learned to code.  However, many new coding schools and companies have adopted TDD as a standard practice, which increases the likelihood that coders have been exposed to it prior to attending.  Some Coderetreats may provide a brief overview or tutorial to help bring newcomers up to speed. 

## Closing Circle
At the end of the Coderetreat, it's typical to wrap up the day with a final retrospective to reflect on the day as a whole (rather than the last session).   
The questions that are often used:

1. What, if anything, did you learn today?
2. What, if anything, surprised you today?
3. What, if anything, will you do differently in the future?

## Participant Prework
The most common challenge with Coderetreat is arriving without working programming tools.  To that end, each participant should bring:  
* laptop (and power supply!)
* favorite set of development tools
* favorite test framework(s) installed

Since the group will work in groups of at least two, it is not necessary that _everyone_ have a working set of tools, but if everyone tries, it's likely that each pair can have a working programming environment.  

## Other Forms of Practice
Coderetreat is one of a variety of dedicated practice patterns:
* A Code Dojo can have a shorter length (as little as an hour), and may feature a variety of different programming problems.  Their focus can be problem-solving techniques, software patterns, language features, as well as the software development habits.

* Legacy Coderetreat is a form of Coderetreat that starts with a functionally complete but entangled codebase (such as the [Gilded Rose Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata) or [Trivia Kata](https://github.com/adi-bolb/trivia)), and provides opportunities to explore ways to safely restructure legacy code toward a more maintainable and extensible form.   

* [Mobretreat](https://mobretreat.org) is an all-day event where developer form groups of 3 or more (as opposed to pairs), and the session constraints focus on behaviors on communication, interaction, and group coherence.  Unlike Coderetreat, the group retains their code across iterations.

<hr>
