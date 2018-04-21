---
layout: post
author: Paul Zaich
authorname: Paul Zaich
title: Code Retreat with Corey Haines @ Dev Bootcamp
preview: Today's curriculum was a retreat into the wilds of Ruby with Corey Haines. Corey is an experienced developer who has been using a TDD approach to software development for a LONG time. Like 8 and a half years long.
---
Today's curriculum was a retreat into the wilds of Ruby with [Corey Haines](http://coreyhaines.com/). Corey is an experienced developer who has been using a TDD approach to software development for a LONG time. Like 8 and a half years long.

![](http://www.paulzaich.com/wp-content/uploads/2012/07/coderetreat-560x560.jpg "Code Retreat")

The whole point of Code Retreat was to get us to take a step back from coding as fast as possible, and try some approaches to help us perfect our code and make our lives easier in the long run. The great thing about much of this was that it wasn't the first time I had heard in for the most part. Great affirmation that the Dev Bootcamp staff are emphasizing the right coding practices for disciplined, professional developers.

Corey had us perform 5 different pairing sessions during the day interspersed with talks about various programming practices. He had us work on making an implementation of [Conway's game of life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life). I'd never heard of this before so it was interesting to see such a simple set of rules could generate very interesting results. The exercise of coding this game though was really more about the process than the completion. We deleted our code at the end of each session of 45 minutes, so we never got all that far in the implementation. Here are some takeaways from the program:

#### "Tests are the first client of the code you are Writing"


Tests validate that you are making the right choices about our application design.

#### 4 Rules Simple Design


**Good design..**

1.  **Makes Tests Pass.** Verify that your system works after the changes were made. (confirm via automated or manual tests). The faster you can find out that you broke something, the more productive you can be. Faster feedback loops allow for more coding productivity.
2.  **Reveals Intent.** (good names).
3.  **Avoid duplications (DRY).**Every piece of knowledge should only be represented once in your system.
4.  **Small.** Don’t leave left-over code that you are no longer using. Keep your code, clean and tidy. Delete any kind of commented out code. Ask the question: Can I contract or collapse down any of my working code?

#### Don't be afraid to build more Classes


A big emphasis of Corey's lecture was that as a developer, you should strive to build code that is flexible for future changes. With that in mind, Classes are your friend and should be used whenever you find yourself passing around a lot of literal values like strings or numbers. Create a separate class that can hold onto these literals and allow you to interact with them.

#### Write Tests that you can quickly complete


It's easy to fall into the habit of writing tests that have large gaps in logic and require several methods and dozens of lines of code to make them pass. Use tests at each step along the way, in quick feedback loops. The tests help you break down the problem into smaller chunks which will not only result in better test coverage, but also will likely help you maintain cleaner design patterns in your code.
