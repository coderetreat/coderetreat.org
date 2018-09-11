---
layout: post
author: Gonçalo Silva
authorname: Gonçalo Silva
title: (one of) London's GDCR 2012
preview: cross-posted from here
---
cross-posted from [here](http://www.gnorsilva.com/2013/01/global-day-of-code-retreat.html)

Global day of code retreat took place worldwide in [154 locations](https://maps.google.com/maps/ms?msid=211858429594081017615.0004c84674c62aa900e06&msa=0) on Saturday 8th December. Over 36 hours, from New Zealand to Hawaii, almost 2000 developers came together to practice their craft.

Me and [Tom Brand](https://twitter.com/tom_b025) facilitated one in London through the [London Software Craftsmanship Community](http://www.meetup.com/london-software-craftsmanship/events/88021082/). We were hosted by [Biomedcentral](http://www.biomedcentral.com/), and Tom's company [Lyagushka](http://lyagushka.co.uk/) kindly sponsored the catering.



What is a code retreat? 
---------------------------


From [coderetreat.org](http://coderetreat.org/):

"Coderetreat is a day-long, intensive practice event, focusing on the fundamentals of software development and design.


By providing developers the opportunity to take part in focused practice, away from the pressures of 'getting things done', the coderetreat format has proven itself to be a highly effective means of skill improvement. 


Practising the basic principles of modular and object-oriented design, developers can improve their ability to write code that minimizes the cost of change over time."



How does it actually work?
-----------------------------


Developers come together to implement [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) over 6 sessions of 45 minutes using any programming language they are comfortable with.

Some sessions have challenging constraints, and at the end of each session the group gathers for a small retrospective.

There are rules though:

*   TDD or any other form of test first development is used

*   Code written must be "simple":
*   Passes all the tests.
*   Maximises clarity with well expressed intent.
*   Minimises duplication
*   Has no superﬂuous parts.

*   Pair programming (or 3 if there's an odd number) pairing with someone new every session

*   At the end of each session **code is deleted**


Deleting code might seem unnecessary or harsh but its important as the main point of this day is to practice and learn, not to finish. Its not a competition and developers should aim at creating the best code they can within the set constraint, and have fun!


How did it go?
-----------------


Though we had over 20 people subscribed to attend only 9 showed up, but this actually worked out well as we could focus more on each pair.

We started at 9 am with a quick intro about the LSCC, what a code retreat is all about, format of the day, and an explanation of Conway's Game of Life. We then jumped straight to the first session.


### Session 1 - no constraints


The goal of this session was to get familiar with the problem, last tweaks to the development environment and make sure everyone had a chance to "wake up".


[![](http://3.bp.blogspot.com/-qEhLQg7F3No/UMy5Nh8dpLI/AAAAAAAABU8/JZHVSGC2Tv4/s320/2012-12-08+09.29.00.jpg)](http://3.bp.blogspot.com/-qEhLQg7F3No/UMy5Nh8dpLI/AAAAAAAABU8/JZHVSGC2Tv4/s1600/2012-12-08+09.29.00.jpg)

Starting the day



### Session 2 - Baby steps


This session forces us to take very small steps when writing code by using source control to commit early and often. It goes like this:

1.  Set a timer for 2 minutes
2.  Write exactly one test 
*   If the timer rings and the test is red then revert and start over. 
*   If the test is green before timer rings then commit 
3.  Restart timer 
4.  Refactor 
*   If the timer rings and the refactoring is not complete then revert. 
*   If the refactoring is complete before the timer rings then commit
5.  Go back to step 1



[![](http://4.bp.blogspot.com/-HhuGWDtVCDI/UMy5UdBjDhI/AAAAAAAABVM/XzX4Jqq4uus/s320/2012-12-08+12.14.52.jpg)](http://4.bp.blogspot.com/-HhuGWDtVCDI/UMy5UdBjDhI/AAAAAAAABVM/XzX4Jqq4uus/s1600/2012-12-08+12.14.52.jpg)

[Mark](https://twitter.com/mark4asp), [Andrea](https://twitter.com/dreab8) and [Marco](https://twitter.com/marcoVermeulen) discussing  


What initially seemed impossible turned out to be doable. After a few sessions pairs fell into a rhythm and got used to the 2 minute cycle, committing often and making sure that the next test or any refactoring could be done in the timebox. Every now and then they stopped for a few timeboxes to discuss and then carried on.

This session was a bit of a surprise for a few and they could see its benefit straight away, but there were also concerns that with such small steps the big picture could be lost.

A few readily agreed they would try this at work, but with longer timeboxes.


### Session 3 - TDD as if you meant it


This session was created as an "... _exercise that folks could do, in safe controlled conditions, whereby they could experience the odd and surprising (and delightful) things that can happen when you really do TDD, as Beck describes it, with the hope that the experience would carry over to their daily work as programmers._"


The main goal is to leave design decisions to be taken as late as possible. The rules are:

1.  Write exactly one new test. It should be the smallest test which seems to point in the direction of a solution
2.  Run the test to make sure it fails
3.  Make the test pass by writing the least amount of implementation code you can **IN THE TEST METHOD**.
4.  Refactor to remove duplication or otherwise as required to improve the design. Be strict about the refactorings. Only introduce new abstractions (methods, classes, etc) when they will help to improve the design of the code. Specifically:
*    \- ONLY Extract a new method if there is sufficient code duplication in the test methods. When extracting a method, initially extract it to the test class (don't create a new class yet).
*   \- ONLY create a new class when a clear grouping of methods emerges and when the test class starts to feel crowded or too large.
5.  Go back to step 1



[![](http://1.bp.blogspot.com/-Xlw_WFR1-sI/UMy5chNl4UI/AAAAAAAABVc/Ekya1ebNQFc/s320/2012-12-08+12.15.24.jpg)](http://1.bp.blogspot.com/-Xlw_WFR1-sI/UMy5chNl4UI/AAAAAAAABVc/Ekya1ebNQFc/s1600/2012-12-08+12.15.24.jpg)

TDDing as if they meant it


A different approach to a familiar practice, it took a bit of effort to resist the urge of creating classes and extracting code prematurely.

Some felt slowed down and not as productive but could see a different design emerging rather than the classic Cell or World objects created straight from the beginning, but not many were sure they would use this in their jobs.


### Lunch


After session 3 we broke for lunch, during which we watched a video from JetBrains since they were this years global sponsor, as well as a pre prepared slide deck with other sponsors and a few videos of Conway's Game of Life evolutions ([this](http://www.youtube.com/watch?v=xP5-iIeKXE8) is my favourite).


### Session 4 - Mute pairs


The main aim of this session is about communicating intent through your code with no talking done by either developer. Its pretty simple:

1.  Developer A writes a failing test.
2.  B makes it pass, refactors if needed, then writes a new failing test.
3.  A makes it pass, refactors if needed, then starts again.

[![](http://2.bp.blogspot.com/-S_4O5Fx4NhM/UMy3kV5lILI/AAAAAAAABU0/WuYHadZZWeQ/s320/2012-12-08+13.44.52.jpg)](http://2.bp.blogspot.com/-S_4O5Fx4NhM/UMy3kV5lILI/AAAAAAAABU0/WuYHadZZWeQ/s1600/2012-12-08+13.44.52.jpg)

Tom makes sure no one utters a peep


Considered by almost everyone to be the hardest, most tiring and frustrating session of the day (its never easy after lunch), it shows that constraints can also be about removing things we take for granted, such as discussions with our pair. I think it drills home how much of a social activity development actually is.


All pairs mentioned picking up a failing test produced by their partner and rewriting it or ignoring it, as it would have been to big of a step or in the wrong direction. Even though everyone felt comfortable with the domain at this point, this session turned out to have the slowest progress with the constant to and fro.

[![](http://1.bp.blogspot.com/-BxaWBce5BrY/UMy5kfe5NpI/AAAAAAAABVs/wLKxRgj5W0w/s320/2012-12-08+12.19.21.jpg)](http://1.bp.blogspot.com/-BxaWBce5BrY/UMy5kfe5NpI/AAAAAAAABVs/wLKxRgj5W0w/s1600/2012-12-08+12.19.21.jpg)

After 45 minutes of silence it felt good to speak again at the retrospective

### Session 5 - Object calisthenics


This one is about drilling in good OO design practices:

*   One level of indentation per method.
*   Don’t use ELSE keyword.
*   Wrap all primitives.
*   First class collections.
*   One dot per line.
*   Don’t abbreviate.
*   Keep classes small
*   No classes with more than two instance variables
*   No getters/setters.


This is always a tough one, specially not using getters and setters ( "How are we going to assert?" ), but overall the pairs performed pretty well, leading to what I think was one of the most productive sessions of the day.


Not using getters doesn't mean you can't have methods return values, just that these shouldn't be class variables - i.e. some behaviour should happen inside that method. Ideally "Tell, don't ask" and a mocking framework should be used.

As [Marco](https://twitter.com/marcoVermeulen) pointed out, "calisthenics" is simply good OO practices and something we should be using on a daily basis - maybe "Don’t use ELSE keyword." and "No classes with more than two instance variables" are debatable.


[![](http://3.bp.blogspot.com/-gs6F8Ky4I6o/UMy5Zfjn73I/AAAAAAAABVU/52-nRI1d1Q8/s320/2012-12-08+12.15.08.jpg)](http://3.bp.blogspot.com/-gs6F8Ky4I6o/UMy5Zfjn73I/AAAAAAAABVU/52-nRI1d1Q8/s1600/2012-12-08+12.15.08.jpg)

Ashish and Alejandro pairing using vim



### Session 6 - Choose your own constraint(s)


For the last session of the day we went easy on the group and let each pair decide which constraints to use (if any). Some selected baby steps, others TDD as you meant it, or using a different language.


[![](http://1.bp.blogspot.com/-y-l--E-4FkU/UMy50oshJGI/AAAAAAAABWM/VKmT5lRm1qI/s320/2012-12-08+16.25.25.jpg)](http://1.bp.blogspot.com/-y-l--E-4FkU/UMy50oshJGI/AAAAAAAABWM/VKmT5lRm1qI/s1600/2012-12-08+16.25.25.jpg)

[Andrea](https://twitter.com/dreab8) and Michał



### Closing circle


To finish off the day we gathered round after the last session for the final retrospective and asked everyone to name three things:

1.  What did they learn
2.  What surprised them
3.  What they'll take home


Answers varied from: more confidence in TDD, being more energized / motivated, seeing how many different approaches there are to solve a problem, taking some of these ideas and applying them at work.




What about the other 153 code retreats?
------------------------------------------


Since this was a global event with lots of code retreats happening simultaneously, Google hangouts were used to connect retreats from different locations and time zones:


[![](http://1.bp.blogspot.com/-bxGsbwvgLCk/UMy0BMrsd5I/AAAAAAAABUk/y1xsuEIdfVQ/s320/2012-12-08+13.45.11.jpg)](http://1.bp.blogspot.com/-bxGsbwvgLCk/UMy0BMrsd5I/AAAAAAAABUk/y1xsuEIdfVQ/s1600/2012-12-08+13.45.11.jpg)

Hanging out!


We "hung out" all throughout the day ( keeping it muted while in a session ) with other retreats in London, South Africa, Germany, Belgium, Romania, Hungary, and possibly a few more than came and went while we weren't looking!

Also, a web app - live.coderetreat.org - was used by facilitators to update their schedule status throughout the day. It was good to see live updates of all other retreats worldwide in real time.



Summing up
-------------


This was the first code retreat I facilitated and I had a blast!

It was really fun, energizing and a great learning experience for all who attended, but also for me - being on the "other side" gave me a different perspective and helped to gain new insights and solidify my knowledge.

Looking forward to hosting another one in the future...