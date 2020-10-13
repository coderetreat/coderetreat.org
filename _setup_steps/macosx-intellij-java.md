---
title: Setting up an empty project with a failing test case
resources:
  - type: shell
    command: git init .
    description: Initialize a new git repository in the current folder
video:
  poster: /getting-started/guides/macosx-intellij-java.mp4.thumb.jpg
  src: /getting-started/guides/macosx-intellij-java.mp4
  description: A screencast of setting up an empty Java Project in IntelliJ (9.8MB)
---

Now we're getting to the most important part: Setting up an empty project! Start _IntelliJ_, it should be in your _Applications_ folder. The setup wizard will start, the defaults are okay and you can just proceed by clicking _Next_.

When prompted, select _Create new project_ to launch the project creation wizard and select _Maven_. _Maven_ is a popular package manager for _Java_, and it has a well structured and well supported project setup.

### Downloading a JDK

The first thing you need is to download a JDK (**J**ava **D**evelopment **K**it). This is required to compile **Java** applications. _IntelliJ_ takes care of that for you, just select _Download SDK_ in the select box that right now either says _&lt;No SDK&gt;_ or the default for your system.

We want to install the latest available _Oracle OpenJDK_, which at the time of writing this article was `14.0.2`. _Java_ strives to be very compatible, so a newer version shouldn't create any problems. Click on _Download_ and wait for the JDK to be installed.

### Scaffolding a project from a maven archetype

Next, enable picking a _maven archetype_ by checking the _Create from archetype_ checkbox. From the huge list that _IntelliJ_ presents us with, we want `org.apache.maven.archetypes:maven-archetype-quickstart\*. This is an archetype that comes only with the bare minimum to compile a java project, which is exactly what we want!

<div class="advice" markdown="1">
This maven archetype will also install `junit`, but an old version (version 4). We will add the new junit (version 5) later and remove the old version from the dependency declaration before committing.
</div>

In the next wizard step, enter the name of the project, the location is usually fine as it is. Proceed with _Next_ to see the summary, which we again can just skip over. Press _Finish_ and IntelliJ will install all necessary dependencies and launch into the main IDE.

### Creating a first test case

The archetype will create two files that we will delete right away, `src/main/java/org/example/App.java` and `src/test/java/org/example/AppTest.java`. We will replace those stubs with our own example.

Right click onto the `org.example` package and select _New -> Java Class_. Enter `HelloWorld` as the class name and confirm by pressing enter.

We will start with a green test case to make sure that compilation and test execution works as designed. Create a method in `HelloWorld` as such:

```java
package org.example;

public class HelloWorld {

  public String say() {
    return "Hello World";
  }

}
```

Select the class name (`HelloWorld`) and press `Cmd+Shift+T` to bring up the "Jump to Test Class" popup. As we don't have a test yet, it will offer to "Create New Test...". This will bring up the "Create Test" dialog, where we select "JUnit 5" as the test library. As we don't have it listed as a dependency yet, IntelliJ will offer to "fix" this for us. Click on the button so JUnit 5 is added to our dependencies. Proceed with _Ok_.

<div class="advice" markdown="1">
If IntelliJ fails to show the "Create Test" popup, you can create the file manually. Navigate to `src/test/java/org/example/` and create a new file `HelloWorldTest.java`. Copy the content from the listing below.

You will also need to add the dependency to JUnit 5 yourself, by adding another `<dependency>`-block to the `pom.xml`, right after the old one for JUnit 4 (which we will delete later):

```xml
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter</artifactId>
  <version>RELEASE</version>
  <scope>test</scope>
</dependency>
```

</div>

Paste the following content into the file:

```java
package org.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertion.*;

class HelloWorldTest {
  @Test
  public void saysHelloWorld() {
    assertEquals("Hello World", new HelloWorld().say());
  }
}
```

We import several functions and annotations from `junit`, namely the `@Test` annotation, which tells JUnit that this method describes a test case, and the `assertEquals` assertion, which is used to compare an expected value to the actual value.

The test method itself simply creates a new `HelloWorld` instance and calls `say()` on it, which we expected to return `Hello World`, as denoted by the first argument we provide to `assertEquals`.

Run this test by pressing either `Shift+F10` or by clicking on the green arrow next to the method/class and selecting "Run test".

<img class="img-fluid" src="{% link getting-started/guides/macosx-intellij-java-green-test.png %}"/>

### Creating a failing test case

Now that we have a passing test, let's create a failing test to make sure that everything is working correctly.

Create a second test (you can copy the first method to start) that expects `say()` to return `"Goodbye World"`.

```java
package org.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertion.*;

class HelloWorldTest {
  @Test
  public void saysHelloWorld() {
    assertEquals("Hello World", new HelloWorld().say());
  }

  @Test
  public void saysGoodbyeWorld() {
    assertEquals("Goodbye World", new HelloWorld().say());
  }
}
```

Running the tests again should show a passing ("green") test, `saysHelloWorld`, and a failing ("red") test, `saysGoodbyeWorld`. Good job!

<img class="img-fluid" src="{% link getting-started/guides/macosx-intellij-java-red-tests.png %}"/>

### Cleaning up the `pom.xml`

Before we commit our project to `git`, let's clean up the `pom.xml` first. This file is used by _maven_ to keep track of our dependencies. We added JUnit 5 earlier (either manually or through IntelliJ), but we didn't remove JUnit 4, which the archetype installed for us.

Open the `pom.xml` and find the `<dependency>`-block for junit4. Delete it.

```xml
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>4.11</version>
  <scope>test</scope>
</dependency>
```

We changed something, so make sure to run the tests before committing. They should still be green, so we got rid of something we didn't actually use!

### Committing to git

Now that we have the project in a good shape, it's time to add it to `git`. Open a new terminal and `cd` to the project folder. Run `git init .` to initialize a new repository in the folder we're developing our application in.

```shell
$ git init
Initialized empty Git repository in /tmp/coderetreat/.git/
```

`git` has a handy command, `git status`, that will tell you the current state of your project. You can run this any time without any consequence, just to check what `git` thinks has changed.

`git status` will show a lot of files we haven't yet added to version control. Some of those, in particular the `target/` and the `.idea/` folder, should not be committed though. Create a file `.gitignore` (mind the dot at the start) in the project folder and fill it with

```
target/
.idea/
```

This will make `git` ignore files in these folders. `git add .` will add all files in the folder (except for the ones in `.gitignore`) to the "stage". We can commit this stage to `git` by running `git commit -m "Add boilerplate with a failing testcase"`, where the string is the _commit message_ in which we describe what we changed.

🎉 Congrats, you just set up your project with a failing test-case and you're all set for the coderetreat!
