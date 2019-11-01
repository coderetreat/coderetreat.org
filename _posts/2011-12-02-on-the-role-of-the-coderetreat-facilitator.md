---
layout: post
author: coreyhaines
authorname: corey haines
title: On the role of the coderetreat facilitator
preview: Coderetreat is a dynamic day with the specifics molded to the individual participants. There is a strong emphasis on self-discovery. The intense pair-swapping allows ideas to rapidly disseminate through the group. The frequent session reflections help with more complete internalization of lessons. Starting over allows experimentation without the baggage of previous experiments. To ensure the objectives of the coderetreat are met and that the participants get the maximum value out of the event, it is essential to have a facilitator for the day of coderetreat. The facilitator's role is to guide the participants through the various paths of experimentation, putting appropriate pressure at each stage of the day.
image:
    src: /images/facilitating/guidance.jpg
---

Coderetreat is a dynamic day with the specifics molded to the individual participants. There is a strong emphasis on self-discovery. The intense pair-swapping allows ideas to rapidly disseminate through the group. The frequent session reflections help with more complete internalization of lessons. Starting over allows experimentation without the baggage of previous experiments. To ensure the objectives of the coderetreat are met and that the participants get the maximum value out of the event, it is essential to have a facilitator for the day of coderetreat. The facilitator's role is to guide the participants through the various paths of experimentation, putting appropriate pressure at each stage of the day.

The primary activity of a coderetreat facilitator is to act as a guide both during and between the coding sessions. She should be walking around, observing the approaches pairs are taking, suggesting alternate approaches, constraints, etc. The facilitator should also choose what activities and exercises are appropriate for each session based on the activity of the team.

The more experience a facilitator has, the more alternate methods, the more alternate approaches to the problem she has seen. It is important that the facilitator not code during the sessions and devote their time to facilitation. And facilitating does not include coding with the participants!

You should be visiting each pair and commenting, asking questions, helping them progress.  Having seen these approaches and where they lead, she can help guide others through the self-discovery process.

The first important role of the facilitator is to introduce the day. At a minimum, the introduction should contain five elements:

- a brief history/philosophy of coderetreat;
- the format of the day;
- the goals for the day;
- an explanation of Conway's Game of Life;
- and, the 4 rules of simple design.

You don't need to provide a great amount of detail around the rules of the game of life, as the first session provides the opportunity for people to dive more deeply into the problem domain. While each of my introductions is slightly different, some focusing more on specifics, some more on the overall goals of the day, the overall message stays consistent. You can get a sense of an introduction from this video that was recorded at the Cleveland coderetreat in January, 2011\. If video does not show up, [click here](http://vimeo.com/18955165).

<iframe src="https://player.vimeo.com/video/18955165" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[Cleveland Code Retreat Introduction](http://vimeo.com/18955165) from [Corey Haines](http://vimeo.com/coreyhaines) on [Vimeo](http://vimeo.com).

Lately, I have been emphasizing the message that the goal of modular/object-oriented/simple design boils down to minimizing the cost of change. For a business, it is essential to be able to change easily. Our systems should be designed to accept this and move as rapidly and cheaply as possible with the business. I like to contrast this with YAGNI, which is building features you don't need yet. If your system is easy to change, then you don't need to build those features yet. You can just add them easily when the time comes. I address how the 4 rules of simple design contribute to minimizing the cost of change: tests tell you if you broke something; no duplication allows you to make a change in one place for all pieces of knowledge in your system; good names allow you to easily understand the structure of your design and where you should make your change; small helps keep your head above water when looking through the system.

As the sessions progress, the facilitator's role is to select appropriate topics to focus on during each one. For example, the first session is generally used to gain familiarity with the problem domain. Understanding when to introduce different activities comes through experience, as you really start to gain a view into how people's approaches change over the course of the day. There is no 'one true progression' of exercises through the day, though; some facilitators like to introduce tdd as if you meant it before lunch. I like to introduce it, if at all, during the session immediately following lunch. Also, which exercises are introduced is a function of the makeup of the participants. If you have people who have never tested before, then you might not introduce tdd as if you meant it, prefering to bring in a different testing-oriented practice. If you have people who are very experienced with testing, you might introduce it sooner and really push hard on them to write the simplest code possible.

During the inter-session reflection, it is important to take the observations of the previous session and reflect them back to the participants. For example, there are a couple different starting points that almost everyone takes during the first session: cell or grid. Ask how many people did the cell, how many people did the grid.

For the cell people, ask how many people had some form of flag called 'alive'?  During the session, you'll have noticed a lot of people with this. I then talk a bit about using polymorphism to replace flags. Ask why you need the flag. Ask how you know you need it. Why do you need a cell class? Either after the first or second session, I like to introduce the idea of verb-focused design, rather than noun-focused. Whenever you are tempted to create a noun (class, property, etc), ask yourself why you need it. If your answer involves another noun, ask why you need that one. Eventually, you'll make it to the verb, the process that you are trying to automate. Start with the process, the verb, rather than the noun. I like to push this practice throughout the day.

For the grid people, ask how many people spent time looking in the documentation for how to make a 2-dimensional array. Ask people to think what that means considering the 'infinite grid' requirement. Ask how their implementation would change if the topology changes.

Another set of constraints is around clean code. I put a list of code-level constraints and ask them to keep these in mind and practice during the sessions. Here are some of my favorites: methods < 5 lines (perhaps < 3); minimize number of methods per class (< 3?); no naked language primitives; no built-in data structures. The objective here is to make the participants think about approaches they wouldn't have normally done on their own.

Finally, at the end of the day, the facilitator should guide the closing circle. This is an essential part of the day, as it bring everyone together to share what they've learned from the day. It is not a report back to the facilitator, but a sharing with the rest of the group. The group should stand in a circle and answer 3 questions:

- what, if anything, did you learn today;
- what, if anything, surprised you about today;
- and, what, if anything, are you going to do differently moving forward.

By sharing these answers, the group comes together and closes what was an intense day of working together to get better.

**What if I have never facilitated before?**

No time like the present. After all, there was a time when nobody had facilitated a coderetreat before. The most important part of facilitation is being observant. Your job is not to teach, but to guide. As you walk around during the sessions, you'll notice similarities between approaches. Highlight those during the retrospective.

The best first step in learning to facilitate is to attend a coderetreat as a participant. Watch the facilitator and take notes. Spend the day focused not just on coding, but also on understanding what the goals of the day are.

There are also a few very experienced facilitators out there. Contact one and ask if they have some time to answer questions: find out any concrete things they tend to focus on; do they have a preferred order for introducing constraints; any common things they say that people respond well to.

**What if I mess up?**

It would take a lot to mess it up. The more experienced you are, the more insights you can share with the participants. But, think about this: you are getting a bunch of programmers together, pairing and practicing, with a person whose sole purpose is to highlight new thoughts and exercises to try. Sounds like a pretty awesome day.

Note: Much thanks to [Prakash Murthy](http://twitter.com/#!/_prakash "Prakash Murthy on twitter") for proof-reading this post.
