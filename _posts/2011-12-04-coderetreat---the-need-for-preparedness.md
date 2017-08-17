---
layout: post
author: Mark Simpson
authorname: Mark Simpson
title: Coderetreat - the need for preparedness
preview: (crossposted from verdammelt.posterous.com)
---

_(crossposted from verdammelt.posterous.com)_

## Abstract

This observer has noted a repeated waste of time by attendees of the  
[Coderetreats](http://coderetreat.org/) he has attended. Herein is described a  
simple way to be better prepared when you attend your next Coderetreat

## Observational Data

This past weekend was the Global Day of Coderetreat and I attended the  
one in [Cambridge, Mass](http://coderetreat.org/events/global-day-of-coderetreat). This was my third and I  
again saw an annoyance I want to get out of my head.

First, let me recapitulate the idea of the code retreat. The  
participants work on the [Conway’s Game of Life](http://en.wikipedia.org/wiki/Conways_Game_of_Life) programming  
problem in 45 minute intervals in pairs, throwing away the code after  
every iteration. Some iterations have interesting constraints added;  
such as ‘no primitives’, ‘no ifs’, or ‘silent paring’.

I have noticed that at each coderetreat I’ve attended some people spend  
time (usually only in the first session luckily) fighting with their  
environments to get the point where they can start coding. To me any  
time spent setting up the environment is wasted time when you have 45  
minutes. I’m not saying that this was a /huge/ issue – but a very  
little bit of preparation can save plenty of time during the event.

## An Initial Attempt for a Personal Solution

Given that I saw (and felt, when pairing with someone who was  
unprepared) this problem at the Chicago coderetreat (held the day after  
[SCNA](http://scna.softwarecraftsmanship.org/)), I made sure I had a ruby and Java project all set up so  
that I had a failing test (`true == false`). That way I knew that  
everything was all set: all needed libraries, any special configuration  
([autotest](http://www.zenspider.com/ZSS/Products/ZenTest/) & [rspec](https://www.relishapp.com/rspec) always gives me a little bit of  
hassle), any other annoying little thing was done. I even went so far  
as to push them up to [GitHub](https://.github.com) so others could use them to.  
(git makes deleting the code after an iteration very easy: `git reset --hard HEAD && git clean -fqx`).

It turns out that I didn’t need to do this. There was already a GitHub  
repository that did what I needed and much more:  
[coreyhaines/coderetreat](https://github.com/coreyhaines/coderetreat).

## Conclusion

Given that the above repository is set up for 10 programming languages  
currently, it is likely that the ones you want to use are already  
there. Simply cloning the repository and doing a quick smoke test will  
ensure that your environment is ready for the session.

If you don’t find your favorite language – or the skeleton provided  
doesn’t work as well as it could – send a pull request (I tweaked the  
ruby starting point to let autotest work with rspec right away).
