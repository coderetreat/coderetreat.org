---
title: Installing git, a version control system
resources:
  - type: shell
    command: brew install git
    description: Command to install git using brew
---
<video width="100%" controls class="my-2 drop-shadow-small" src="{% link getting-started/guides/macosx-git.mp4 %}"></video>

`git` is a version control system, that means it is used to archive and share files in a way that makes it easy for collaborators to work in their changes. It is similar to *Dropbox* or *Google Drive*, but it's not real-time as they are. Instead, it records only the changes you did (e.g. removing a line, changing a word etc.) locally. When you're ready, you can *pull* the latest version from a remote repository (a lot of which are hosted on *GitHub* or *GitLab*). Git will try to work in your changes into whatever happened remotely. If everything went smoothly, you can *push* your changes back up. If not, you have to resolve a *merge-conflict*.

We recommend using `git` for a couple of reasons: There are some sessions which need `git`, so you can roll-back your changes quickly. But it also comes handy when setting up your local development environment! We will use it later to clone `kata-bootstraps`, a public repository that contains a lot of different starter projects for a variety of languages. And we will of course put your empty starter project under version control, too!

To verify that everything is working, open a terminal and type `git --version`, which should look something like this:

```sh
coderetreat@MacBook-Pro ~ % git --version
git version 2.24.3 (Apple Git-128)
```

We are almost done here. As `git` is designed for teams that work on the same project, it needs your *name* and your *email address*. This will be public information for anyone who's looking at your projects and you can choose whatever yu want here.

In the terminal, type:

```
git --global config user.name "YOUR NAME"
git --global config user.email "YOUR-EMAIL@ADDRESS.ORG"
```

You're all set!