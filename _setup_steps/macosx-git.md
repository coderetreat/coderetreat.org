---
title: Installing git, a version control system
resources:
  - type: shell
    command: brew install git
    description: Command to install git using brew
  - type: shell
    command: git --global config user.name "YOUR NAME"
    description: Command to set your user name in git
  - type: shell
    command: git --global config user.email "YOUR-EMAIL@ADDRESS.ORG"
    description: Command to set your email in git
video:
  poster: /getting-started/guides/macosx-git.mp4.thumb.jpg
  src: /getting-started/guides/macosx-git.mp4
  description: A screencast of installing git (2.7MB)
---

`git` is a version control system, that means it is used to archive and share files in a way that makes it easy for collaborators to work in their changes. It is similar to _Dropbox_ or _Google Drive_, but it's not real-time as they are. Instead, it records only the changes you did (e.g. removing a line, changing a word etc.) locally. When you're ready, you can _pull_ the latest version from a remote repository (a lot of which are hosted on _GitHub_ or _GitLab_). Git will try to work in your changes into whatever happened remotely. If everything went smoothly, you can _push_ your changes back up. If not, you have to resolve a _merge-conflict_.

We recommend using _git_ for a couple of reasons: There are some sessions which need `git`, so you can roll-back your changes quickly. But it also comes handy when setting up your local development environment! We will use it later to clone `kata-bootstraps`, a public repository that contains a lot of different starter projects for a variety of languages. And we will of course put your empty starter project under version control, too!

To install _git_, open a Terminal (`Cmd+Space`, type `terminal`, press `Enter`) and run `brew install git`. _brew_ should automatically install git on your machine.

To verify that everything is working, open a terminal and type `git --version`, which should look something like this:

```sh
coderetreat@MacBook-Pro ~ % git --version
git version 2.24.3 (Apple Git-128)
```

We are almost done here. As `git` is designed for teams that work on the same project, it needs your _name_ and your _email address_. This will be public information for anyone who's looking at your projects and you can choose whatever yu want here.

In the terminal, type:

```
git --global config user.name "YOUR NAME"
git --global config user.email "YOUR-EMAIL@ADDRESS.ORG"
```

You're all set!
