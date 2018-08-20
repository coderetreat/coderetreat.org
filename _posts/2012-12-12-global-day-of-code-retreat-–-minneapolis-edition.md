---
layout: post
author: Kyle Boon
authorname: Kyle Boon
title: Global Day of Code Retreat – Minneapolis Edition
preview: Original post at http://kyleboon.wordpress.com/2012/12/12/global-day-of-code-retreat...
---
Original post at: [http://kyleboon.wordpress.com/2012/12/12/global-day-of-code-retreat...](http://kyleboon.wordpress.com/2012/12/12/global-day-of-code-retreat-minneapolis-edition/)

On Saturday I hosted and facilitated Global Day of Code Retreat – Minneapolis. My employer [BloomHealth](http://www.gobloomhealth.com/) sponsored the event at our office in downtown Minneapolis. We had 16 people come in on a Saturday in the snow during the Holidays for a day of deliberate practice at the craft of software development.  Worldwide there was over 150 cities in 22 timezones and 3,000 people participating.

What is it Code Retreat?
========================

The easiest answer is to direct you to [www.coderetreat.org](http://coderetreat.org/) and let you read it there, but I’ll try to explain it in short form. [Maxim Gladwell](http://en.wikipedia.org/wiki/Malcolm_Gladwell) says it takes 10,000 hours of practice to become an expert in any field. This happens in sports all the time. College football players spend 20 hours a week practicing with the team plus uncounted hours watching film, lifting weights and practicing as individual. They spend 60 minutes 14 times a year actually playing a real game of football. An individual player probably spends less than half of that time on the field. They’re still amateurs with a lot to learn when they get to the NFL. Coderetreat is about advocating the idea of deliberate practice to the craft of software development. What is the equivalent of a cone drill or 40 yard dash for a software engineer? Just like those drills help build muscle memory for football players, software developers need muscle memory when the pressure of deadlines comes during the workday.

Our Drills
==========

Everyone doing a code retreat practices on the common problem of building [Conway’s Game of Life.](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) I won’t go into it in depth but Conway’s game of Life is a simple set of rules that yields very complex results. Having a common problem lets  people all over the world speak about the experience with a common vocabulary.

The day is then broken down into 45 minute sessions. Each session has a different constraint applied that forces the participants to think about the problem in a different light. Our sessions were:

*   No Constraints. Most participants have not had experience with Conway’s game of life so the first session is just to get used to the problem statement. With 15 minutes left in the session I added a ‘last minute requirement’ to force the participants to see how difficult it was to change their design.
*   Quality Code: No method may have more than 4 lines of code. No Conditional Branching (if, switch, ternary conditional operator). No passing of primitives across a method boundary.
*   Silent Ping Pong Pairing: This session is about the red-green-refactor cycle of TDD. One member of each pair writes a test, then the other member writes the code that makes that test pass. Then the roles switch. The catch is that the pairs cannot speak to each other. This forces all communication to be done in the code itself. Comments are cheating!
*   Timed TDD: Tests should be small enough that its clear what to implement. In this session each pair uses a 2 minute timer. The pair must write a failing test AND make the test pass during that 2 minutes. If the pair doesn’t have a passing test after two minutes, they must delete all the changes! If they do have a passing test, they have 2 minutes to refactor.
*   Last Session: Once again we remove the constraints and let people apply what they’ve learned for the day.

[![Silent Ping Pong Pairing](http://kyleboon.files.wordpress.com/2012/12/2012-12-08-11-45-22.jpg?w=300&h=225)](http://kyleboon.wordpress.com/2012/12/12/global-day-of-code-retreat-minneapolis-edition/2012-12-08-11-45-22/)

Silent Ping Pong Pairing

After each session we had a 15 minute discussion and short break. The discussion is probably the most important part of the day. That’s when everyone can decompress and share the experience with the other participants.

Reactions
=========

I learned a lot about coordinating an event for 20 people and hopefully put my name out in the Minneapolis community more than it was before. BloomHealth got some exposure to a new group of developers and was able to show off our awesome office.

There was a lot of positive feedback from everyone who participated. They used a mix of languages including ruby, java, groovy, javascript, c# and lua. Everyone got to learn new things, from a new language to a more immersive TDD experience than they might be used to. The consensus was that the 2-minute time restraint was the single most difficult constraint.

All in all, I think everyone had a good time and learned a few things. Hopefully people will take the idea of deliberate practice back to their normal lives. I’d like to continue this idea in my day job and run events like this a few times a year.