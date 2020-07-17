---
title: Installing git, a version control system
resources:
  - type: url
    url: https://git-scm.com/download/win
    description: Download link for Git for Windows including Git Bash
  - type: url
    url: https://desktop.github.com/
    description: "Optional: A convenient UI for Git provided by GitHub"
---
<video width="100%" controls class="my-2 drop-shadow" src="{% link getting-started/guides/windows-git.mp4 %}"></video>

`git` is a version control system, that means it is used to archive and share files in a way that makes it easy for collaborators to work in their changes. It is similar to *Dropbox* or *Google Drive*, but it's not real-time as they are. Instead, it records only the changes you did (e.g. removing a line, changing a word etc.) locally. When you're ready, you can *pull* the latest version from a remote repository (a lot of which are hosted on *GitHub* or *GitLab*). Git will try to work in your changes into whatever happened remotely. If everything went smoothly, you can *push* your changes back up. If not, you have to resolve a *merge-conflict*.

We recommend using `git` for a couple of reasons: There are some sessions which need `git`, so you can roll-back your changes quickly. But it also comes handy when setting up your local development environment! We will use it later to clone `kata-bootstraps`, a public repository that contains a lot of different starter projects for a variety of languages. And we will of course put your empty starter project under version control, too!

It also comes with *Git Bash*, a terminal application that works a bit better with commandline tools that are made for Linux, such as `node`, `mvn` or `git` itself. If you've picked a language where we recommend *Visual Studio Code*, we'll get back to this later as we integrate it into your editor!

To install `git`, visit the link in the *TLDR* section. If in doubt, get the **64bit** version. You can also install *GitHub Desktop* if you'd like to have a more visual way of using `git`. Despite the name, it can be used with any `git` repository, not just those hosted on *GitHub*.

To verify that everything is working, open *Git Bash* and type `git --version`, which should look something like this:

<img class="img-fluid drop-shadow-small" src="{% link getting-started/guides/windows-git-version.png %}">

We are almost done here. As `git` is designed for teams that work on the same project, it needs your *name* and your *email address*. This will be public information for anyone who's looking at your projects and you can choose whatever yu want here.

In the *Git Bash* terminal, type:

```
git --global config user.name "YOUR NAME"
git --global config user.email "YOUR-EMAIL@ADDRESS.ORG"
```

<video width="100%" controls class="my-2 drop-shadow" src="{% link getting-started/guides/windows-git-setup-user.mp4 %}"></video>
