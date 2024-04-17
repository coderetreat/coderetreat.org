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


# `git diff "onsite" "virtual"`

A virtual coderetreat is not anything like an on-site one. A lot of care needs to be put into things taken for granted at an on-site event, such as creating a space for random conversations, or giving people an "out" without creating an interruption while still prompting other people to contribute who just need that one final nudge.

## Everything is slower, everything takes more energy

First and foremost, you might find that the prospect of sitting in front of your computer for eight hours on a Saturday (while presumably doing so for the past five workdays already) isn't the most appealing place to start with. A coderetreat warrants for consecutive time spent on the same problem, but it might be feasible to consider to **limit your event for about four hours**, with considerable time accounted for the start, a break and some social time after the event.

<div class="advice" markdown="1">
Not everything about a coderetreat needs to happen synchronously! You can help people settling in and getting to know each other by inviting them to the chat channel (e.g. Discord/Slack) for the event a few days before the event.

</div>

## Cater to the attention span

It is important to have some means of persisting information that will be required throughout the event. Consider using a **Google Spreadsheet**, an **Etherpad** or a **Miro**/**Mural**-board to provide attendees with information such as the zoom links, the timeline and the time for breaks etc.

During any format you might run, make sure to have the constraint written down for people to refer to. **Everything important you say should also be written down somewhere for people to refer to.**

For any retrospective you run, make sure people collect their input in text-form and merely use the audio to carry home their points. **Miro** or **Mural** have excellent templates for you to start with.

<div class="advice" markdown="1">
As with every facilitation, less might be more after all. A very flexible collaboration tool (e.g. Miro, a blank canvas) might allow for more positive group dynamics than a highly constrainted one (such as e.g. Trello, a kanban-esque organization tool).
</div>

## The upside: A truly global coderetreat

For once, you might get the chance to host a truly global coderetreat. Our [Events Page]({% link events/index.html %}) encourages people to find an event that works for their time and language, not necessarily one that is in close proximitry of them.

As such, your event could have someone from another part of the world join and contribute to your local community! Consider adopting a common language (such as English) for your event and make sure to promote your event on social media and in the communities!

# Hear it from the experts

Here are some blog posts from people who have hosted virtual coderetreats before:

- [TES Remote Coderetreat](https://engineering.tes.com/post/remote-code-retreat/) - A guide on running a remote coderetreat by the engineers at TES
- [Invision Remote Coderetreat](https://medium.com/@philborlin/retrospective-on-a-remote-global-day-of-coderetreat-ace1baf20bae) - A guide on running a remote coderetreat by Philip Borlin of InVision
- [Remote Coderetreat 2019](https://github.com/remote-code-retreat/code-retreat-2019) - A Spanish guide on running a remote coderetreat

If you have any experience, please share it with us by [submitting a Pull Request](https://github.com/coderetreat/coderetreat.org) for this page

# Tools

## Video conferencing

- [meet.jit.si](https://meet.jit.si/) is a free, open-standards-based video conferencing solution that allows for a large number of people to be in the same call. It lacks good moderation tools.
- [zoom](https://zoom.us) is a paid for video conferencing solution that offers break-out rooms and can be moderated.
- [Discord](https://discord.com/) is a tool similar to Slack that allows realtime and asynchronous communication through video/voice channels and chats.

## Collaborative Code Editors

- [VisualStudio Code](https://code.visualstudio.com/), together with [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare), offers easy collaborative editing, sharing a terminal and even tunneling ports so results can be previewed in realtime. It is our recommendation out of any more sophisticated collaborative IDEs.

## Brainstorming tools

A shared document can be helpful for persistent information, e.g. video conferencing rooms, schedules or even retrospectives. Share it with your participants upfront!

- [Google Docs](https://docs.google.com/) offers real-time editing
- [Dropbox Paper](https://paper.dropbox.com/) offers similar real-time editing
- [MURAL.co](https://mural.co) is an (almost) infinite canvas that can be used for coordination, brainstorming, retrospectives and collaboration
- [Miro](https://miro.com/) (formerly RealtimeBoard) has similar capabilities as MURAL.
- [Etherpads](https://etherpad.org/) are an opensource alternative for collaborative editing.



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
