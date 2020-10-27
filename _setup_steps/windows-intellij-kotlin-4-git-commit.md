---
title: Committing the boilerplate
video:
  poster: /getting-started/guides/windows-intellij-kotlin-4-git-commit.mp4.thumb.jpg
  src: /getting-started/guides/windows-intellij-kotlin-4-git-commit.mp4
  description: "A screencast of initializing the repo and committing to git (0.9MB)"
---

Now that we have the project in a good shape, it's time to add it to `git`. Open a new terminal and `cd` to the project folder. Run `git init .` to initialize a new repository in the folder we're developing our application in.

```shell
$ git init
Initialized empty Git repository in /tmp/coderetreat/.git/
```

`git` has a handy command, `git status`, that will tell you the current state of your project. You can run this any time without any consequence, just to check what `git` thinks has changed.

`git status` will show a lot of files we haven't yet added to version control. Some of those, in particular the `build/`, `.gradle/` and the `.idea/` folder, should not be committed though. Create a file `.gitignore` (mind the dot at the start) in the project folder and fill it with

```
build/
.gradle/
.idea/
```

This will make `git` ignore files in these folders. `git add .` will add all files in the folder (except for the ones in `.gitignore`) to the "stage". We can commit this stage to `git` by running `git commit -m "Add boilerplate with a failing testcase"`, where the string is the _commit message_ in which we describe what we changed.

🎉 Congrats, you just set up your project with a failing test-case and you're all set for the coderetreat!
