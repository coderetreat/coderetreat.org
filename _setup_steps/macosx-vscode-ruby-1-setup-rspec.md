---
title: Setting up RSpec
resources:
  - type: shell
    command: bundle install
    description: Installs all dependencies as listed in the Gemfile
  - type: shell
    command: bundle exec rspec
    description: Command to run rspec after installing it
  - type: shell
    command: bundle init
    description: Alternative command to create an initial Gemfile.
video:
  poster: /getting-started/guides/macosx-vscode-ruby-1-setup-rspec.mp4.thumb.jpg
  src: /getting-started/guides/macosx-vscode-ruby-1-setup-rspec.mp4
  description: A screencast of installing RSpec (0.5MB)
---

We'll continue with installing *RSpec*, a testrunner that is provided as a *Ruby Gem* (that's what third-party libraries are called in Ruby).

Create a new folder `coderetreat-ruby` and open it in VisualStudio Code. Create a new file, `Gemfile` in the root and paste the following content:

```
source "https://rubygems.org"

gem "rspec"
```

Launch a terminal in VisualStudio Code and execute `bundle install`. This will install *RSpec* and create a `Gemfile.lock`, in which the exact version that *bundler* downloaded is kept. 

Let's see if *RSpec* is installed correctly:  
Running `bundle exec rspec` should report "No examples found.".

<div class="advice" markdown="1">
If you have any trouble running `bundle install`, make sure that Ruby in your Terminal in VisualStudio Code is the version you've installed previously via *brew*.

Mac comes with a version of ruby preinstalled, but we want to make sure you're running a more recent version. Check the installation guide on top and make sure that your `$PATH` is correctly modified to give precedence to our more recent version. `ruby -v` will tell you if you're on the right track!
</div>
