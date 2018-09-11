---
layout: post
author: SamirTalwar
authorname: Samir Talwar
title: Global Day of Coderetreat An Account from London
preview: Here’s what you do. On Saturday morning, at ridiculous o’clock (i.e. around 8), you walk into a room which has a delicious breakfast all laid out. There are some people running about shouting at each other about “sessions” and “calls”, but you ignore them in favour of the sweet pastries, fresh fruit and hot coffee sitting on the counter. When you’re done, you take out your laptop, and someone with a funny haircut floats over to remind you that you should have a test environment set up for your language(s) of choice.
---
Here’s what you do. On Saturday morning, at ridiculous o’clock (i.e. around 8), you walk into a room which has a delicious breakfast all laid out. There are some people running about shouting at each other about “sessions” and “calls”, but you ignore them in favour of the sweet pastries, fresh fruit and hot coffee sitting on the counter. When you’re done, you take out your laptop, and someone with a funny haircut floats over to remind you that you should have a test environment set up for your language(s) of choice.

You mingle for about half an hour. What are you working on, what languages do you use, how enterprisey is it… that king of thing. Eventually, that same guy with the funny haircut stands up and talks. He tells you you’re going to be working on implementing [Conway’s Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), you’re going to be pairing, and you’re going to be writing tests. He also tells you that two thousand other people across the globe are, on this day, 3rd December 2011, doing exactly the same thing. Cool, right? You want to get cracking, but suddenly, there’s a bunch of Belgians on the projector, waving. A man with long hair says hi, and someone over on your end asks him how the first iteration went. Of course, it’s an hour later over there. They seem to have enjoyed it—lots of grinning. It’s a bit awkward, what with no one knowing each other, but quite fun.

So you find another coder who likes C# and get to work. His name’s, oh, I don’t know, Fred. Fred’s a good name. The room’s buzzing as people natter about the closed tube station, the food, the weather and, most importantly, which test they should be writing first. You go for “the grid is 100x100”. Cells go on a grid, right? Let’s start with that.

Code code code code code. You’ve been coding for twenty minutes. Not that long in the grand scheme of things, but the man with the funny haircut did mention you only have forty-five. Just then, that same man swings over to stare at your code. He asks why you have a grid. You tell him cells go on a grid. He asks you where in the rules it says that, so you flip over to Wikipedia to have a look.

1.  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2.  Any live cell with two or three live neighbours lives on to the next generation.
3.  Any live cell with more than three live neighbours dies, as if by overcrowding.
4.  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

He’s right. Kind of. Of course there’s a grid. But then he tells you not to worry and shoots off to hassle the next pair, leaving you feeling slightly bemused. You ignore him, and get on with the task.

You hear a ringing sound, and look up to see the funny-haired man tapping the side of his coffee mug very loudly with a spoon. Is it time already? Forty-five minutes goes quick—much quicker than you’d realised. He’s bellowing, “DELETE YOUR CODE!” You thought that was a joke. You don’t want to destroy your hard work, but your pair, who’s done this before, assures you it’s a good idea. Well, it’s not like you got very far anyway. Other people are gathering in the room you’re sitting, looking at the funny-haired man expectantly as he begins to talk.

“So, how did it go?” he asks in his odd accent. You hadn’t noticed how odd it was before, but he definitely originates from somewhere else. That also explains the hair. Weirdo. Anyway, back to the question. It went alright, you guess. Got somewhere. Not too much done.

“Who managed to implement the first rule?” Well, you didn’t do that. You barely had enough time to get the grid up and running, let alone the rules. A quick poll shows that about half the room didn’t have a grid, just a cell. He reminds you that the point of the exercise is to implement the rules, not a grid. Perhaps you’ll focus more on them next time. Just get the bare minimum up before attacking them. Better find a new pair.

“This time, you’ll focus on [the four rules of simple design](http://agile.dzone.com/articles/4-rules-simple-design).” He’s written them up on the whiteboard, and they’re also sitting in [the Twitter account](https://twitter.com/CoderetreatLdn). Alright, easy enough. No duplication? That’s second nature to you. You find another pair and get to work. This time, you’re working in Ruby. You don’t know Ruby, but it’ll be fun to learn it. This, of course, means you’re sitting back and watching a little, and so your pair, Tom, drives the first test: “a cell should have neighbours”. It looks like this.

describe 'cell' do
it 'has neighbours' do
cell = Cell.new
cell.add_neighbour
cell.add_neighbour
cell.neighbours.length.should == 2
end
end

You start implementing it. It goes quickly. You’re just about to start on the second test, which you get to drive, when you’re interrupted by the man who was asking the Belgians questions earlier. Someone asks him where his moustache is. He laughs and tells them Movember’s over, and then stares at your code a little. He points at your first test and asks you, “does that express every idea we need to express?” Of course it does, you previously-moustached man. A cell needs neighbours. You don’t answer, but Tom says something to the same effect. The response: “But what are those neighbours?” Cells, obviously. “Where does it say that in your test?” Before you can think of a snarky reply about his mother, he’s moved onto the next question: “Why can you access `neighbours`? Do you have the minimal amount of methods and fields?” Well, no. But you need to test it somehow.

“Ask why, not what. Why do we need to know the number of neighbours?” So we know whether the cell is dead or not. Right. You swear an oath on your honour to kill him later, sort out your test so it asks the right questions, and fix your code.

The retrospective for this one goes well. People explain how they got to a better design by thinking about expression and intent. People talk about the four game rules as acceptance tests, used to drive behaviour. It dives into a deep discussion about testing and outside-in vs. inside-out before it’s cut off. Apparently there’s a call at 12:30 with Stockholm and they’d like to keep the schedule. Before you can blink, you’re onto the next session: [object calisthenics](http://www.markhneedham.com/blog/2008/11/06/object-calisthenics-first-thoughts/). Write the best object-oriented code you can. You already know how to write object-oriented code—you’re an excellent C# developer—so this one should be easy.

You start with the test, of course. You’re not an animal. You and your new pair, Bob, decide to take the advice from the previous test to heart and type this:

@Test public void aLiveCellWithFewerThanTwoLiveNeighboursDies() {
Cell cell = new Cell(1);
assertFalse(cell.isAlive());
}

Wait. `isAlive` is a getter. It’s right there. The last rule. No getters or setters. You talk about it, and neither of you can figure out how to work around this rule. AAARRGGHHHHHHH. Why is writing such a simple test so difficult? You keep talking until that smiling git without a moustache shows up and asks you why you’ve got a getter. “Because how else do we test it?” “Tell, don’t ask. What does your object `do`?” It lives or dies, duh. “No, that’s what it _is_. Its state. What’s its behaviour?”

You don’t know. “You should probably figure that out.” Eventually, it hits you. You need to show it somehow. So you rewrite your test to have it “display” the cell to an interface and stub it to assign to a variable. Excellent. Now you can make progress. Or so you think, until the funny-haired man starts banging his spoon against his coffee mug. He’s not shouting “DELETE YOUR CODE”, but everyone else is, chanting in unison as they engage in the destruction of their hard-earned work as if it were a ritual slaughter. It almost is. The discussion for this one is fascinating. Many found the last rule the hardest in this situation, but people were asking about all of them, wondering _why_ you’d want to keep your classes to a maximum of two fields. It seems ridiculous. And wrapping _all_ primitives? Wow. You collectively come to the realisation that these are guidelines, not hard and fast rules: you shouldn’t be afraid to break them, but you should understand why you’re doing so. The funny-haired man talks about how they make you name things, which in turn makes you think about what something actually _is_. One guy points out how this goes against a lot of ideas about how functional code is supposed to look. He’s right, it does. Functional programming and object-oriented programming do often go in two different directions. You knew that, but you’d not really seen any evidence before.

Lunch. Lunch is delicious. Simple fare, mostly sandwiches, but tasty. You were hoping that by “no pizza” they meant “roast duck and potatoes”, but this will fill the belly. The conversation starts on the morning’s work but quickly flies off in all directions. You end up talking about hack days with the only female developer who showed up. Apparently there really is one for everything. You’re midway through explaining why you’ll never develop for iPhone on principle when someone yells at all of you to get back into the meeting room for an impromptu call with Spain. Of all things. It’s slightly mental—the Spaniards’ faces are on a laptop being held up by Sans Moustache rather than the projector, but it’s pretty funny and everyone on both ends seems to be enjoying themselves. You’re just getting a rapport going when the laptop battery dies and the video cuts out, which just adds to the laughter. You dive out of the room ahead of everybody else to grab the last fish skewer, which you spied just before you were dragged inside.

Session four. You’re told you talked too much over lunch, so this time, you’re not going to talk to your pair. Exceptions are made for explaining how the languages and IDEs work, but that’s it: you must communicate only through your code. The importance of expressive tests are highlighted. You find a pair. You forget to ask his name, but it doesn’t matter. He writes the first test. Not what you would have written, but you make it pass anyway. By returning a constant. You write the next test, and make him actually implement the functionality he clearly intended for you to write. He gives you a Look.

That Look gets traded back and forth over the next three-quarters of an hour. Cooperation devolves into competition and you drive the code in two different directions, resulting in a big mess. Not the best outcome. When you hear the coffee mug ringing, it’s almost a blessing. You talk good-naturedly about how you would have done things if you could only speak to each other, but inside, you’re each plotting the other’s demise. After a bit of discussion from other pairs in the retrospective about how surprisingly well it went, this comes out. You’re worried for a second—have you made a nemesis?—but it actually helps a lot to understand what the other guy was thinking. Perhaps you’d better not pair again soon though.

You still don’t know his name.

Session five. [TDD as if you meant it.](http://gojko.net/2009/02/27/thought-provoking-tdd-exercise-at-the-software-craftsmanship-conference/)Simple, right? You pair with one of the guys you were talking to over lunch, who introduces himself as Raj. Nice bloke. Won’t stop smiling. You write your first test together, naturally trading ideas and the keyboard. It goes well, and you implement a solution together too, making sure to keep the method in the test class like the rules say. You don’t see the point of it. Then the man with the funny hair shows up and asks you about the second rule. You show him the implemention in the test class. He says that’s not good enough. You need to implement it in the test itself. It doesn’t make sense, but you do it anyway. It looks like this:

\[Test\]
public void ALiveCellWithFewerThanTwoLiveNeighboursDies() {
var cell = new Cell(Alive);
cell.State = Dead;
Assertion.AssertFalse(cell.IsAlive());
}

Right. Now onto rule 5. “Where did `Cell`come from? That’s not TDD.” Well, we needed a cell. “No you don’t. You can do it without the cell.” Huh? OK, you get rid of the cell class and replace it with just the state. You’re not really testing anything here. “Don’t worry, you will soon. And by the way, you probably don’t need that enum.”

So you write another test, grumbling to Raj, who’s still smiling. You don’t like him so much any more. You write another test to check exactly the opposite. The funny-haired man swings back and says, “Good. You’ve got some duplication. Now refactor.” So you do. And suddenly, after pulling out a method, the test starts to read like a test again.

Talking about this afterwards, it’s clear that you can get pretty far without any classes at all. Whether you should is another matter, but it looks like a useful technique. Sans Mo talks about Test-Driven Design instead of Test-Driven Development, but he’s really just giving a name to the concepts being thrown out all around the table. It seems like it goes right against the ideas of Object Calisthenics, and this is confirmed by one of the guys standing up: it actually leads to a more functional design.

The final iteration of the day. Finally, some peace: this time, you do what you want. No bastards facilitators wandering around and “helping”. You and your pair, Paulo, decide to just write some tests and see what happens, and you get pretty far. Annoyingly, you both see evidence of the rules cropping up in both your test and your code, especially object calisthenics. Your brain has decided that properties are a bad thing, and you feel a bit of anguish every time you write one. Your tests are angelic in their beauty, and you feel a pang of sadness as the coffee mug rings and your pair gently takes the laptop from you, almost callously hitting the _Delete _key and vaporising your glorious creation.

You feel a tear running down your cheek, but not from sadness. You’ve finally realised that it’s not the destination that’s important, it’s the journey.

* * *

_This is a rather dramatised account of a fictional programmer who attended last Saturday’s Global Day of Coderetreat in London. The code and emotions are made up, but the events are real (except in the case of session four, where Olly and I were pretty close to smacking each other… though I did know his name). Thanks so much to everyone who came and specifically to [Sandro](https://twitter.com/sandromancuso) (the funny-haired man), [Olly](https://twitter.com/ollywickham) and [Maria](https://twitter.com/marialacher) for running the show and letting [me](https://twitter.com/SamirTalwar) (the man without a moustache) pretend I was helping. Cheers to [Valtech UK](https://twitter.com/valtech) for providing us with a great space and delicious food. It was, by all accounts, a great success, and I’m looking forward to doing it again soon. And hopefully I’ll know what I’m doing next time._