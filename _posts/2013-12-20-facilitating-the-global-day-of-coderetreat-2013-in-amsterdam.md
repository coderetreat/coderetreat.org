---
layout: post
author: Stefan Hendriks
authorname: Stefan Hendriks
title: Facilitating the Global Day of Coderetreat 2013 in Amsterdam
preview: On the 14th of December 2013 - the Global Day of Coderetreat was held at Zilverline. I have experience with coderetreats and also organised one at the 7th of january in 2012, and the GDCR12.
---
On the 14th of December 2013 - the Global Day of Coderetreat was held at [Zilverline](http://www.zilverline.com/). [I have experience with coderetreats](http://stefanhendriks.wordpress.com/2012/01/12/first-coderetreat-of-2012-in-amsterdam-retrospective/) and also organised one at the [7th of january in 2012](http://coderetreat.org/events/coderetreat-amsterdam), and the [GDCR12](http://coderetreat.org/events/global-day-of-coderetreat-amsterdam).

This time I both hosted and facilitated this event. This means that besides practical stuff I also did the talking which I will explain further in this post. This was the first time I did this and I'd like to share how it was. If you want to get an impression of the day you can have a look at [this slideshow](http://coderetreat.org/photo/albums/gdcr13-amsterdam).

A big thanks to Bob Forma and Diana Sabanovic who helped me with the hosting aspects throughout. This enabled me to mostly focus on facilitating.

I was anxious, especially since last years GDCR was very well done. Back then I had a great experience and I was not sure if I could give the participants the same experience. Yet, I wanted to do this: _I just love sharing knowledge and give people something to learn or think about._

After attending the [GDCR Facilitator Training](https://plus.google.com/events/clala3tbagp3qjo2abcjh4q6ooc) by [Jim Hurne](http://coderetreat.org/profile/JimHurne), I had a clear image of how I wanted the participants to experience the Coderetreat: _People having fun, learning from each other and the constraints given._

Thats it.

Introduction
------------


The introduction is very important, it sets the stage for the day. So I started with the goal of the day: **to be creative, to experiment, to learn and to have fun.**

I explained that a Coderetreat consists of sessions**.** Today we have five of them. A session consists of roughly 45 minutes of coding  and 15 minutes of retrospective. Each session we will be coding the [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life).

After each session everybody has to delete their code.

### Liberate yourself!


Deleting your code liberates you from the feeling of having to finish the game. You'll quickly find out you will not finish the game within 45 minutes. Instead of your usual approach to get things done, you will allow yourself to take a moment and think of different strategies.

To encourage creativity, every session will be different. Everybody will form new pairs each round. I will apply different constraints. And on top of this people will be coding in different languages throughout the day.

So you potentially code in a different language, using a different constraint, in a different environment...

Every hour.

[![foto 1 (2)](http://stefanhendriks.files.wordpress.com/2013/12/foto-1-2.jpg?w=696)](http://stefanhendriks.files.wordpress.com/2013/12/foto-1-2.jpg)

### Good code


After we handled the structure of the day, we went on discussing 'good code'. It is easy to write new code. But, the reality is that we often need to change our code later to meet ever changing customer's needs. We developers have to cope with that change. We have to change our code. So what makes code easy to change? Then we talked briefly about the [4 rules of simple design](http://c2.com/cgi/wiki?XpSimplicityRules).

Once we had a little discussion and sense of 'good code' we focused on what we are building today: [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life). I showed the participants a [PDF of the 4 rules](https://github.com/stefanhendriks/game-of-life-rules/blob/master/gol_rules.pdf) on a 2D grid to make it easy to visualise. I also promised to show a video later, once we had done a session or two.

### The retrospectives


In the retrospective we talk about how the constraints influenced your approach. After that I asked all participants to write down their highlights (pros and cons) on stickies. The nice thing is that at the final stage we can look at the board and summarise what experiences we had (closing the circle).

[![No color coding, so pink could be either a pro or a con](http://stefanhendriks.files.wordpress.com/2013/12/foto-3-2.jpg?w=696)](http://stefanhendriks.files.wordpress.com/2013/12/foto-3-2.jpg)

The sessions
------------

### First session: no constraints


The first session was a 'free for all'. Figure out the problem domain. Only one pair got one rule implemented. Most people started with a grid, which made sense as _I showed them a grid_ in the introduction. Most people hated to throw away their code after 45 minutes.

### Second session: baby steps


In the second session I introduced the 'baby steps' constraint.

We start with a timer set on 7 minutes. Once you set the timer you have to write a test, alongside an implementation and the test has to pass. Once the test passes in time you may commit your code to your local git repo. If however the timer went off before you had a passing test, you had to revert back to the last commit.

For each commit or 'timer went off' you set the next timer and reduce with one minute. This goes on until a the minimum of two minutes, and then stays two minutes.

After the explanation, the group sort of got it. I needed to explain a bit further once we had started, and after a few timer cycles, everybody got it. Looking back though, it may have been better to simply use the two minutes time constraint throughout the whole session.

Due the time constraint everyone was forced to take very small increments in their code. If your step was too big you would not make it in time and you had to revert back your code. The effect is you have to take _very_ small steps, _baby_ steps. Hence the name of the session.

Surprisingly, more people actually got some rules implemented. When asked how they did this, they answered that they 'were forced to take the problem backwards'.

### Lunch: video calls with Haarlem and Amsterdam


After the second session we had lunch. We set up a video call with cities who also held a Coderetreat. We had contact with Haarlem and also with J.B. Rainsberger in Stockholm.

In the introduction I promised to show a video during lunch about the "[Game of life within the Game of Life](http://www.youtube.com/watch?v=xP5-iIeKXE8)".

We also had a lot of talking about the Game of Life, about the day and other stuff.

The talking would be over in the next session.

### Third session: mute-ping-pong and 'evil coder'


After lunch, I already decided before-hand to do the _mute ping-pong _constraint in the third session.

This is a session where pairs are _only_ allowed to communicate via their tests. This means you write a failing test and your pair should make it pass by implementing the requested behaviour. After that a failing test must be written and you switch turns. This means if you have an idea how to solve the Game of Life you can only drive your design using tests.

To make things more interesting I had also introduced the _evil coder_ constraint. This means that you should be as ruthless and evil as possible in your code. In practice this meant you would be searching for the 'easiest way out' to implement the test. But there was another side effect...

Some people tried to implement the failing test as easy as possible. For example: 'return true' would suffice if the test asserted 'true'. Then, they would write their test that would force their partner to move away from their idea of the solution. Even though you're not allowed to speak, the non-verbal way of communicating said more then enough to the pleasure of the other.

This session actually was one of the best sessions ever. Feedback went from "never wrote so much code before" to "almost completed the game!'. You could see people really enjoying this.

### Fourth session: choose your three constraints and don't delete your code!


In previous Coderetreats I often heard the comment "if only I could complete the game". Although there is a good reason why we don't finish the game, I thought about it and decided to let people_ keep their code_ after the fourth session.

During this session each pair could choose from six constraints. And they had to choose three. There where three relatively easy constraints: no mouse, max 4 lines per method, only immutabe objects. And three harder constraints which leaned towards [Functional Programming](http://en.wikipedia.org/wiki/Functional_programming): void methods only, no conditionals, no loops.

### Fifth session: inherit code and a change in requirements


In the fifth session we handle a real world example. The pairs split. One would stay with their workstation and the other would look for another pair. This effectively meant that each pair got 'the new guy inheriting the existing code'. On top of that I introduced new rule to the game: Add detection for Zombie cells. A Zombie cell is only created when a dead cell is being revived. Cells that died before and then are brought back alive again are considered Zombie cells.  This means cells that had never died before and become alive, are not considered Zombie cells. Zombie cells behave like alive cells. All you need to do is remember which ones where being 'born' and which ones where being 'raised from the dead'.

### Closing the circle


After the fifth session we 'close the circle'. We went through the board with all sessions and stickies and summarise the day. Then people where asked three questions:

What, if anything, surprised you today?
What, if anything, did you learn today?
What, if anything, would you do differently monday? 

Answers varied; some people wanted to do more TDD. Some people wanted to try out this mute-ping-pong at work (or be an evil coder) and some just had a great time.

And this concluded the day.

I'd like to thank everyone who participated and made it such a great day. If you want to see a slideshow of the day, [you can go here](http://coderetreat.org/photo/albums/gdcr13-amsterdam).

[![foto 2 (1)](http://stefanhendriks.files.wordpress.com/2013/12/foto-2-1.jpg?w=696)](http://stefanhendriks.files.wordpress.com/2013/12/foto-2-1.jpg)
-----------------------------------------------------------------------------------------------------------------------------------------------------


[Crosspost of Facilitating the Global Day of Coderetreat 2013 in Amsterdam](http://blog.zilverline.com/2013/12/20/facilitating-the-global-day-of-coderetreat-2013-in-amsterdam/)