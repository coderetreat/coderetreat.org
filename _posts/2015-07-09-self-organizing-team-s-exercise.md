---
layout: post
author: curiousagilist
authorname: Bob Allen
title: Self Organizing Team(s) Exercise
preview: 'The following are instructions handed out to participants at a recent workshop I ran. The stated goals of the exercise are to create a micro-service based calculator, a patently *absurd* goal. The real purpose of the exercise is the allow the attendees to learn for themselves how to self organize, providing only as much guidance as proves necessary.'
---



The following are instructions handed out to participants at a recent workshop I ran. The *stated* goals of the exercise are to create a micro-service based calculator, a patently *absurd* goal. The real purpose of the exercise is the allow the attendees to learn for themselves how to self organize, providing only as much guidance as proves necessary. The results are described below the handout.


&lt;begin handout&gt;

> Welcome to ICC, Incremental Calculator Corp. Today you are going to build the first ever micro-service based massively scalable calculator.
> 
> 
> **Features** - in value rank order:
> 
> - Add two positive integers in the range 0 to 10^6 and show the result (rudimentary addition function)
> - Add two opposite signed integer numbers and show the result (rudimentary subtraction function)
> - Add two fractional numbers and show the result (full addition and subtraction function, range 10 to minus 6th, to 10 to the 6th)
> - Multiply one number by another and show the result
> - Divide one number by another and show the result
> - Bonus: Provide the ability to perform all of the above operations when entering and displaying hexadecimal numbers
> 
> **Constraints** – ICC’s CEO recently subscribed to a trade journal and has been reading up on all the latest trends. As a result, he has mandated the following constraints
> 
> - The calculator will be built using the latest Web based client-server architecture.
> - The calculator must have separated display and data entry means (i.e. the ability to enter numbers and operators must reside on a different computer than the computer that manages the display). 
> - Entering a number or operator must inform the display of what’s been entered via a RESTful interface and the display must confirm the receipt of anything it is asked to display
> 
> 
> **Definition-of-done** for each feature after the first sprint must include unit tests and Behavior Driven Development tests running green. The tests must assert expected behavior for both success conditions as well as failure handling.
> 
> *Bonuses* are offered for each of the following:
> 
> - The first working demo
> - The second working dem
> - The most demos that are accepted
> - The most complete implementation
> 
> 
> 
> The “rules” are described as follows:
> 
> - We will work together for 45 minute sprints, and then do an open retro (everyone together).
> - Beyond that, *there are no rules*.  Vote with your feet. If you feel you are neither contributing nor getting value, then by all means find another team (table) to work with.


What I intentionally did *not* do was give specific direction on *how* the teams should be organized, formed, or anything else that self-organizing teams should figure out for themselves. I was richly rewarded by the results.


The *"Bonuses"* were a deliberate attempt to lure the teams into competition vs. collaboration.


## Results from 4/11/15 workshop:
###   Sprint #1: By the end of the sprint (45 minutes) the attendees


- had figured out that they *need not* compete, but would benefit from collaborating and dividing their effort along different types of work; e.g. server-side vs. client-side. 
- they had a working github repo, 
- had agreed on an architecture, and
- realized they needed to stand up a server, and were working on it.


In sprint one's retro it was brought out that a lot of time was spent getting everyone to the same place in terms of MVP. For instance a lot of time was wasted trying to work out session management to accommodate multiple clients. YAGNI.


What they ultimately *did not do* (yet) was show any working code. The reason offered was that the other parts they were reliant on were not ready yet. It was pointed out that each team mocking the part they were dependent on from another team would have allowed some/all to show demonstrable progress.


**Quotable moment:** One participant observed that in a single 45 minute period they have accomplished what large companies are often unable to do after a months time.

### Sprint #2: By the end of the sprint the attendees …

- Showed a working server.
- Two teams had a working testing framework and at least one working test.
- They had started merging work into the repo.



Some struggling with github and git was observed. Made it clear participants must reach out when they are stuck. We talked about time-boxing a problem to prevent it’s becoming a sinkhole.


Advised teams that they needed to be planning for integration by actually talking across teams. All communication after they split up into teams had been entirely intra-team. Lunch was used as an opportunity to bridge the gaps between teams.


## Lunch 

### Sprint #3:  Breakthrough 

Some exchange of APIs and subsequent learning and adjustments. Also demo-able code (a single operator button and two input fields) worked locally but did not have a working network connection feature yet.


Also saw some learning about the mechanics of sharing a repo among teams, e.g. jars that were unfit on any system other than where they were created.


Pull requests were offered as one method for managing the repo, along with much more inter-team communication in general. Agreeing on conventions/policies for what constituted acceptable packaging for a pull-request was discussed.


Notable learning: Using a virtual card wall (Trello) was attempted, to manage the work and to report bugs. What *actually happened* when a “bug” was reported (verbally): the participants instead walked over and talked to one another and quickly *eliminated* the problem. No problem remained to track. This resulted in a retro discussion about the priority of “bugs”.


### Sprint #4: Big jump in demo-able code 
All four operators worked locally, on the client; only one operation was wired up to invoke the server connection. The communication succeeded at a network layer but apparently not at the application layer. An unexpected reply was received.


All four operations passed local BDD function tests on the server. Problems with round pegs and square holes persisted in the exchange of code. More getting up and moving to another table to talk other teams, was reiterated as not only allowable but highly desired.


### Sprint #5: 
Getting closer, and cross team communication is now common. Network communication is working a now the server code returns http response codes as well as messages to indicate results or complain about what’s wrong.


### Sprint #6: 
It’s 5:10 (we started at 8am) and *I can’t get these people to leave*; they really want to show results (which was *never* the objective). I’m feeling very good about how the day went. The participants seem to share that feeling.


## Permissions:
If you feel any of the above has value for your training/workshops, **please** feel free to copy all or any part. I would ask only hat you give attribution and reference this post.


Thank you, Bob Allen
