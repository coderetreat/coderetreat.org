---
layout: post
author: Shaun Finglas
authorname: Shaun Finglas
title: Codeweavers Coderetreat
preview: Last week we had @kevinrutherford in to run a coderetreat. It was the first retreat I’ve taken part in personally, the same applying to much of the team. The day was to focus on one challenge – Conway’s Game of Life, though each iteration would introduce new constraints. Iteration 1
---
Last week we had @kevinrutherford in to run a coderetreat. It was the first retreat I’ve taken part in personally, the same applying to much of the team. The day was to focus on one challenge – Conway’s Game of Life, though each iteration would introduce new constraints.

### Iteration 1

The four rules of simple code were discussed, aka “Extreme Normal Form”.

- Passes tests
- Communicates intent
- No duplication
- Nothing unncessary

Our first run through was somewhat of a disaster. We became too obsessed with how the grid was to be stored. This meant we spent a long time messing around with arrays and multidemionsal arrays in C#. Both are somewhat tedious and not something we use often, therefore we concluded a more “grid agnostic” approach would be needed. After all, there is nothing stating the grid need be a square, fixed layout.

### Iteration 2

The concept of Arrange, Act, Assert or AAA was discussed.

- Arrange – set up pre conditions
- Act – do something on the subject under test
- Assert – verify or check some result

The constraint during this iteration was that all asserts were to be created first, and we would work backwards. Personally I found this difficult, both mentally and in terms of tooling. For the past four years I’ve rarely wrote an assert first, therefore this switch proved tricky.

Visual Studio and Resharper also tend to favour a top down approach. In other words, it’s easier to stub out a class and add methods, rather than the inverse.

New members to the team found the act of writing the assert first much easier however, and they’re looking to continue this in day to day development.

The point I took from here is that while I may personally know what I’m writing, my partner might not be aware of where we are heading. Starting with the assert first allows both developers to see the goal for that particular test.

### Iteration 3

Our third iteration introduced the unrealistic concept of mute pairing. Only the code and tests can reveal our intent.

Using ping ponging (switching between developers who writes tests/production code) we managed to get a good chunk of functionality complete. Despite this the rest of the iteration was very difficult. Being unable to talk about design concepts was incredibly frustrating.

The most important concept we took away from here was that more than likely the developer working with your code tomorrow will not have worked with you previously. That means any conversations you’ve had to explain the code will be lost. The only thing left to communicate will be your tests or production code. Due to this observation, it is cruicly we name our tests and code in a manner that is cleary and understandable, whether six minutes or six months have passed.

### Iteration 4

Our fourth iteration had a focus on OO concepts. Up until now, our code had exposed much of the state in various ways. The challenge was to focus on the messages that are exchanged between objects, rather the change in state.

This introduced a new problem. How do we test an object without exposing state? We talked about a couple of methods; mock objects or the self shunt pattern.

Using the shelf shunt pattern was an enjoyable experience – we identified numerous violations of the interface segregation principle as it was actually painful to add to the interface in question. With mocking frameworks this pain is often lessened due to the dynamic and often “magic” constructs they employ.

Personally I found code writting using this pattern easier to understand. The plan will be to adopt this approach for a month or so and see how it effects day to day development.

Our code looked pretty good at this point, though we were struggling to replace a conditional statement. After a few minutes the idea seemed obvious once we recieved a hint – polymorphism. This sparked a nice discussion about the “Anti If” campaign – another point I’m looking to take further. This iteration proved the most challenging for the whole team. A second run through allowed further progress.

### Iteration 5

The final round had us regroup with our original partners. Here we could use any approach and see how far we could progress. Me and my partner opted for a failing acceptance test, from here we would implement the functionality top down until we had the components wired together. This worked well until we struggled to test how the cells were stored without exposing any state needlessly. The solution came from some discussion around object calesethenics – first class collections.

One thing to note was how drastically different our code looked, when compared to the first iteration. During the course of the day we all noticed a difference in our overall approaches.
Conclusion

Overall I believe I speak for the whole team when I say how much we enjoyed the day. It was refreshing to spend a whole day coding, rather than being interuppted with other issues. Naturally this was quite tiring – though left lots energy for discussion afterwards. As a conclusion it would appear that as a collective we need to spend more time each week carrying out deliberate practice. For new starters this is essential training, while for more seasoned developers this is a useful way to keep our skillset up to date.