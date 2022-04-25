---
layout: guide
toc: true
comments: true
audience: facilitators
title: Facilitation Guide
description: This guide outlines what the structure of a Coderetreat day should look like, as well as tips for effective facilitation. 
---

# Overview 

A Coderetreat has an established, time-tested format that is optimized for focused practice.

* **Total Duration**: 8.30am to 5pm
* **Length of every session**: 45 minutes followed by a 15 minute retrospective and break
* **Pair-Programming** or **Team-Programming**
* **Test-Driven-Development**
* **Pairs should be swapped** after each session
* **Code should be deleted** after each session

# The Day

The Coderetreat day consists of 5-6 sessions, each session's learnings building upon previous sessions. 

The morning focuses on becoming comfortable with the problem domain, breaking old habits and beginning focused self-discovery. The afternoon pushes the envelope by challenging pairs to stretch their skills and understanding of abstractions, modular design and test-driven development. With most groups, the focus should be on the fundamentals of software development and modular design, primarily the [4 rules of simple design](http://wiki.c2.com/?XpSimplicityRules). Spend the day practicing these concepts, rather than pushing into new learnings.

<div class="advice" markdown="1">
If this is your first Coderetreat, check out Alastair walking you through his structure of the day and the constraints he's using in [his online training on YouTube](https://www.youtube.com/watch?v=GvC-jlxWo1c&feature=emb_title)
</div>

# Welcome, introductions, explanation of the problem

**A good framing is important to setup a space for learning and exploration**. Remember, if attendees arrive on a Saturday, a lot of them have five days of a day-job in software development behind them, along with all the stress of commercial software development. Your task as a facilitator is to get everyone into a learning mindset, away from the obligations of developing software to order.

**Writers and musicians are always practicing**. As software developers we don’t very often practice. Coderetreat is our chance to practice outside of work constraints. We need to practice because at work we are often on deadlines so we must cut corners. 

## The introduction

Before you introduce the workshop, it is important to go through a couple of organizational things to make sure everyone is comfortable. Some people like surprises, some people really don't. Be on the safe side and spill the beans, it's better to be more verbose than to leave people in the unknown.

* **Welcome everyone** - This is important!: Participants have volunteered their entire day, and this is a key opportunity to affirm their choice.
* **Group Introduction** - Let everyone have a chance to speak early, which helps communication in the group throughout the day. Keep it brief!
* **Introduce everyone who's organizing today's event** - make sure they wear name tags with a marker, so they can be easily found.
* **Give a shout-out to the host** - ask them to briefly explain the location (bathrooms, smokers place, getting in and out, their phone number, etc.)
* **Sponsorship** - If you have a sponsor, let to advertise their company. Keep it brief, so the group stays active and involved!
* **Read out the important bits of your Code of Conduct** - a short version if you have it, who to contact in case of a violation, and consequences of violating it.
* **Lay out the schedule of the day** - When are the breaks, when do you wrap things up? People are accustomed to very structured workshops and presentations. This is not one of these, people in their sessions are free to take a break between them in their pair, and they're free to skip a session if they don't feel like it.

<div class="advice" markdown="1">
If this is your first Coderetreat facilitation, it is perfectly fine to advertise it as such. You're organizing it because you'd like to contribute to a community, not because of your vast expertise in the field. You can call on your participants to help you make the day worth it, e.g. by appealing to their self-organization skills. 

A workshop with a lot of people can be messy and exhausting. Establish rituals like the **hand-rule** (if you see me raise your hand, finish your sentence and raise your hand too) to quickly gather attention quickly and quiet down the room.
</div>
<div class="remote" markdown="1">
Remote facilitation can be very challenging. Make sure to have a companion document (e.g. a MURAL/Miro Board, or a Google Docs) where you keep everything written down. Attention spans can be difficult to manage remotely, so having written rules help people keep up at their pace.
</div>

## Introducing the workshop

* **Establish agency**: The workshop is mostly autodidactic, so it's important to manage expectations here. It is up to the people themselves to make the best out of it. You're just here to provide guidance and set up the space.
* **Establish learning goals**: Mention that the goal of the day is to practice our craft
  * Practicing Test-Driven-Development
  * Exploring new languages and paradigms
  * Mentoring other developers
* **Discuss the idea of “Reducing the Cost of Change”** in our code
* **Discuss the [Four Rules of Simple Design](http://c2.com/cgi/wiki?XpSimplicityRules)**:
  * Passes all Tests
  * Expresses Intent (Clear, Expressive, & Consistent)
  * No Duplication
  * Minimal methods, classes, & modules (no superfluous abstractions)
* **Introduce the Coderetreat format**:
  * Make sure participants know they shouldn’t try to finish the problem and why that is important
  * Let participants know that at the end of the session you will ask everyone to delete their code and stand up. This allows them to experiment and practice in a way they can’t at work.
* **Introduce [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conways_Game_of_Life)**
  * Use **posters** or **videos** as found on our [Game Of Life resources page]({% link facilitators/gameoflife.md %})
  * Make sure people can ask broad questions right away
* **Encourage everyone to have the courage to experiment** and to try new approaches to solving the problem or techniques for writing code.


### Gauging prior experience

Depending on your audience, it might be helpful to introduce Test-Driven-Development and the rules around Pair-Programming. If you feel comfortable with facilitating such an exercise, it can be helpful to ask people to line themselves up in order of personally perceived experience (without questioning it!).

<div class="advice" markdown="1">
The "experience scale" can also make for a nice matching for the first coding session! Ask everyone to sort themselves by experience in Test-Driven-Development and then match those with little experience with those with most experience.

Be careful to only do this once and only if the room is safe. A corporate environment might not make for a good place for people to *expose their ignorance*.
</div>

# Schedule of the day

Publishing the rough schedule in advance will help your attendees tremendously, but that doesn't mean that you need to follow it to the last bit. There are times where a session can be too difficult for the attendees, so extending it for another session might help with achieving learning goals. Make sure to account for enough breaks though, even if you decide to continue a session.

## Sessions

Don’t announce the time left in every session and don’t let them worry about the time (if they ask, feel free to be non-specific). Remember, a Coderetreat is away from the pressures of 'getting things done'.

For the first few Coderetreats, you can use the ideas below to guide attendees as a facilitator. Over time, based on experience observing pairs through the sessions, you will learn to stretch beyond these suggestions.

### Session 1

The first session should be very simple. This is an opportunity for people to make sure they have their environments setup for TDD.

Allow pairs to get a feel for the problem domain. Not everyone has seen Conway's Game of Life before, so this session will allow them to wrap their head around the task. After the first session, it can sometimes be useful to discuss the idea of deleting the code. Some people might have a bit of resistance to the idea. Gently explain that those are the rules.

It’s ok if they spend a significant portion of session 1 getting the tools setup. Despite you asking people to set their laptops up in advance, there will be technical hurdles that will make the first session a prep-session for the following sessions – and that's ok!

### Session Retrospective

After each session, you **need** to hold a retrospective. The purpose is for people to exchange their insights, but also for them to get to know each other a bit.

* Remember: **You are facilitating a discussion**, not lecturing a group.
* **Ask questions rather than telling**. Let the group discover things on their own.
* **Try to get everyone involved**. Ask people who haven't contributed much what they think (or some other specific question).
* After the first session it might be good to ask about deleting their code: Who found it difficult to delete their code? Why was it difficult?

<div class="advice" markdown="1">
 Make sure to be decisive about the timeframe of the retrospective, but also make sure that it isn't dominated by a few vocal people. The latter is more important than the former.
</div>

### Session 2

Discuss appropriate data structures around the problem. Is an array the right way to hold the cells? Introduce the idea of primitive obsession.

It is very common to implement Game of life as a two dimensional array. You might want to jar them out of that. A good activity for this is “verbs” instead of nouns. This is usually good for session two. Every class name and variable name needs to be a verb: ```CreatesCellGeneration```, ```AppliesRuleNumberOne```.

People tend to want to focus on how to represent the system. But have them start with the rules and how to implement them.

### Session 3

Suggest that teams begin to stretch themselves. Discuss polymorphism as a better solution than boolean flags. Further reinforce the avoidance of primitive obsession. Push heavy exploration of abstractions.

## Lunch

Lunch should be long. Participants should have the opportunity to socialize and discuss the morning. A lunch break is an explicit disruption of flow, so expect a slow start after it. **Two hours** will allow for a comfortable lunchtime plus socialising afterwards.

### Session 4, 5, 6

Explain to teams that the afternoon is about going past any self-imposed limits. Below are some constraints that can be introduced, chosen based on the experience of the individual pairs.

* No if statements
* No loops
* Small Methods (<5 lines, 1-line?)
* No language primitives
* TDD As If You Meant It

## The Closing Circle

It is important to get together at the end of the day and reflect. The standard way is to have a closing circle where everyone answers 3 questions. 

Depending on the size of the group, you'll want to emphasize brevity. With 20-30 people, it can potentially take a while.

### The Three Questions

Prior to the closing circle, tell them the following three questions and then give them a break to think about these three questions. 

Then in the closing circle ask each participant to answer each of the questions:

* What, if anything, did you learn today?
* What, if anything, surprised you today?
* What, if anything, will you do differently in the future?

If the group is large, you might not want to ask/answer all three questions to keep it short.

This is also a good opportunity to solicit feedback about how to improve the next event, though you might want to do it via sticky notes or a white board, as some feedback might be specific, private, or redundant.

# Facilitation advice

* Enforce the "keep it short" rule as best you can
* Don't take notes if that will make people uncomfortable
* It's okay to ask for facilitation feedback afterwards, but don't ask for it during the circle
* Go first (to show people how it's done)

## Keep it simple, but experiment

Even though the basic Coderetreat format should not be drastically altered, we do want people to experiment and to try out new ideas. As such, we create an environment where anyone can propose and implement a good idea. 

An experiment is a welcome distraction, as is a deep-dive as long as a pair isn't derailing completely.

## Whatever Language You Want!

The ideas presented and practiced in Coderetreat are applicable to any object-oriented language. To this end, it is suggested that Coderetreats are explicitly multi-lingual. 

While Coderetreat is not a day to learn a new language, it is perfectly acceptable for someone to work in a language they are not familiar with. The facilitator should stress that at least one member of the pair should have a working environment. 

After all, 45 minutes goes by quickly, and it is a waste to spend the majority of the time getting a development environment raised up.

## Handling difficult participants

* Watch out for people who are very dominant and ask them to pull back a little bit. (Ping pong helps with that)
* If someone does not delete the code or do as told, ask a second time and then ignore this person. We are not the police ;-)
* It is more important to create a healthy learning environment than to follow all the rules to the letter.
* If someone's behaviour is impacting the experience of others, sternly reassert the goal of the day and don't feel shy to ask them to leave.

# Frequently Asked Questions

### Are we really going to work on the same program all day long? 

Yes, because the learning goal we're focusing on isn't the program itself. Throughout the day, we focus on the habits of **how** we build the code.  We found Game Of Life to be **just challenging enough** to make it a worthwhile exercise, but also **unambiguous** enough so the usual misunderstandings between requirement and implementation don't inhibit learning.

The constraints we add challenge our default assumptions and reflexes when it comes to coding. By leaving our comfort zone, we're able to critically examine how we've built code in the past.

Because there is always something new to learn, be it from your pairing partner, coding in a new language, or because one of the [constraints]({% link facilitators/constraints.md %}) challenges your habits, it doesn't get old.

### How much time is left before the iteration is over? 

"A couple of minutes" (Informing them exactly how much time is left works against the goal of "doing things right", so try to avoid a specific number.)

### What do I do if I don't know the answer to a question?

As a facilitator, your role is to promote discussion, and you're not expected to have all the answers. Let the group explore the topic: "That's a great question. What do you think?"

### What do I do if we have an odd number of people?

You can allow three people to program together rather than two. Having a trio works fine. Everyone should be working with someone else, to get feedback and cross-learning from their peers.

# Further Reading

- Alex Bolboaca has been organizing and facilitating an ongoing series of coderetreats in Romania. He wrote a great post on [organizing coderetreats](https://alexbolboaca.ro/coderetreat/how-to-organize-a-code-retreat).
