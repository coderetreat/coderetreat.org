---
title: Installing Ruby
resources:
  - type: shell
    command: brew install ruby
    description: Install command for ruby
---

<video 
  width="100%" 
  controls 
  class="my-2 drop-shadow-small" 
  preload="none"
  poster="{% link getting-started/guides/macosx-ruby.mp4.thumb.jpg %}"
  src="{% link getting-started/guides/macosx-ruby.mp4 %}"></video>
<span class="text-center d-block small">A screencast of installing Ruby (5.4MB)</span>

We will continue by installing a recent version of *Ruby* using *brew*. Open a Terminal (again, `Cmd+Space`, type in `terminal`, press `Enter`) and run `brew install ruby`.

The installation will print a command that you need to run manually in case you'd like the ruby version we just installed to be the one that is used when you type `ruby` in your Terminal. This can have negative consequences with other applications that use the ruby version your Mac ships with. If you choose not to do this, prefix all calls to `ruby`, `bundler`/`bundle` and `gem` in the following steps with the correct path (in our case, this was `/usr/local/opt/ruby/bin/`, so e.g. `/usr/local/opt/ruby/bin/gem install bundler`).

We will try out our new *Ruby* version by first verifying that `ruby -v` returns the ruby version we just installed, followed by `gem install bundler`, which will install the package manager we will use for our project.