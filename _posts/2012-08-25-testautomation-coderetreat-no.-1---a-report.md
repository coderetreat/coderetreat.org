---
layout: post
author: Markus Gärtner
authorname: Markus Gärtner
title: Testautomation Coderetreat No. 1 - A report
preview: On a sunny Saturday in August 2012 we had the first testautomation coderetreat in Munich. Woohoo! This was a kickstart for this new coderetreat format - besides the original one from Corey Haines, and the Legacy Coderetreat format from J.B. Rainsberger. Here is my report from the facilitator's point of view and with some hints about what I am going to try at different other follow-up coderetreats.
---
On a sunny Saturday in August 2012 we had the first testautomation coderetreat in Munich. Woohoo! This was a kickstart for this new coderetreat format - besides the original one from Corey Haines, and the Legacy Coderetreat format from J.B. Rainsberger. Here is my report from the facilitator's point of view and with some hints about what I am going to try at different other follow-up coderetreats.

It was Saturday morning, we had an appointment with some buns, and I had a plan zero on what we were going to do. My colleague Meike Mertsch and I arrived at around 8:25 in the morning at our office in Munich, only to find the first of the participants already there. While preparing the office, we managed to get some coffee cooked, a sign outside for the remaining participants to find us, and arrange the room for the coderetreat. We were going to start at 9.

Then it happened! [No coffee today!](http://cultivatecode.blogspot.de/2012/08/no-coffee-today-report-of-munich-0812.html) While cooking coffee one of the participants broke the coffeemaker, and we didn't manage to get coffee for quite some time - it seemed. Then one of our colleague entered, and was able to help us out with the espresso machine long enough for the participants not to fall asleep due to lack of caffeine.

We started the first rough hour with introductions, expectation management, some general explanations on what the participants were going to expect. I had become a bit unsure while speaking with some folks from the [SoCraTes](http://www.socrates-conference.de/) conference about the plan. Plan zero consisted of six sessions automating tests on an acceptance test level for a web site. Nothing special, some business rules, and not too boring, I hoped. Well, one week earlier I had received mixed feedback about that plan. So I started suspicious, willing to switch plans whenever necessary.

It turned out that I didn't have to worry too much, although not all of the participants were familiar with test automation. We left the first round pretty open. Folks were able to automate one to two tests in the first 45 minutes overall. In the second round I introduced the different formats, Given/When/Then, table styles, and arrange-act-assert, and let the new pairs off for new frontiers. We actually had lots of people familiar with BDD and ATDD in the room, and others who were not as familiar. It was great to see that the folks with more knowledge jumped right in to help the people with less knowledge out. That was a great experience. So, in the second round people were able to automate some more tests in the given 45 minutes.

For the third session I had noticed rather long code fragments in the test automation code. So I put a constraint on the pairs: no methods and step definitions longer than five lines, and no else-conditional logic in the code. That worked quite well, despite that there were no else-conditionals in the code beforehand, so maybe I should drop that. After the third round it was time for lunch - pizza - and some wakening game.

In the fourth session we went for pairing. We had observed that people were sticky at the keyboard. We decided to change that with a keyboard change whenever three codelines had been touched (or written). That engaged people more, and I saw many more keyboard changes there. Although in the debriefing folks pointed out that this can be a burden while working with a new framework.

In the fifth session I asked for outside-in development style, and to replace the web application with an own implementation. I think that at least one pair managed to get one fifth of the functions ready, but I had to ask them to remove the code afterwards. In the sixth session we went for open season. One pair focused on automating the CI behind the system, but they didn't manage get the build steps automated in 45 minutes.

At the end of the day, I think all the attendees had fun, despite the variety of previous knowledge and experience. I will facilitate the next testautomation codetreat on August 25th in Bielefeld together with Martin Klose. Please [sign up](http://testauto-coderetreat-bielefeld-eorg.eventbrite.com/) if you have become interested.

([Original source](http://www.shino.de/2012/08/13/testautomation-coderetreat-no-1-a-report/))