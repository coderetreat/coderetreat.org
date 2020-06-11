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
