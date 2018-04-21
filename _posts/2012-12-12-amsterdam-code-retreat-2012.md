---
layout: post
author: Willem van den Ende
authorname: Willem van den Ende
title: Amsterdam code retreat 2012
preview: Facilitating a code retreat, amsterdam edition
---
**Facilitating a code retreat, amsterdam edition**

Marc Evers and me facilitated the Amsterdam [code retreat](http://www.coderetreat.org/) hosted by [Mirabeau](http://www.mirabeau.nl/) and put together by [devnology](http://www.devnology.nl/) last saturday. More importantly, Rob Westgeest facilitated the kids track together with Freek Leemhuis.

The kids track grew out of some discussion on twitter the week before the event. We wanted to host it in the [QWAN](http://www.qwan.eu/) office in Tilburg, but were not sure if we woul have enough participants to make it interesting. At some point, Rob suggested: "Why don't we invite kids?".

We've been thinking for a while about teaching kids to program, and seeing there were some enthusiastic parents representing their enthusiastic kids we decided to go for it. The kids programmed a video game with scratch, the 'older kids' programmed the game of life in the techology of their choosing.

**Kids track**

Freek Leemhuis and Rob facilitated the kids track. Freek brought his daughter, Rob brought two daughters and a friend of theirs. All in all we had seven kids playing with programs. Before the day there was some discussion on what software to use. We settled on scratch because of its visual nature, and as you program, you can immediately see the effects. Messing about with cartoon characters, animation and sound is a lot of fun, as you can see in [the photos](http://devnology.nl/en/blog/7-verslagen/230-report-global-day-of-coderetreat-ams-2012). Rob found very nicely laid out exercises for scratch online. They were even already translated to dutch. Progress was quite fast, as Rob had anticipated from a trial run. During the lunch break the kids did a demo to the rest of the group. The adults had nothing to show, because the code retreat rules state you have to delete your code at the end of the exercise. Cruel. In the afternoon Freek and Rob presented their product vision for a game where the player is an animal that gets points for catching falling objects. The vision was clear in the demos at the end of the day, although the visuals and sometimes the gameplay were quite different. In some games the difficulty increased as you made progress, they looked quite hard. So good fun.

**Older kids track**

We gave participants the constraints with as little explanation as possible. Like the game of life, the constraints are simple rules that generate interesting behaviour. This goes for the code, as well as the participants.

For us this was an interesting experiment. In courses we challenge participants, but we usually explain a little bit about the goal of the exercise beforehand. Here we wanted to see what behaviour and code would emerge.

Since the group seemed to be fairly experienced with Test Driven Development, we decided to skip the warm-up round and go straight into [TDD as if you meant it](http://cumulative-hypotheses.org/2011/08/30/tdd-as-if-you-meant-it/), an excercise originally devised by Keith Braithwaite. To see how comfortable the group was with TDD. Not enough it seemed, so we decided (breaking the rules) to do it another round. Writing the first test was hard, having a bit of implementation in a test method, and not be allowed to extract is strange. It is also not trivial to come up with a first example that is small enough and still means something. Therefore we recommended the participants to write the first test quickly and move on - opportunities for extracting methods will only reveal themselves after a couple of tests.

After lunch, we felt like a quiet start. So we did silent pairing with ping-pong TDD. In this form one of the pair writes a test, the other makes it pass, refactors and writes the next test. We also encouraged the implementor to be evil. One pair decided to make each others life hard, by creating tests that were also hard to implement. At some point the implementor spent 20 minutes rewriting the solution because there was no other (cheating) way to make the tests pass.
This seemed to be the most fun exercise of the day. One caveat: with silent pairing it is best if both developers already know the programming language and environment they work in. Some pairs were whispering to explain the language, even though we threatened to delete the code when people talked. Others made it extra hard by keeping the TDD as if you meant it rules. It turned out that having to specify return types for methods helps communication, one pair programmed in C# and they wrote their method calls like

var someResult = SomeCall(parameter)

And then the implementor returned a completely different kind of object than the test writer expected. In this case

SomeType someResult = SomeCall(parameter)

would have been clearer. It is interesting to see how much we communicate about our code outside the code.

While walking around we spotted quite a few getters in the code, and test methods with many asserts. So the next round was no return statements, and one assert or expectation (if participants decided to use a mocking framework). This turned out to be a real puzzle for most participants. Only one pair succeeded, while making their own mini-mocking framework in C# using lambdas. So we explained a little bit in the debrief how objects are supposed to be passing messages to each other, hexagonal architecture, and that 'getting' makes the design brittle because many dependencies tend to turn in to trainwrecks:

this.getThat.getSomethingElse.getSometThingFromOverThere.doSomething

If you use a pure functional style it may be ok, and you can encapsulate dependencies in partially applied functions. But we digress (we can discuss this further if you want, just leave a comment).

At least some participants figured out that by doing return-less TDD, you can drive your design top-down, so it gives you more places to start.

Even though this last exercise tired the participants, we decided to challenge them once more: develop without conditional statements (ifs, for-loops. Using functional style like map, select etc. is allowed). This was also a good challenge. Especially for the pairs using Java without additional libraries. One of them came up with using hashmaps instead of ifs, which is an interesting direction. Polymorphism and immutable value objects also seemed to be popular, possibly as a result of the previous exercise.

We enjoyed facilitating this code retreat.

**You are unique, just like everybody else**

We didn't emphasize the international aspect much. We showed the photos from the video wall on a regular basis, which was interesting, but decided to give the kids airtime as opposed to doing a video chat with another location. Having the [Code Retreat live](http://coderetreatlive.org/) site was fun. It turned out that both Donostia, Spain and Haarlem, close by, were following roughly the same trajectory as we were. As they say: You are unique, just like everybody else.

This would also be the place to thank Corey Haines, Jim Hulme, Adi Bolboaca and the others on the code retreat google group for making a big effort of preparation. It took me quite a while to go through all the materials. But it's better to have too much material than too little.

If you want to facilitate your first code retreat, I recommend you take at least a day to go through the materials, discuss with the other organisers, if any, and try some angles on the exercise you are doing in the forms you want to try. For me, I experienced more flow doing the game of life in TDD as if you meant it style than previous attempts. And the if-less design (in ruby) turned out quite compact and functional in style.

**Further reading**

For a participants' perspective and ore on the kids' track, read Linda van der Pal's [report on the Amsterdam code retreat](http://devnology.nl/en/blog/7-verslagen/230-report-global-day-of-coderetreat-ams-2012) with photos by Freek Leemhuis and his daughter, who also participated in the kids track.

If you're interested in these kinds of exercises, I would recommend you check out the [code retreat site](http://www.coderetreat.org/) for various forms to try out, and the [coding dojo site](http://codingdojo.org/) where you can find lots of exercises besides the game of life. You could also visit a coding dojo near you. For instance, the original coding dojo in Paris, started by Emmanuel Gaillot and Laurent Bossavit eight years ago, is still going strong, the London coding dojo has monthly meetings etcetera. .

Doing these exercises is good fun, and helps you become more well-rounded developers. Trying several completely different approaches to the same problem gives you more options the next time you are developing something for real.