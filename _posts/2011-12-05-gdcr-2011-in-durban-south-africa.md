---
layout: post
author: Carlo
authorname: Carlo
title: GDCR 2011 in Durban, South Africa
preview: Our session was held in a training room that was perfect for the event; enough plug points, desks, a/c, projector, flip-chart, kitchen close-by etc which made things easier. Originally 16 people had registered; 2 had cancelled beforehand because of other commitments and 1 did not pitch, so we were left with 13 which was a good showing. We had 6 pairs with one pair consisting of three. 11 of the developers were C# developers, while 2 were using python. Most of the attendees were experienced developers, familiar with TDD and agile concepts, 2 had no idea it existed. We also had one attendant that was from the local university.
---
Our session was held in a training room that was perfect for the event; enough plug points, desks, a/c, projector, flip-chart, kitchen close-by etc which made things easier. Originally 16 people had registered; 2 had cancelled beforehand because of other commitments and 1 did not pitch, so we were left with 13 which was a good showing. We had 6 pairs with one pair consisting of three. 11 of the developers were C# developers, while 2 were using python. Most of the attendees were experienced developers, familiar with TDD and agile concepts, 2 had no idea it existed. We also had one attendant that was from the local university.

We started off the event with a Skype call to Kent Beck (9am for us but 11pm for him), which was great as Kent spoke about the painstaking process he followed to write the patterns in his book Smalltalk Best Practice Patterns. He also gave some advice, encouragement and fielded a few questions all the while showing his good sense of humour. The call was meant to be about 5-10 minutes long but ended being about 25 minutes. After that I introduced the structure of the day, the problem, goals etc. We were already running a little bit late and that combined with my nervousness meant that I probably didn't explain the 4 Rules of Simple Design and ease of change etc very well.

**_First session_** was used to become familiar with the requirements and keep in mind the 4 Rules of Simple Design while pairing.

I was a little worried during this first session as I was planning on having 5 sessions in total with each becoming relatively more advanced, but everyone seemed to be battling to get to grips on what approach to take. Regardless I walked around and noticed very different problem solving approaches. 

The 2 python attendees were both engineers and they were modeling everything on paper before committing to writing any code (this could have also been because they were not too familiar with python but C). 

Some pairs had tests that had big steps in between.

Another pair started writing acceptance tests that used a string representation which meant not only did they have to try get to grips with the GOL but also parsing the acceptance tests. This might be an interesting approach as the act of writing the acceptance and respective unit tests should have brought a modular set of concepts.

Most pairs went straight into using arrays to store cells while one pair decided to use a dictionary to store the cells which made storing the infinite grid problem more efficient.

Generally and, I guess as expected, most pairs did not make use of abstractions, had primitive obsession, poor naming, poor switching between pairs.

Deleting the code after the first session was not too much of an issue but again I was concerned if they were feeling very frustrated with the lack of progress they had made. Energy level was good though and everyone seemed happy.

_**Second session**_ had many constraints which may have diluted the learning experience a little but I thought that the constraints would complement each other. So the second sessions constraints were meant to highlight a more OO design by _eliminating primitives unless encapsulated, methods no longer than 4 lines, avoid conditionals and follow the 'Tell Don't Ask' principle_. I told them to try think of abstractions and to always think of how well their code and tests communicated their intent to the other pair.

After finding new pairs everyone jumped in and felt more confident. Most still seemed to struggle with removing primitives and conditionals. Some did not know the OO design principles that could remove these concepts while others did not know how to reconcile this with the time left to try make some decent headway into the problem. Most pairs were following a TFD or TDD approach. I became quite a bit more active in this session as I was worried they would be too frustrated with the lack of progress but generally tried to help with ensuring names were clear and expressive. Some pairs were asking a lot of questions on how best to approach the problem so I suggested to focus on one of the rules and try solve that in a TDD approach. Generally though pairs were jumping into the solution space without taking baby steps and then trying to get to agreement on the best approach. For some I suggested taking much smaller steps which would prove one of the rules and driving the design incrementally from there. 

A common issue I found was that the act of writing the test case was very difficult. Either the tests were too difficult to conceptualize without some production code to base the test on or the tests were not a full specification of what they were trying to solve. So as examples, for the first scenario pairs would start writing some of the test and then move into the solution/design phase before the test was complete. I felt that this made evaluating design decisions difficult and also knowing when to stop i.e. no red-to-green cycle. As an example of the second scenario pairs would write a test that would only partially satisfy the expected post-condition (test that the middle cell of 3 cells in a row would survive, but the test only checked the count and not _which_ actual cell should still be alive, which would have probably forced the notion of location). This would have the ripple effect of hampering the design portion of TDD and lead the solution into alley ways which could have been avoided. 

I let the session go on a little bit longer as the Thai food had arrived and I wanted the attendees to make more progress. We had a short retrospective where most mentioned how they found it difficult to get rid of the conditionals and limit the size of their methods, but were happy with their progress and learnings.

_**Lunch**_ was just over an hour long to try get us back onto schedule. There was tons of good thai food so everyone enjoyed themselves and got to know each other.

The _**third session's**_ constraints were focusing on _ping-pong programming and programming by wishful thinking_. I also asked everyone to focus on clean code, try follow red-green-refactor and listen to what their code/tests/partners were telling them.

This session is where everyone seemed to really start hitting their stride, possibly because the programming by wishful thinking proved to be a powerful tool in conceptualizing a top-down approach and the ping-pong programming created a fun factor to the session. As an example pairs were enjoying writing a test with the most wishful code they could thinking they would make the life of the implementor difficult. The implementor would do the simplest thing to make the test pass which often was just a few lines of code and not that difficult and then try make the other pair's life difficult with another wishful test. After this session almost all pairs had the concept of grid/board, cell/point and location aware abstraction. I'm not sure if the ideas were spreading because of the pairing or because of the top-down wishful programming approach.

In the retrospective attendees mentioned how much they enjoyed the fun factor of ping-pong and programming by wishful thinking approach.

For the _**last session**_ pairs were asked to pair with their original partners and decide on which constraints they were focusing on. I asked then to write it down so I could see their goal and what I could help facilitate as I came around. Most pairs worked on TDD ping pong programming and tried to get as far as they could with what they had learned through the different approaches.

We ended off with the closing circle where some attendees expressed how they hadn't really experience TDD. Others were quite surprised at the different implementations that came about using TDD. Overall the event went well, nice turnout, great bunch of developers and good food and coffee. 

Next time I wouldn't try be the host and facilitator as it was quite a lot of organisation beforehand but I learnt so much as being a facilitator. I realise that I need to improve my communication skills, how to engage everyone and to ask the right questions.

The attendees were great and open to new ideas and I'm so chuffed Africa could be represented!