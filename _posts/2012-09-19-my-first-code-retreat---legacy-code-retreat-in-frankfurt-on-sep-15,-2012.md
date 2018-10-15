---
layout: post
author: Péter Zsoldos
authorname: Péter Zsoldos
title: My first Code Retreat - Legacy Code Retreat in Frankfurt on Sep 15, 2012
preview: Full post text included, originally published at http//zsoldosp.eu
---
Full post text included, originally published at [http://zsoldosp.eu](http://blog.zsoldosp.eu/2012/09/my-first-code-retreat-legacy-code.html/)

> If you are not familiar with the concept of a [code retreat](http://coderetreat.org/), listen to this [podcast](http://www.dotnetrocks.com/default.aspx?showNum=728) (or read the[transcript](http://s3.amazonaws.com/dnr/dotnetrocks_0728_corey_haines.pdf)).

While I knew about [Code Retreats](http://coderetreat.org/) for a while, this was the first I actually managed to attend). It was organized by the [German Software Craftsmanship community](http://www.softwerkskammer.de/) group, hosted by [Namics](http://namics.com/), and facilitated by [Nicole Rauch](https://twitter.com/NicoleRauch) and [Andreas Leidig](https://twitter.com/leiderleider). And it was great, thanks to everyone involved in putting up the event!

The [format has been described by others](http://www.coderetreat-rhein-main.com/learnmore-legacy), so I won't cover that. I have to say though that I really like the format and I wish I started socializing (in software related matters) first at a code retreat instead of conferences or usergroups - the format of the event guarantees one doesn't have to worry about uncomfortable silences to be filled with smalltalk. The day starts with coding, the retrospective is group talk, and with the exception of the lunch, the breaks are only five minutes long, and you are searching for the next programming pair during that time anyway. Great way to get more comfortable interacting with strangers about software! (And if you do want to socialize, just come early for breakfast and stay after the event).

I wonder if being familiar with automated testing is a pre-requisite
--------------------------------------------------------------------

My assumption is that one could attend a legacy code retreat even if (s)he has no experience with automated testing, since

*   You could learn the basics of testing from the pairs you are working with
*   You can see it applied _in the real world_. The most common objection I hear from people recently introduced to automated testing/TDD is that it might work on greenfield projects, but cannot be applied on their existing project

So if you are (or know of someone who is) a person who attended such a code retreat with no prior testing experience, please let me know - I would love to know whether the above hypothesis matches your experience! Unfortunately all my pairs had prior experience, so it's still just a hypothesis.

Iteration impressions, lessons learned
--------------------------------------

*   Dynamic language IDEs still have a long way to go, so for now I'll probably stick to Vim for python
*   While it's interesting to take a guided tour of a language you don't know, the focus of the codebase is not on datastructures (only uses lists/arrays) and thus you only catch a glimpse of the language. I'll have to attend a normal code retreat to see whether this would be different there
*   Giving a language demo is interesting, and you learn a lot about the language too. People new to a language tend to ask questions about things you take for granted, yet you may not know the answer to
*   Taking baby steps and not assuming anything is a Good Thing ™ - the codebase is devious one, crafted with care to make you trip over. I.e.: it is a proper legacy codebase, despite its small size!
*   The "never assume" advice holds especially as you move between iterations. During one iteration we made a mistake that wasn't caught by the regression tests. Since in the previous iteration (with another pair) we had 100% (line) coverage, the fact that in the next iteration we might not have that didn't occur to me...
*   Discipline is hard. I was totally carried away refactoring during the last iteration. I had this craving to actually make progress with the refactoring, and I caught myself saying things "were we responsible coders, we would now stop to write some tests, but let's just move on now", as well as tugging multiple pieces of the spaghetti at the same time. While here I might be forgiven (after all, the last iteration was a free to choose what to do (with) this codebase), it's an important reminder that I should watch myself at work - I would have never expected myself to get so off track in a matter of 10-15 minutes. And I used to pride myself that I realize when I'm in a dead end and have no trouble throwing away code to start from the last known good state!
*   The code retreat format is great for teaching people the importance of prototypes, I will keep that in mind for the future. During the functional iteration we haven't made much progress, but on the train home I did a quick experiment to start making it functional from the outside in, starting at the main() method, introducing the GameState as a subclass of Game, and each step returning a new GameState (while still modifying the old game state, since the refactoring was incomplete, as it usually is the case). This approach didn't occur to me the first time, and had I not started from a clean slate, I would not have thought of it if I were to continue where I left off the previous attempt.
*   While the facilitators keep going around, we didn't always get deep into the issues they commented on (e.g.: I think if the test case and the test name express clearly the domain and the scenario, it is totally fine to use a variable called _sut_, etc.).
*   However, there is a lot of time available to discuss with your pair, not having to worry whether or not the code will be finished, which is great. One caveat is that you do have a time limit on the discussion, since you don't want to bore your pair and want to actually write code, so you are forced to condense your thoughts. Luckily, this limit is not as bad as [twitter](https://twitter.com/)'s
*   Theory vs. practice, a.k.a. talking the talk vs. walking the walk. I've been guilty of this myself, describing how my ideal test case would look like in theory, and what guiding principles I follow while writing an actual test case. Then the pair politely points out that the theory is great, but what we have here in the code is not a manifestation of those principles...

The Iteration I wish was there - working towards a change request
-----------------------------------------------------------------

Each iteration had a different focus, and I assume that there isn't a static final (pun intended) list of possible restrictions and it evolves. So despite this being my first ever code retreat and being told that these ideas wouldn't fit the format, I'm documenting them here, so that I can refer back to it after my next code retreats to see whether I still feel the same about these, since now I think they would be similar restrictions like during the traditional code retreat when one is not allowed to speak or use _if_ statements in the code.

I really missed having a clear functional goal for the iterations, since one usually refactors legacy code when some new feature/enhancement is needed - and it has a huge impact on how one approaches a refactoring.

One mistake I have (seen) made when working with legacy code is going on a **refactoring spree**, touching parts of the codebase which we don't need to change. The danger of it is that we can easily code ourselves into a corner for days and slip on the original delivery. If it ain't broken, don't fix it (and this doesn't contradict the [boyscout rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule)). This issue has been exposed during the iterations, many of us refactored one part of the application that wasn't business logic heavy, but was a low hanging fruit. While one iteration wouldn't be enough time to finish testing that part, the conversation around it (what test cases would be needed to provide sufficient code coverage, what's the minimum refactoring we need to do to achieve that, etc.).

I raised it during the final retrospective, and people agree it's an important aspect, but they suggested it's not fit for the format of the code retreat.

The other great benefit of having a clear goal is that they demonstrate how **fragile** the **regression characterization tests** can be. A neat little change request to the core business logic would have left us without the safety net again, and would have made us think back to the previous iterations when we felt skipping writing a specific test is safe. While everyone knows it, that doesn't mean we wouldn't fall victim to it..

And if you prefer to see a concrete example, instead of just reading through this abstract text, I have something like the [Double Dawg Dare](http://anarchycreek.com/doubledawgdare-series/) in mind.

Some technical notes for attending a code retreat:
--------------------------------------------------

*   doublecheck with the organizers what you'll need to attend. They probably plan to send out a reminder/notification email before the event, but I so rarely use my laptop in an online environment that their notice was too late for me to actually prepare my laptop for the event.
*   know your settings & IDE. There are a ton of yaks to be shaved, and many minutes have been wasted by setting things up. It doesn't take away from the experience, but it did stress me a bit the first time
*   either know how to use git, or just create two copies of the codebase so you can easily revert to a clean codebase after the sessions. We had some problems with this.

    - git clean -x -f -n # remove -n to really remove them
    - git reset HEAD . # remove everything from the changelist in case you added it
    - git checkout -- . # revert everything below the working directory


*   bring a USB stick, and if you are not using your own laptop during all the sessions, make a copy of the golden master textfile onto it after each of your sessions in a new programming language (my laptop was only used during the first and the last iteration, so for the last we had no sample output textfile we could work against, and it took some time to obtain it.

*   bring your own keyboard and know how to change a mac/linux/windows machine's keyboard layout (or install one). I have not been typing in a number of sessions because of this (try typing on a German mac keyboard, when you are used to windows US layout!)

In Summary
----------

It's a great event, you meet great people, and I would be surprised if you came away from a code retreat not having learnt anything new.