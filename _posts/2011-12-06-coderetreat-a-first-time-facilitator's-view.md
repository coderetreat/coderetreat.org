---
layout: post
author: Andrew Cox
authorname: Andrew Cox
title: Coderetreat A first-time facilitator's view
preview: 
---
_Note: This was cross-posted from [Coderetreat: A first-time facilitator's view](http://andrewcox.org/post/13810557640/coderetreat-a-first-time-facilitators-view)_

On Saturday, I helped facilitate the [Global Day of Coderetreat 2011](http://coderetreat.org/) in Pittsburgh. Over 2000 people attended in 90 cities on 6 continents. There were more coderetreat events on this single day than in the combined 3-year history of coderetreats.

Coderetreat is a day-long, intensive practice event, focusing on the fundamentals of software development and design. [Much](http://coderetreat.org/about) [has](http://coderetreat.org/facilitating/structure-of-a-coderetreat) [been](http://coderetreat.org/profiles/blogs/global-day-of-coderetreat-an-account-from-london) [written](http://coderetreat.org/profiles/blogs/coderetreat-2011-in-prague) about the format and experience of coderetreats including [this excellent fictional account of a coderetreat attendee](http://monospacedmonologues.com/post/13794728271/global-day-of-coderetreat), so I’ll focus instead on my perspective of the event as a first-time facilitator.

### The goals of Coderetreat

In preparing for my role as a facilitator, I tried to dig deep into what the goals of the event were. The single, primary goal that I ended up with was:

> Learn how to write code that adheres to the [rules of Simple Design](http://theholyjava.wordpress.com/2011/02/14/clean-code-four-simple-design-rules/) in order to minimize the cost of change.

Now _that’s_ something both developers and managers can get behind. It reads like a [user story](http://www.mountaingoatsoftware.com/topics/user-stories) explaining not only the _what_, but also _why_ you would want to adhere to the rules of simple design.

In addition to the primary goal of writing code to minimize the cost of change, a coderetreat has a ton of secondary benefits including, but not limited to:

*   Improve problem solving skills
*   Try out different programming languages
*   Experience and improve [pair programming](http://en.wikipedia.org/wiki/Pair_programming) and [TDD](http://en.wikipedia.org/wiki/Test-driven_development)
*   Learn your tools
*   Pick up tips from others’ development workflows and environments
*   Socialize and network with local developers
*   Spread the [Software Craftsmanship](http://manifesto.softwarecraftsmanship.org/) bug
*   Expose people to new object-oriented design concepts

Is a coderetreat the absolute _best_ format for achieving this goal? That’s a topic for another post. But, I do believe you’d have a hard time finding a better way to level up your software development skills in under 10 hours.

### Takeaways

This event was awesome. I think I got as much or more out of it as a facilitator as I did as a participant. But how can we make it better?

**Set expectations before the event**. We need some sort of a “Before You Arrive” kit that gives a very brief overview of the event and tells you how to get the most out of the day. This should include everything from setting up your development environment to bringing enough business cards to share.

**Make sure you have plenty of whiteboard space**. During a coderetreat, there’s a lot to take in. I love having information radiators for active and passive learning. There are a number of things that I wanted to convey to the participants throughout the day, including:

*   Wi-Fi credentials
*   Twitter hashtag
*   The goal of Coderetreat
*   The 4 rules of Conway’s Game of Life
*   The 4 rules of Simple Design
*   The TDD cycle
*   List of buzzwords and concepts
*   Mark Twain quote, “I didn’t have time to write a short letter, so I wrote a long one instead.”

**Put more focus on goals at the beginning**. The primary goal should be written clearly on a whiteboard to remind everyone throughout the day why they chose to give up their Saturday to program. In addition to the primary goal, I think I could spend more time calling out secondary goals like getting better at pair programming and test-driven development, learning your tools, exposing new OO concepts, and spreading the software craftsmanship bug. If the participants leave with a firm idea of the goals of the event, it will help to spread the idea of coderetreats.

**Don’t push the challenges before the participants are ready**. Due to the big event, it was too tempting to pull out the whole bag of tricks for the sessions. I think it would’ve been best to give cues to focus on fundamentals for the first 3 rounds and only start to introduce more modest constraints like [ping pong pairing](http://c2.com/cgi/wiki?PairProgrammingPingPongPattern) and [TDD as if you meant it](http://gojko.net/2009/02/27/thought-provoking-tdd-exercise-at-the-software-craftsmanship-conference/) late in the day, if at all. If you’re working with developers who have all been to a coderetreat before, then you might be able to pull out things like “no conditional statements” or “use verbs instead of nouns”, but I think otherwise they put undue hardship on the teams. Learning pairing, TDD, simple design, and even new programming languages is more than enough for most people.

**Ask more probing questions during walk-arounds**. Much of being a great facilitator is having a strong understanding of OO concepts yourself. This allows you to ask the right questions to stretch a practitioner and guide them toward simple design. I still have quite a way to go on this front, but I think I would do well by reading up on some of the OO concepts and forming questions that I can ask ahead of time.

**Write down a list of buzzwords and concepts during the event**. If you’ve been to a number of conferences and are interested in Software Craftsmanship, you might take for granted how many buzzwords you regularly sling around. People don’t often want to expose their ignorance, so I think it would be really useful to make note of buzzwords and concepts that pop up in conversation throughout the day like, “DRY”, “YAGNI”, “tell, don’t ask”, “law of demeter, “loose coupling”, and “SOLID design principles”.

**Code swapping for the last session could be risky**. I’m a big fan of swapping code after the 5th session because it reinforces the primary goal of minimizing the cost of change. When new developers have to deal with an existing codebase, your efforts for clean code are truly put to the test.

There was a fair bit of good-natured ribbing about code quality after swapping code with another pair after the 5th session. If there is a wide gap in skill levels, or people don’t know each other very well, this has the potential to lead to hurt feelings. Use with caution.

**6 sessions may be too much for one day**. One comment that received a lot of nods at our closing circle was that they would have gone home totally satisfied after just 5 sessions. The 6th session left them a little fried and we only ended up with 8 people (out of about 50) for the traditional post-coderetreat beers. I had a similar experience when I participated in a coderetreat. On the one hand, that feeling of pushing your mind to the limit and leaving completely fried is kind of nice, but perhaps it comes at the expense of leaving people with more energy to challenge their development practices at work come Monday morning.

### The rabbit hole

Once you start thinking about writing software using the principles of Simple Design, it’s like opening Pandora’s Box. You become curious about some of those buzzwords I mentioned above like, “loose coupling”, “high cohesion”, and “single responsibility principle”. You realize you’re peering down a rabbit hole and start wondering just how deep the rabbit hole goes …