---
title: Installing git, a version control system
resources:
  - type: url
    url: https://git-scm.com/download/win
    description: Download link for Git for Windows including Git Bash
  - type: url
    url: https://desktop.github.com/
    description: "Optional: A convenient UI for Git provided by GitHub"
  - type: shell
    command: git --global config user.name "YOUR NAME"
    description: Command to set your user name in git
  - type: shell
    command: git --global config user.email "YOUR-EMAIL@ADDRESS.ORG"
    description: Command to set your email in git
video:
  - poster: /getting-started/guides/windows-git.mp4.thumb.jpg
    src: /getting-started/guides/windows-git.mp4
    description: A screencast of setting up git on Windows (1.2MB)
  - poster: /getting-started/guides/windows-git-setup-user.mp4.thumb.jpg
    src: /getting-started/guides/windows-git-setup-user.mp4
    description: A screencast of configuring git on Windows (1.2MB)
---

`git` is a version control system, that means it is used to archive and share files in a way that makes it easy for collaborators to work in their changes. It is similar to _Dropbox_ or _Google Drive_, but it's not realtime/instant, as they are. 

Instead, it records only the changes you did (e.g. removing a line, changing a word etc.) locally. When you're ready, you can _pull_ the latest version from a remote repository (a lot of which are hosted on _GitHub_ or _GitLab_). Git will try to work in your changes into whatever happened remotely. If everything went smoothly, you can _push_ your changes back up. If not, you have to resolve a _merge-conflict_.

We recommend using `git` for a couple of reasons: There are some sessions which need `git`, so you can roll-back your changes quickly. But it also comes handy when setting up your local development environment! We will use it later to clone `kata-bootstraps`, a public repository that contains a lot of different starter projects for a variety of languages. And we will of course put your empty starter project under version control, too!

It also comes with _Git Bash_, a terminal application that works a bit better with commandline tools that are made for Linux, such as `node`, `mvn` or `git` itself. If you've picked a language where we recommend _Visual Studio Code_, we'll get back to this later as we integrate it into your editor!

To install `git`, visit the link in the _TLDR_ section. If in doubt, get the **64bit** version. You can also install _GitHub Desktop_ if you'd like to have a more visual way of using `git`. Despite the name, it can be used with any `git` repository, not just those hosted on _GitHub_.

To verify that everything is working, open _Git Bash_ and type `git --version`, which should look something like this:

<img class="img-fluid drop-shadow-small" src="{% link getting-started/guides/windows-git-version.png %}">

We are almost done here. As `git` is designed for teams that work on the same project, it needs your _name_ and your _email address_. This will be public information for anyone who's looking at your projects and you can choose whatever yu want here.

In the _Git Bash_ terminal, type:

```
git --global config user.name "YOUR NAME"
git --global config user.email "YOUR-EMAIL@ADDRESS.ORG"
```

