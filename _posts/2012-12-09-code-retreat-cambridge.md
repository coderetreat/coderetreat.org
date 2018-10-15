---
layout: post
author: Jeff Foster
authorname: Jeff Foster
title: Code Retreat Cambridge
preview: 
---
Code Retreat Cambridge
Yesterday I had the pleasure of attending a Global Day of Code Retreat event held at Red Gate, Cambridge hosted by the local software craftsmanship group.

The format of the day is to solve the same problem a number of times with different constraints each time. Each problem is solved as a pair and generally uses test-driven development. After the end of each session, the code was thrown away. Although this might seem a little strange, it meant you couldn't form an attachment to the code and could more easily indulge with the given constraints.

The problem used this time was Conway's Game of Life. I think this is a great choice of problem, it's simple enough that the problem can be easily understood, but there's a really rich variety of possible approaches to solving the problem.

I alternated the sessions between C# and Haskell. I found the value in pairing directly related to the asymmetry in ability. The more asymmetry the better! I found that showing people unfamiliar with Haskell was a rewarding experience. People seemed to grok Haskell very quickly, and were impressed with the readability of the solution.

As a side note, I was really impressed with Mono. I needed to get a C# development environment up and running on my Linux laptop, and I was slightly dreading doing so. Turned out that was completely unfounded, it just worked. The IDE lacks a few niceties (it's certainly not as easy as Visual Studio + Resharper), but it's not bad!

On the C# side, I learnt more about design than anything else. In particular, one thing that stuck out for me was the difference between the top-down and bottom-up approaches. Sometimes when I paired, my partner would aim to get a top-level test (evolving a grid produces a new grid for example). I found this really hard to drive from a TDD point of view - breaking down from the top is much harder for me. The other way up, writing the rules first (a dead cell that has three neighbours becomes alive for example) feels much more natural for me an certainly a lot easier to drive the tests. There did seem to be a middle ground that was more fun to work through; get the structure right with a top-level test, and then drive the functionality bottom-up. The seems to be the same approach as advocated by Growing Object-Oriented Software by Tests and I look forward to trying this out in anger.

I didn't pair with anyone who even considered mutable objects. I'm not sure whether this was just a self-selecting group of people, but everyone was firmly in the "mutable state" is bad. I would really like to run with a set of constraints to do with high-performance to see how that altered peoples perceptions.

The constraints that were chosen were interesting.
- No primitives (including enums)
- No if statements
- No mouse! (use the IDE)
- No long methods

No mouse wasn't very interesting for me, I've always been a big fan of learning keyboard shortcuts (bashing keys always makes it look like you know what you are doing, so I've found it a good way to hide my incompetence sometimes!).

The most interesting constraint for me was the no if statements (see the anti-if campaign for some justification). The lack of if statements forced you into generating object hierarchies and using polymorphism. It was a little artificial for the problem but it did result in cleaner code (just maybe a bit more of it!).

So now I need to try and take this back to my day job. Always a bit harder trying to apply techniques learnt in the small to problems faced in the large. Legacy code makes life harder!


Originally posted to [http://www.fatvat.co.uk/2012/12/code-retreat-cambridge.html](http://www.fatvat.co.uk/2012/12/code-retreat-cambridge.html)