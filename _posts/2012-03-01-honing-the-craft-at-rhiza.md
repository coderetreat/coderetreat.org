---
layout: post
author: Michael Higgins
authorname: Michael Higgins
title: Honing the Craft at Rhiza
preview: (Cross-posted from here.)
---
(Cross-posted from [here.](http://www.rhiza.com/2012/02/29/honing-the-craft/))

This past Saturday Rhiza hosted a Coderetreat for members of the Pittsburgh development community. [Coderetreat](http://coderetreat.org/) is a global organization dedicated to helping programmers become better programmers. It does this by helping local groups organize workshops - the code retreats - that let developers focus on key elements of the craft of programming without the day-to-day distractions of deadlines and bottom lines.

It's also a lot of fun, and a good way to meet other programmers!

Despite the fact that Saturday was one of the few unabashedly wintery days we've had all year, turnout was really strong. I think just about the whole slate of 25 signed up people showed up for the day (which starts at 8:30am - not necessarily a congenial hour for your average programmer).

The day is highly structured. We were led by the intrepid [Jim Hurne](http://coderetreat.org/profile/JimHurne) through a series of six 45 minute exercises. Each exercise is built around [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life), which I've had a soft spot for going back to my nerdy high school days.

Here's an animation of what the Game of Life can look like, from Wikipedia:

![](http://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif)

And here are some coders, hard at work implementing and testing it:

![](http://api.ning.com/files/vV8cG5JnfggkPAFJ9xrFLGzvKNAeS9Ec9u0ty8u1nT7qd0gjI*qeHqsUSvC4wu1uSz0PKYQHdj*O7a8fP4KLr21WU2xu1XN2/P2250160.jpg)

(There are more [nice photos](http://coderetreat.org/photo/albums/pittsburgh-coderetreat-2012-02-25) that Jim took of the code retreaters making the magic happen.)

One of the important things to grasp about Coderetreat, though, is that you're not there to build a working implementation of something. The goal is to work on the process - if you actually finish a working implementation, you are probably giving the process short shrift. In fact, after each 45 minute exercise, you delete all your code and start over.

This is painful. Most working programmers are deeply invested in making things, and the idea of tossing out code that you've worked hard on, only to start all over is hard. But once you've done it a couple of times, it becomes a little easier.

Now, I have to admit, one of my partnerships did perform the dubious feat of finishing a minimal implementation. I'll share the implementation here because it's cute (and short!).

Warning: this blog post is about to get technical and nerdy. ([Take me to a cute picture of dogs instead!](http://dogs.icanhascheezburger.com/2009/06/02/funny-dog-pictures-sub-woofers/))

One of the exercises revolved around designing the implementation in a "functional" rather than a traditional imperative or object-oriented style. Functional programming is actually one of the earliest programming styles, going back to the Lambda calculus that Alonzo Church developed back in the 1930s (before "computer science" was really a discipline - Church was a logician and interested in the formal foundations of mathematics). However, it is still very important today. "Functional" programs avoid explicit mutable state and "side effects"; instead, every operation is expressed as the evaluation of a function, and programs are expressed as compositions of those functions.

The lack of explicit state and side-effects makes functional programs a lot easier to reason about, so they tend to have fewer bugs. It is also often much easier to execute them in parallel, so high performance systems are easier to write. Functional programming languages are also often very "expressive" - meaning you can write short, clear programs easily. As programs get bigger and more complex and bug-prone, and computers tend to get performance from parallelism rather than from faster clock speeds, it's likely that functional techniques will get even more important.

(There are downsides too: side effects are hard to avoid in most real-world programs, and some algorithms and data structures are hard to implement efficiently without explicit mutable state. Fortunately, you can often mix functional ideas with imperative ideas effectively. The code I'm about to show is very much a mutt in that way.)

At Rhiza we use Python and Javascript for a lot of our development. Both of these languages are imperative, object-oriented languages, but they both have "functional features" like first-class functions. (In fact, if you don't know how to use [closures](http://en.wikipedia.org/wiki/Closure_(computer_science)) effectively, you aren't going to get very far programming non-trivial applications in Javascript.)

Jim had sent out email to all the attendees before the retreat that the exercises would revolve around the Game of Life. I happen to have been spending some time learning NumPy recently, a very nice numerical programming library for Python. It's good at implementing linear algebra and scientific computing problems (optimization, curve fitting, data analysis, machine learning, etc.) Anyway, these two things had collided in my head in the shower, and I kept thinking that there ought to be a good way of expressing the Game of Life in terms of operations on matrices, which are efficient to use in NumPy.

There is!

It helps to start out by thinking of a functional decomposition of the Game of Life. You can imagine the Game of Life as a big two-dimensional array of cells that are either on or off, 1 or 0. Then the game undergoes a "step" and the board evolves to a new state based on a few simple rules:

1\. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2\. Any live cell with two or three live neighbors lives on to the next generation.
3\. Any live cell with more than three live neighbors dies, as if by overcrowding.
4\. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

But before we get to implementing the rules, just think of the evolution of the system as looking like this:


step(X) -> X'

That is, you call the step function on your matrix of cells, and it yields a new array of cells that represent the next generation. But now we need to break the step function down further. If you look at the rules, each rule depends on two pieces of information: the state of the current cell, and the number of live neighbors it has.

So you probably need a function like this:


neighbor_count(cell) -> integer

and a function like this:


state(cell) -> 1 or 0

If you had those, you could write a "decide" function that took those two pieces of information and implemented the rules above. I'm going to switch to Python here, and show some real code:


def decide(state, neighbor_count):
    if state == 1:
        return 1 if neighbor_count in (2, 3) else 0
    else:
        return 1 if neighbor_count == 3 else 0

And that's the heart of the Game of the Life!

Now, it turns out that if you use a NumPy array to represent your matrix of cells, you don't really need an explicit "state" function. You can just look up the index of the cell you are interested in and the value in the array is the state.

So that's great and all, but you still need a way to calculate your neighbor count, and you need a way to evaluate your "decide" function for each cell in the array.

For the second part NumPy can help us. It has a neat trick built in called "vectorization". Just change the code above to read:


@numpy.vectorize
def decide(state, neighbor_count):
    if state == 1:
        return 1 if neighbor_count in (2, 3) else 0
    else:
        return 1 if neighbor_count == 3 else 0

What does that "@numpy.vectorize" do? It means that instead of needing to call "decide" individually on each state and neighbor\_count for each cell in the matrix, we can call "decide" on a matrix of states and a matrix of neighbor\_counts, and it will yield a new matrix. NumPy takes care of the details of iterating over the two matrices and assembling all the results into a new matrix. (It's also much more efficient than writing nested for loops by hand.)

So you could write "step" like this:


def step(X):
    return decide(X, neighbor_count(X))

Which is exactly what we want to do!

But we still have a crucial missing piece. We don't have a neighbor_count function at all, much less one that can operate on a matrix. But we can take advantage of some representational cleverness here.

X is a two-dimensional array of binary numbers: every cell is either 0 or 1. In signal processing, there is a concept called convolution. I'm not going to go into a lot of detail about what a convolution is, but here's a [nice simple example](http://www.songho.ca/dsp/convolution/convolution2d_example.html). If you've ever used Photoshop and applied one of the edge detection filters, or a Gaussian blur, you've used a convolution.

The cool thing is, on a binary matrix, there is a simple convolution kernel that exactly corresponds to "count my live neighbors". It looks like this:


kernel = numpy.array(\[ \[1, 1, 1\],
                       \[1, 0, 1\],
                       \[1, 1, 1\] \])

Now, with a little help from the NumPy and SciPy libraries, we can write our neighbor count function:


kernel = numpy.array(\[ \[1,1,1\],
                       \[1,0,1\],
                       \[1,1,1\] \])
def neighbor_count(X):
    return convolve2d(X, kernel, mode='same', boundary='wrap')

(Tragically for my place in human history, I'm not the first person to have thought of this trick. If you Google ["convolution game of life"](http://www.google.com/search?q=convolution+game+of+life) you'll discover several similar implementations, some with interesting extra cleverness.)

To put it all together, along with an example of the famous [Glider pattern](http://en.wikipedia.org/wiki/Glider_(Conway's_Life)).


import time
import numpy
from scipy.signal import convolve2d
kernel = numpy.array(\[ \[1,1,1\],
                       \[1,0,1\],
                       \[1,1,1\] \])
def neighbor_count(X):
    return convolve2d(X, kernel, mode='same', boundary='wrap')
@numpy.vectorize
def decide(state, neighbor_count):
    if state == 1:
        return 1 if neighbor_count in (2, 3) else 0
    else:
        return 1 if neighbor_count == 3 else 0
def step(X):
    return decide(X, neighbor_count(X))
def display(X):
    print X
    print '----'
    print
def glider():
    X = numpy.zeros((10,10))
    X\[1\]\[2\] = 1
    X\[2\]\[3\] = 1
    X\[3\]\[1\] = 1
    X\[3\]\[2\] = 1
    X\[3\]\[3\] = 1
while True:
        X = step(X)
        display(X)
        time.sleep(1)
return
if \_\_name\_\_ == '\_\_main\_\_':
    glider()

There's actually a way to write the "decide" function by indexing into arrays, which makes the code a bit more dense, but a little less clear. Clarity (or revealing your intent) is one of the code retreat virtues! And for you code retreaters out there: yes, we wrote unit tests ;-)