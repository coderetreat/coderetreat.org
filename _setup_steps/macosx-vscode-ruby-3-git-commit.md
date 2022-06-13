---
title: Committing the project to git
resources:
  - type: shell
    command: git init .
    description: Initialize a git repository in the current working directory
  - type: shell
    command: git status
    description: Show changes that can be committed to git
  - type: shell
    command: git add .
    description: Add all files in the current folder to the commit stage
  - type: shell
    command: git commit -m "MESSAGE"
    description: Commit all staged files to git with the commit message MESSAGE
video:
  poster: /getting-started/guides/macosx-vscode-ruby-3-git-commit.mp4.thumb.jpg
  src: /getting-started/guides/macosx-vscode-ruby-3-git-commit.mp4
  description: A screencast of committing the project to git (0.4MB)
---

Now that we have the project in a good shape, it's time to add it to `git`. Open a new terminal and `cd` to the project folder. Run `git init .` to initialize a new repository in the folder we're developing our application in.

```shell
$ git init
Initialized empty Git repository in /tmp/coderetreat/.git/
```

`git` has a handy command, `git status`, that will tell you the current state of your project. You can run this any time without any consequence, just to check what `git` thinks has changed.

Now `git add .` will add all files in the folder to the "stage". We can commit this stage to `git` by running `git commit -m "Add boilerplate with a failing testcase"`, where the string is the _commit message_ in which we describe what we changed.

🎉 Congrats, you just set up your project with a failing test-case and you're all set for the coderetreat!
