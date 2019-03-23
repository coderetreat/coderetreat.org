---
layout: default
title: Structure of a Coderetreat
---

This page outlines what the structure of a coderetreat day should look like, as well as tips for effective facilitation. 

Coderetreat has an established, time-tested format that is optimized for focused practice.

    Problem: Conway's Game of Life
    Length of Session: 45 minutes
    Duration: 8.30am to 5 or 6pm
    Pair-programming is necessary, as the knowledge transfer contained in that activity is essential to the practice
    Prefer using Test-Driven Development (TDD)
    After each session, pairs should be swapped
    After each session, code must be deleted, not put in a branch, not stashed, just deleted with no trace left

## The Day

The coderetreat day consists of 5-6 sessions, each session's learnings building upon previous sessions. The morning focuses on becoming comfortable with the problem domain, breaking old habits and beginning focused self-discovery. The afternoon pushes the envelope by challenging pairs to stretch their skills and understanding of abstractions, modular design and test-driven development.

With most groups, the focus should be on the fundamentals of software development and modular design, primarily the 4 rules of simple design. Spend the day practicing these concepts, rather than pushing into new learnings.

Below is a rough outline for the day.

    8 - 8.45am : arrival, coffee/breakfast
    8.45 - 9am : welcome, introductions, explanation of the problem
    9 - 9.45am : Session #1
    9.45 - 10am : retrospective, break
    10 - 10.45am : Session #2
    10.45 - 11am : retrospective, break
    11 - 11.45am : Session #3
    11.45 - 12pm : retrospective, break
    12 - 1.30pm : lunch, socializing
    1.30 - 2.15pm : Session #4
    2.15 - 2.30pm : retrospective, break
    2.30 - 3.15pm : Session #5
    3.15 - 3.30pm : retrospective, break
    3.30 - 4.15pm : Session #6
    4.15 - 4.30pm : retrospective, break
    4.30 - 5pm : Closing circle

## Suggestions for session topics

Over time, based on experience observing pairs through the sessions, a facilitator will learn to stretch beyond these suggestions. For the first few coderetreats, a facilitator can use the ideas below to guide them.

### Sessions 1

Allow pairs to get a feel for the problem domain. Not everyone has seen Conway's Game of Life before, so this session will allow them to wrap their head around the task. After the first session, it can sometimes be useful to discuss the idea of deleting the code. Some people might have a bit of resistance to the idea. Gently explain that those are the rules.

### Session 2

Discuss appropriate data structures around the problem. Is an array the right way to hold the cells? Introduce the idea of primitive obsession.

### Session 3

Suggest that teams begin to stretch themselves. Discuss polymorphism as a better solution than boolean flags. Further reinforce the avoidance of primitive obsession. Push heavy exploration of abstractions.
Lunch

Lunch should be long. Participants should have the opportunity to socialize and discuss the morning.

### Session 4, 5, 6

Explain to teams that the afternoon is about going past any self-imposed limits. Below are some constraints that can be introduced, chosen based on the experience of the individual pairs.

    No if statements
    No loops
    Small Methods (<5 lines, 1-line?)
    No language primitives
    TDD As If You Meant It

### The Closing Circle

It is important to get together at the end of the day and reflect. The standard way if to have a closing circle where everyone answers 3 questions. Depending on the size of the group, you'll want to emphasize brevity. With 20-30 people, it can potentially take a while.
The Three Questions

    What, if anything, did you learn today?
    What, if anything, surprised you today?
    What, if anything, will you do differently in the future?

## Whatever Language You Want!

The ideas presented and practiced in coderetreat are applicable to any object-oriented language. To this end, it is suggested that coderetreats are explicitly multi-lingual. While coderetreat is not a day to learn a new language, it is perfectly acceptable for someone to work in a language they are not familiar with. The facilitator should stress that at least one member of the pair should have a working environment. After all, 45 minutes goes by quickly, and it is a waste to spend the majority of the time getting a development environment raised up.

