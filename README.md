# Coderetreat.org

## Install

You need Ruby 2.6.2, Bundler 2.0.1 and Node lts/erbium installed. Check `.ruby-version` and `.nvmrc` for the exact version.

```sh
$ bundle install
$ npm install
$ npm start
```

### Error running `bundle exec jekyll serve` or `npm start` on Windows

There's a pending bug when you run `bundle install` on a Windows machine where `bundler` picks `eventmachine-1.2.7-x64-mingw` instead of `eventmachine-1.2.7-ruby`. This causes an error once you start using `jekyll`.

To get around it, uninstall `eventmachine` and reinstall it with the platform set to `ruby`:

```sh
$ gem uninstall eventmachine --force
$ gem install eventmachine --platform ruby
```

See [this issue](https://github.com/eventmachine/eventmachine/issues/820#issuecomment-457387959) for more information.


## Contribute

Audiences:
* Participants - attend an event not involved in organization (Occasion-driven:) 
    * New participant (word of mouth promotion to visit site)
        * What is it?
        * When is it?
        * Why bother?
        * How can I ...?
    * Referring link from individual event (deep link)
        * getting started/what is
        * basic information on content
        * refresh concepts
        * info on specific constraints that will be used
        * the subsequent preparations that participants need to do upfront. (e.g. TCR or steeple-chase)
    * Recurring participant ()
        * try new things (constraints?)
        * find another community to participate in (idea exchange)
        * conversion to becoming a facilitator / host
* Facilitators - responsible for the content of the event
    * First time facilitators
        * [IMPORTANT] how-to step-by-step guide for events creation
        * training sessions 
    * Veteran facilitators
        * constraints collection
        * conversion to becoming a trainer
    * Common 
        * [IMPORTANT] Register an event
        * Marketing materials
        * Event materials (Game of Life signs, coding concepts, etc)
        * guidelines
        * tactics
        * pitfalls
        * articles / blogs / podcasts
        * networking
        
* Hosts - Third party who is responsible for the setup, infrastructure (location, food, etc)
    * [IMPORTANT] how-to step-by-step guide for events 
    * training sessions
    
Not everyone is in distinct roles: Some are running the whole show, for the first time!

 


