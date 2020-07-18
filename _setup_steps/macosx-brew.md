---
title: Installing brew, a system package manager
resources:
  - type: url
    url: https://brew.sh/
    description: Homepage with one-line installer for brew
---

<video 
  width="100%" 
  controls 
  class="my-2 drop-shadow-small" 
  preload="none"
  poster="{% link getting-started/guides/macosx-brew.mp4.thumb.jpg %}"
  src="{% link getting-started/guides/macosx-brew.mp4 %}"></video>
<span class="text-center d-block small">A screencast of installing brew (4.9MB)</span>

We will start with installing _brew_, a system package manager for Mac OS X. A system package manager allows you to download and update applications. Think of it like the _AppStore_, just without a UI.

<div class="advice" markdown="1">
We're pasting shell commands from a website. Make sure that you double-check the website and the URL in the command to make sure it is sound. This way of installing things off the internet is significantly more dangerous than the usual installation process.

To reassure you: _Homebrew_ is used by most developers who are working on a Mac, and the repository is considered well maintained and secured against malicious actors.

</div>

On [brew.sh](https://brew.sh), you find the command to download and run the installer. Select all of it and copy it to your clipboard. Use the _Spotlight_ hotkey (`Cmd + Space`) and type `terminal` to open the Mac Terminal application.
