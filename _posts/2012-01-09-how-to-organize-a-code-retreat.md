---
layout: post
author: alexboly
authorname: Alexandru Bolboaca
title: How to Organize A Code Retreat
preview: This article was initially published here on 14 August 2010. It refers to the code retreats organized in Romania between June 2009-August 2010, tipically co-facilitated by Maria Diaconu and me.
---
_This article was initially published [here](http://www.alexbolboaca.ro/wordpress/articles/how-to-organize-a-code-retreat) on 14 August 2010. It refers to the code retreats organized in Romania between June 2009-August 2010, tipically co-facilitated by Maria Diaconu and me._

Here are some of the things we’ve learned about running a code retreat. We’ve facilitated about 10 code retreats, including one with Corey Haines.The smallest one was with two (yes, two) people and the largest with about 20. Here are some of the things we learned.


**Don’t try to convince people**

Many developers who took part in code retreats tried to talk to their colleagues or friends and many times their answer was one of “it’s a buzzword”, “it’s not during work hours”, “it’s plain silly” etc. They were disappointed, but it’s ok. One of the core ideas about a code retreat is that the people that come choose to come. It’s on a Saturday, it starts in the morning, it takes all day long, you need to write code and it’s tiring. People coming there really want to come.

> Lesson #1: Code retreats are for a self-selecting group

However, we talk about code retreats whenever we get the chance. We explain what it is, how it’s done, why it’s interesting. Then if someone invites us to facilitate one, we happily do it. If not, that’s ok. Not all people like code retreats; this doesn’t mean they’re worse professionals or that they don’t want to learn, it just means that code retreats might not bring them the value they need.

**Not all people who register come, develop or stay the whole day**

The worst thing that happened with a code retreat was when we had 14 registered participants and only one of them came, after we traveled for a long time to get there. It was annoying, but at least we learned something.

> Lesson #2: If you want to organize a code retreat in another city, partner with someone local

Local partners will help you find a proper location, promote the event and ensure that everything goes smoothly.

Some of the people register but don’t write code, just come to see what it’s about. That’s ok, but it’s better to know it beforehand. Usually, we knew who will develop because we know the community.

> Lesson #3: Know your community. If you don’t, ask participants if they want to develop and stay all day

In order to compensate for these things, we always pair-facilitated and one of us is ready to pair with a participant, if they are in an odd number.

> Lesson #4: Pair facilitate. It’s easier and it allows you to pair with odd number participants.

**Make sure people delete the code**

Developers don’t like to delete their code. Yet, that’s an essential part of a code retreat.

> Lesson #5: Always insist that developers delete the code after each session

Even so, some of them won’t. That’s fine, you’re not in a police line of work, you’re just facilitating. Explain that deleting code is important and useful. If they don’t delete the code, they will find it themselves – since they swap pairs, they will rarely get the occasion to reuse it. We bet most of them don’t look at it after the code retreat. So, either ways, you’ve done your job if you insisted enough.


**Try to make participants define what they want to practice before each session**

During the first code retreats we facilitated, we had to explain that each pair needs to choose something to practice, and we gave some examples: writing methods of max 8/6/4 lines of code, using no ifs, using no cycles, name everything precisely etc. After a while, most people were practicing TDD, and sometimes participants think that code retreats are about TDD. That’s wrong.

> Lesson #6: Explain to participants that they choose what to practice

The best example we have is when a pair had a very bad time working together during one session and they decided to stick together for the next session and practice communication. We thought that was awesome.

On another occasion, someone showed up for the code retreat and kept bragging all through the day and at the end he said that he learned nothing on that day. Our answer was that he lost his time, because he chose what to do with that day.

There are always things to practice and to improve. For example, suggest participants to avoid using the mouse at all for a session, see where that takes them. Code retreats are for participants about what they choose to do; the facilitators are just ensuring that there’s a good environment for that.


**Walk around the room during sessions**

Part of the facilitator’s job is to gather information that he or she can use to create meaningful discussions during the retrospective. Look around you and see what you notice.

> Lesson #7: Watch out for pairing, code and communication smells

Usually, one of the following happen:

*   A pair switches after more than 10-15 minutes
*   The variable, methods, classes names are not clear enough
*   Developers don’t use abstractions – the usual one is that they use arrays to represent the board in Conway’s Game of Life (hint: if you changed the board to be in 3D, or hexagons, or pentagons, what would happen to the code?)
*   The pair starts the session by drawing a diagram and then don’t have time to write code
*   The code doesn’t work at the end of the session
*   … and probably some more.

If you’re a beginner in facilitating code retreats, you will learn those in time. We noticed some of them ourselves and learned others from Corey. Facilitation is an art in itself, and it also requires practice.


**Do a retrospective after each session**

We’ve seen two kinds of retrospectives: one in which everybody talks about what happened during the session and what they learned and the other one in which the facilitator talks about the things he saw. We prefer the first one, while Corey seemed to prefer the second, but he may have changed since we paired with him.

> Lesson #8: The session retrospective helps realizing the lessons learned during the session

No matter how you do it, it’s very important because it makes people think about what they did and learn from that session as much as possible – as long as they’re open to it.

**Don’t compete with lunch**

We never even tried to do that, but it’s important enough to mention. Development takes energy, and you just can’t do it without eating well.

> Lesson #9: Have a nice, relaxed, rich lunch when people get hungry

So, even if you’re behind schedule (it happens), don’t compete with lunch. You’re there to ensure that participants have everything they need to practice. Lunch is probably one of the most important things they need.


**Don’t give indications, just throw remarks**

The natural tendency of any developer trying to facilitate a code retreat is to sit down and program with a pair when they don’t do what they should.

> Lesson #10: People are there to practice for themselves

Don’t do that. Tell them what you think it’s wrong and let them be. After all, they decide what they practice. You can pair with each of them on the next sessions if they ask you to.


**End with a retrospective**

The ending is important.

> Lesson #11: We usually end by asking three questions to each participant:

*   How did you feel?
*   What have you learned?
*   What will you apply starting Monday?

This makes people commit to themselves to something. After this, it’s their choice.


**The success of a code retreat is in quality, not in numbers**

> Lesson #12: The indicator of a successful code retreat is when at least one person tells you that programming is fun again

It doesn’t matter how many people they are, what they learned during the day or if they will come back. If at least one person thinks programming is fun again, that’s excellent. Learning only starts at code retreats, everyone should keep practicing afterwards.


**Always make a retrospective of your facilitation**

At the end of each code retreat, we discuss about what was good and what we could do better.

> Lesson 13: Facilitators need to learn too

This allowed us to improve and refine over time. This is much better when there are two facilitators, because you have who to discuss your performance with and decide what to change.

> Lesson 14: The result of the retrospective can be a refinement or an experiment

We tried different things in the code retreats we facilitated. We used the poker hands problem for a couple of them, ended one with a dojo, started another one with a dojo and so on. Some of the experiments were a success, some of them allowed us to refine our ways. You cannot learn if you don’t experiment, so as long as you change only one thing and you make sure it doesn’t affect the whole event, you’re fine.

We however advise you to organize the first few code retreats by the book. It’s better to know the drill before trying to improve it.

**In the end**

After you organize a code retreat, celebrate.

> Lesson 15: Feel good about yourself. You’ve done something great.

If at least one person learned something during the event, you should congratulate yourself. And people always learn something. That’s your moment; enjoy it.

We hope this helps anyone who wants to organize a code retreat.