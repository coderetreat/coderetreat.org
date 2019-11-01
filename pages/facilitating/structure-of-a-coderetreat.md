---
layout: default
title: Structure of a Coderetreat
description: The structure of a coderetreat day should look like, as well as tips for effective facilitation
image:
    src: /images/facilitating/coderetreat.png
---

This page outlines what the structure of a coderetreat day should look like, as well as tips for effective facilitation. 

Coderetreat has an established, time-tested format that is optimized for focused practice.

* Problem: [Conway's Game of Life](/pages/facilitating/gol/)
* Duration: 8.30am to 5 or 6pm
* Length of every session: 45 minutes followed by a 15 minute retrospective and break
* Pair-programming is necessary, as the knowledge transfer contained in that activity is essential to the practice
* Prefer using Test-Driven Development (TDD)
* After each session, pairs should be swapped
* After each session, code must be deleted, not put in a branch, not stashed, just deleted with no trace left

## The Day

The coderetreat day consists of 5-6 sessions, each session's learnings building upon previous sessions. 

The morning focuses on becoming comfortable with the problem domain, breaking old habits and beginning focused self-discovery. The afternoon pushes the envelope by challenging pairs to stretch their skills and understanding of abstractions, modular design and test-driven development. With most groups, the focus should be on the fundamentals of software development and modular design, primarily the [4 rules of simple design](http://wiki.c2.com/?XpSimplicityRules). Spend the day practicing these concepts, rather than pushing into new learnings.

Below is a rough outline for the day as a proposal:

<table class="data-table">
{% for entry in site.data.schedule %}
<tr>
  <td>{{ entry.time }}</td>
  <td>{{ entry.description }}</td>
</tr>
{% endfor %}
</table>

## Welcome, introductions, explanation of the problem

Writers and musicians are always practicing. As software developers we don’t very often practice. Coderetreat is our chance to practice outside of work constraints. We need to practice because at work we are often on deadlines so we must cut corners. 

* Introduce Coderetreat (just like it is introduced above)
* Mention that the goal of the day is to practice our craft
* Discuss the idea of “Reducing the Cost of Change” in our code
* Discuss the [four rules of simple design](http://c2.com/cgi/wiki?XpSimplicityRules):
  * Passes all Tests
  * Expresses Intent (Clear, Expressive, & Consistent)
  * No Duplication
  * Minimal methods, classes, & modules (no superfluous abstractions)
* Introduce the coderetreat format:
  * Make sure participants know they shouldn’t try to finish the problem and why that is important
  * Discuss that you will stop participants and they need to just stop
  * Let participants know that at the end of the session you will ask everyone to delete their code and stand up. By forcing people to delete their code it allows them to write code and not worry about finishing.  This allows them to experiment and practice in a way they can’t at work.
* Introduce [Conway’s Game of Life](/pages/facilitating/gol/)
* Encourage everyone to have the courage to experiment and to try new approaches to solving the problem or techniques for writing code.
* Ask everyone to introduce themselves, what language they prefer and are setup to use, and what language they would like to get experience with at coderetreat. You can write the names and languages on a whiteboard to know who to pair with.

Optional things you can discuss:

* The TDD Cycle Red/Green/Refactor and writing the least amount of code to get it to pass
* Characteristics and qualities of “Good” Code (What does good code look like?)

You can use your own style of facilitation, leave the participants alone, ask a lot of questions or try to teach them. If in doubt do less of facilitation. Take notes throughout the day:

* Something that was interesting
* Something that worked well
* Something that didn't work so well (mistakes)

## Lunch

Lunch should be long. Participants should have the opportunity to socialize and discuss the morning.

## Sessions

Don’t announce the time left in every session and don’t let them worry about the time (if they ask be non-specific). Remember, a coderetreat is away from the pressures of 'getting things done'.

For the first few coderetreats, you can use the ideas below to guide attendees as a facilitator. Over time, based on experience observing pairs through the sessions, you will learn to stretch beyond these suggestions.

### Session 1

The first session should be very simple. This is an opportunity for people to make sure they have their environments setup for TDD.

Allow pairs to get a feel for the problem domain. Not everyone has seen Conway's Game of Life before, so this session will allow them to wrap their head around the task. After the first session, it can sometimes be useful to discuss the idea of deleting the code. Some people might have a bit of resistance to the idea. Gently explain that those are the rules.

It’s ok if they spend a significant portion of session 1 getting the tools setup:

* Help them if you know the environment.
* Grab someone else in the room to help them.
* They could write their own testing framework: only requires an AssertTrue method, throws exceptions if fails, or prints failed or passed to the console.

### Session 2

Discuss appropriate data structures around the problem. Is an array the right way to hold the cells? Introduce the idea of primitive obsession.

It is very common to implement Game of life as a two dimensional array. You might want to jar them out of that. A good activity for this is “verbs” instead of nouns. This is usually good for session two. Every class name and variable name needs to be a verb: ```CreatesCellGeneration```, ```AppliesRuleNumberOne```.

People tend to want to focus on how to represent the system. But have them start with the rules and how to implement them.

### Session 3

Suggest that teams begin to stretch themselves. Discuss polymorphism as a better solution than boolean flags. Further reinforce the avoidance of primitive obsession. Push heavy exploration of abstractions.

### Session 4, 5, 6

Explain to teams that the afternoon is about going past any self-imposed limits. Below are some constraints that can be introduced, chosen based on the experience of the individual pairs.

* No if statements
* No loops
* Small Methods (<5 lines, 1-line?)
* No language primitives
* TDD As If You Meant It

## Iteration Retrospectives

* Remember: you are facilitating a discussion, not lecturing a group.
* Ask questions rather than telling. Let the group discover things on their own.
* Try to get everyone involved. Ask people who haven't contributed much what they think (or some other specific question).
* After the first session it might be good to ask about deleting their code: Who found it difficult to delete their code? Why was it difficult?

## The Closing Circle

It is important to get together at the end of the day and reflect. The standard way if to have a closing circle where everyone answers 3 questions. 

Depending on the size of the group, you'll want to emphasize brevity. With 20-30 people, it can potentially take a while.

### The Three Questions

Prior to the closing circle, tell them the following three questions and then give them a break to think about these three questions. 

Then in the closing circle ask each participant to answer each of the questions:

* What, if anything, did you learn today?
* What, if anything, surprised you today?
* What, if anything, will you do differently in the future?

### Some tips

* Enforce the "keep it short" rule as best you can
* Don't take notes if that will make people uncomfortable
* It's okay to ask for facilitation feedback afterwards, but don't ask for it during the circle
* Go first (to show people how it's done)

## Whatever Language You Want!

The ideas presented and practiced in coderetreat are applicable to any object-oriented language. To this end, it is suggested that coderetreats are explicitly multi-lingual. 

While coderetreat is not a day to learn a new language, it is perfectly acceptable for someone to work in a language they are not familiar with. The facilitator should stress that at least one member of the pair should have a working environment. 

After all, 45 minutes goes by quickly, and it is a waste to spend the majority of the time getting a development environment raised up.

## Handling Difficult Participants

* Watch out for people who are very dominant and ask them to pull back a little bit. (Ping pong helps with that)
* If someone does not delete the code or do as told, ask a second time and then ignore this person. We are not the police ;-)
* It is more important to create a healthy learning environment than to follow all the rules to the letter.

## FAQ

### Common questions participants ask and how to respond

* Are we really going to work on the same problem all day long? 
    * Yes. Conway's Game of life works very well for that sort of thing. 
    * It doesn't get old. There is always something new to learn

* How much time is left before the iteration is over? 
    * A couple of minutes (never be specific, never tell them exactly how much time is left)

### Common first-time facilitator questions

* What do I do if I have a participant who is disruptive in some way (rude, inexperienced, etc)?
    * Don't let it bother you too much. The format of the event prevents a single person from sabotaging the entire day (except for really small groups).
    * If someone complains, remind them that they don't have the pair with that person again. So it was only one iteration that was "bad".

* What do I do if I don't know the answer to a question?
    * Throw it back to the group: "That's a great question. Does anyone want to try to answer it?"

* What do I do if we have an odd number of people?
    * You can allow three people to program together rather than two. Having a group of three works fine.
    * Don’t let anyone work alone. Everyone should be working with someone else.

