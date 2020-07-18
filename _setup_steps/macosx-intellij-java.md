---
title: Setting up an empty project with a failing test case
resources:
  - type: shell
    command: git init .
    description: Initialize a new git repository in the current folder
---

<video 
  width="100%" 
  controls 
  class="my-2 drop-shadow-small" 
  preload="none"
  poster="{% link getting-started/guides/macosx-intellij-java.mp4.thumb.jpg %}"
  src="{% link getting-started/guides/macosx-intellij-java.mp4 %}"></video>
<span class="text-center d-block small">A screencast of setting up an empty Java Project in IntelliJ (9.8MB)</span>

Now we're ready to create our first failing testcase. Create a new folder somewhere (e.g. in your _Documents_ folder) and open that folder in _Visual Studio Code_ using \*Open folder...".

<img class="img-fluid" src="{% link getting-started/guides/macosx-intellij-java-green-tests.png %}"/>
<img class="img-fluid" src="{% link getting-started/guides/macosx-intellij-java-red-test.png %}"/>

`git` has a handy command, `git status`, that will tell you the current state of your project. You can run this any time without any consequence, just to check what `git` thinks has changed.

`git add .` will add all files in the folder (except for the ones in `.gitignore`) to the "stage". We can commit this stage to `git` by running `git commit -m "Add boilerplate with a failing testcase"`, where the string is the _commit message_ in which we describe what we changed.

🎉 Congrats, you just set up your project with a failing test-case and you're all set for the coderetreat!
