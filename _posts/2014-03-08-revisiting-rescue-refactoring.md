---
layout: post
author: curiousagilist
authorname: Bob Allen
title: Revisiting Rescue Refactoring
preview: For our March event we returned to Cyber-Dojo and discovered a very useful feature on Emily Bache's Refactoring Katas on Github. Way down at the bottom of each kata's explanation is a set of links (one for each of several languages) that create a new Cyber-Dojo for that kata. This was a huge help. Thank you Emily once again.  We again stuck to the Tennis scoring and Yahtzee scoring katas for the morning sprints, and moved on to Gilded Rose after lunch.
---

For our March event we returned to Cyber-Dojo and discovered a very useful feature on [Emily Bache's Refactoring Katas on Github](https://github.com/emilybache/Refactoring-Katas). Way down at the bottom of each kata's explanation is a set of links (one for each of several languages) that create a _new_ Cyber-Dojo for that kata. This was a huge help. Thank you Emily once again.  We again stuck to the Tennis scoring and Yahtzee scoring katas for the morning sprints, and moved on to Gilded Rose after lunch. 

Because the Gilded Rose kata contains many aspects encountered in real-life, we had some deep conversations, some inspired by watching Jim Weirich do [a masterful Roman Numerals kata](https://www.youtube.com/watch?v=WBJ3hdcM7G8). Jim's elegant teaching style will be missed. The video is highly recommended for illustrating how elegant solutions can emerge from careful application of TDD practices.

Knowing where to start on a large legacy code base got us talking about the "heat map" technique. This is not related to UX eye-tracking but instead focusses on seeing where the largest number of source repo check-ins are occurring. A lot of activity focused on a single module is often for one (or both) of two reasons. Either the module that's getting the most attention is the center of the universe and fails to uphold the [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle), or reported bugs too frequently require changes in that module's code. Both conditions are code smells that make the module a candidate for refactoring.

So the question of an easy way to identify where your heaviest repo activity is came up. Attendee Steven Coffman worked out a pipeline of shell commands that does a great job of surfacing candidates:

```
git log --since='last month' --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10
```

You can replace the _'last month'_ with _'1 week ago', 'yesterday', '1 year ago', '3 months ago', '1/20/2009'_. Or you can omit the `--since='last month'` to have no time limit.

Thanks Steve!
