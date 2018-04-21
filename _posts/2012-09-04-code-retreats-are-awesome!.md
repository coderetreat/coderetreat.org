---
layout: post
author: Corinna Baldauf
authorname: Corinna Baldauf
title: Code Retreats are awesome!
preview: [This is a cross-post from finding-marbles.com]
---
_\[This is a cross-post from [finding-marbles.com](http://finding-marbles.com/2012/09/04/code-retreats-are-awesome/)\]_

At least the one I attended on Saturday – My first one.

### What is a code retreat, you’re asking?

[![](http://findingmarblesdotcom.files.wordpress.com/2012/09/coderetreat.jpg?w=300&h=225&width=300)](https://twitter.com/cornelis/status/241840053339430912)

A bunch of people who want to improve their coding and unit testing skills meet for a day. Everyone has their IDEs and testing frameworks ready to go. You get to tackle the same problem multiple times. We had 7 blocks, each consisting of 45 minutes coding followed by 15 minutes retrospectives. In each coding phase you pair program with someone else. To spice things up, there’s a new constraint for each round, e.g. “No IF-statements allowed”. After each round you throw away the code. \*gasp\* Heresy!

### Why would you do a code retreat?

For deliberate practice. There’s this famous analogy: Musicians spend a lot of time practicing, then give a few concerts. Software developers – who often build something they’ve never build before – spend all of their time “giving the concerts” and hardly ever just practice the basics, let alone with someone else. A code retreat is an opportunity to learn

*   new ways of thinking / approaching a task from your pairing partner
*   to take really small steps
*   new languages
    (Code retreats are not language specific. I got to code in JavaScript, Java and Ruby. Java was the least common denominator – it works for everyone.)
*   new shortcuts, IDEs, frameworks, …
*   to throw away code

### Our constraints for the 7 phases were:

1.  None
2.  Ping-Pong – A writes test, B writes code to pass test, B writes next test, A writes code to pass test, …
3.  Law of Demeter – No more than one “.” per expression allowed, so no objectFoo.getBar().doFoo() – Following this law leads to looser coupling
4.  [TDD as if you meant it](http://coderetreat.org/facilitating/activities/tdd-as-if-you-meant-it)
5.  No naked primitives – No ints, no booleans, …
6.  No If – Yeah, that’s a hard one…
7.  Each pair could choose individually from a [long list](http://coderetreat.org/facilitating/activity-catalog) – We chose “Find the loophole”

### My takeaways:

*   As I’m not a developer, I was afraid to slow my pairing partners down. No need to worry: Code retreat tasks, such as the classic [“Conway’s Game of Life”](http://coderetreat.org/gol), are quite simple and there were other non-developers attending.
    It’s helps if you’ve at least seen unit tests before, though.
*   I take way too big steps
*   In the “no primitives” round I learned to use enums instead of booleans and they make the code more “speaking”
*   A code retreat is great fun, but also exhausting. 7 sessions is one too many.

Next I’d like to attend a Legacy code retreat, where you learn to refactor old brittle code.

Many thanks to the facilitators [Patrick Cornelißen](http://www.orchit.de/) and [Sergey Shishkin](http://shishkin.org/), to [innoQ](http://www.innoq.com/de) for hosting the event and to all attendees for making my first code retreat an awesome experience!

So could be yours: [Find a code retreat](http://coderetreat.org/events) near you!
If you’re in Germany, join the [Softwerkskammer](http://www.softwerkskammer.de/)!

* * *

Patrick and Stephan blogged about the same retreat:

*   [Retrospective](https://plus.google.com/u/0/108915318790061711841/posts/RWAx3BPHsWe) – Patrick (who facilitated the retreat)
*   [Attending a code retreat](http://seasidetesting.com/2012/09/02/attending-a-code-retreat/) – Stephan (writes from a tester’s perspective)