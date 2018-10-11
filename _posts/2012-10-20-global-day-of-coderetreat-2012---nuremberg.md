---
layout: post
author: Péter Zsoldos
authorname: Péter Zsoldos
title: Global Day of Coderetreat 2012 - Nuremberg
preview: Full post text included, originally published at http//zsoldosp.eu
---
Full post text included, originally published at [http://zsoldosp.eu](http://blog.zsoldosp.eu/2012/12/global-day-of-coderetreat-2012-nuremberg.html/)

> If you are not familiar with the concept of a [code retreat](http://coderetreat.org/), listen to this [podcast](http://www.dotnetrocks.com/default.aspx?showNum=728) (or read the [transcript](http://s3.amazonaws.com/dnr/dotnetrocks_0728_corey_haines.pdf)).

As you may remember, I've attended [my first code retreat earlier this year in Frankfurt](http://blog.zsoldosp.eu/2012/09/my-first-code-retreat-legacy-code.html). One of the reasons for attending was that I had a nagging thought throughout organizing [CITCON Budapest](http://citconf.com/budapest2012/)that I should do something locally too, and a coderetreat sounded just like the perfect thing. So I've came back with enough enthusiasm from Frankfurt to approach our CEO (Dirk) about [Paessler AG](http://www.paessler.com/) helping me organize one in Nuremberg - and he offered the office to host it in and to pay for the lunch. Thus the biggest obstacle was cleared.

> The importance of this couldn't be emphasized. As I've seen on the [Global Day of Coderetreat](http://globalday.coderetreat.org/)organizers' list, it has caused some headache and worry for fellow hosts. And in addition to the fiscal support, my colleagues went way beyond anything I expected - our sysadmins arranging the required technical & security infrastructure, running [the GDCR event on the company blog](http://www.paessler.com/blog/2012/11/21/other/paessler-is-one-of-the-hosts-of-the-global-day-of-coderetreat), and even non-programmer colleagues offering to come by Saturday to help with anything if needed. Thank you all, you made it really easy! (by the way, [Paessler is hiring!](http://www.paessler.com/company/jobs))

Anyhow, this post will not be about the organization process, but about what I have learned on this day as a co-facilitator & participant about code and people.

> Another big thanks goes to [Marco Emrich](http://twitter.com/marcoemrich), a seasoned coderetreat facilitator, who helped getting the event off the ground and helped me getting started facilitating (thanks to [Nicole](https://twitter.com/NicoleRauch) & [Johannes](http://twitter.com/Ookami86) for introducing me to Marco!)

The attendance was low (next time we'll schedule the start 30-60 minutes later), but I was surprised to learn how well the coderetreat functioned with so few participants. To ensure there is enough variety and that people have new pairs, we took turns with Marco coding (which we planned anyway in case of odd number of participants).

The Sessions
------------

1.  no constraints, getting familiar with the problem
2.  [no primitives](https://github.com/zsoldosp/zsoldosp-dotfiles/blob/master/bin/snippets/python/unitsofmeasure.py) & focus on the rules (fake out the world if needed at all)
3.  Ping-Pong TDD & naive implementation (with a switch at half time)
4.  no conditional & no mouse
5.  baby steps
6.  free to choose session

It's the **Global** Day of Coderetreat
--------------------------------------

Even though we were only a few people here, it's been great to chat to the others elsewhere worldwide, saying hi to people doing exactly the same thing we do, just in various other locations. While there were audio problems sometime, we didn't mind it. And next year we won't bother with trying to schedule exact times for the calls, since we all will miss those times anyway, but rather just rely on improvising video calls.

Code Related Observations
-------------------------

*   It's really interesting to see other people programming. It is certainly not something one gets to do during their day jobs (except maybe trainers, team leads, and mentors). It is even more interesting to contrast the external observer's impressions/understanding with the understanding of the people involved in the programming - the difference can be huge. This might help understanding how many developers feel bosses/managers always misunderstand their progress...
*   It's also interesting to track people across the different pairs and see whether they bring their firm opinions (battle scars?) to each session or let go of them to allow the opportunity to learn a different approach. This is not necessarily a bad thing, but if you have plans to learn, beware of this and be explicit what you want to learn - know whether you want to explore one idea and bounce it off/get it challenged by many people or whether you want to simply see how others program and see if any of that could be applicable to you. E.g.: it was pretty interesting to see how my F#/Scala inspired ideas (case classes & types) could be materialized in clojure. However, I have certainly learned less about clojure than I would have had I let my partner do it as he would in clojure natively (though the _no primitives_ restriction was screaming for types in my opinion).
*   We developers are really creative at finding (or at least looking for) loopholes in the constraints. During the _no conditional_ session one pair TDD'd a function returning a boolean and claimed they had no conditionals in their code and were trying to convince us that even the rest of the system wouldn't need conditionals to use this code... Or that returning booleans is not an issue since they could refactor it into something that doesn't need to return booleans once they get to the rest of the system... I'm certainly looking forward running a _no return values allowed_session and see how people will circumvent that (and rationalize it away)!
*   The longer you have worked with a tool/language, the more readily you accept and work around its quirks. When we wanted to structure our tests the way we would describe [the four rules of Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) in writing (heading, then four subheadings, and then the concrete examples under the subheadings) it didn't match RSpec's expectations at all. We agreed that both structures (RSpec vs. the natural) make sense and we can understand how & why RSpec evolved this way, but we couldn't make it match the natural structure. This lead to a nice brief discussion about when you want to deviate from standard tooling/processes and when one is better off following it.
*   Some people just can't put off the desire to finish the task. I will have to be conscious of this in the future, and prod people more - e.g.: to ask whether this test & app code meets their definition of perfect.
*   Sometimes when things are hard, it is an indication that you are doing the wrong thing or solving the wrong problem. E.g.: I wanted to write a test for our function to ensure that the function fails unless it gets exactly 8 parameters (number of neighbors) but we were not supposed to use primitives. It felt like enlightenment when my pair pointed out that there is nothing in the rules that mandate that requirement!
*   [TDD as if you meant it](http://www.infoq.com/presentations/TDD-as-if-You-Meant-It) is really hard unless both of you are good at the chosen language. I assumed Ruby and Python are rather similar, but learned quickly it is not the case. While we had great conversations during the session, and I've learned some interesting things about Ruby, we have not made much progress with the actual constraint.
*   It seems most people work on their desktop machines/docking stations, and thus their laptop is a secondary device, where they have not invested in their environments that much, and thus the no mouse constraint is much harder (e.g.: having ReSharper installed at work, but not on the personal laptop).

... and I could go on much longer :) Certainly, the coderetreat format is great, and I enjoyed both programming and facilitating (though the fact my German is not strong enough makes it somewhat difficult), and I'm sure we'll do more coderetreats in Nuremberg. So keep an eye out for it on the [coderetreat site](http://coderetreat.org/events/event/search?q=Nuremberg) or on the [Softwarekammer](http://www.softwerkskammer.de/) events page.