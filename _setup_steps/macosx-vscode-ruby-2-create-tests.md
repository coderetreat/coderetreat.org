---
title: Creating the tests
---

<video 
  width="100%" 
  controls 
  class="my-2 drop-shadow-small" 
  preload="none"
  poster="{% link getting-started/guides/macosx-vscode-ruby-2-create-tests.mp4.thumb.jpg %}"
  src="{% link getting-started/guides/macosx-vscode-ruby-2-create-tests.mp4 %}"></video>
<span class="text-center d-block small">A screencast of creating the tests in Ruby (1.2MB)</span>

It is time to create our first test to see if *RSpec* is installed correctly. Create a file `spec/hello_world_spec.rb` with the following content:

```ruby
describe HelloWorld do

end
```

Running the tests via `bundle exec rspec` should report that `HelloWorld` is undefined. We can fix that by creating `lib/hello_world.rb` with an empty class declaration as such:

```ruby
class HelloWorld

end
```

You need to require this class in `spec/hello_world_spec.rb`. Change the spec accordingly:

```ruby
require "hello_world"

describe HelloWorld do

end
```

Running `bundle exec rspec` should now pass, as we haven't defined any test yet! Let's write our first test:

```ruby
require "hello_world"

describe HelloWorld do
  it "says Hello World" do
    expect(HelloWorld.say()).to eq("Hello World")
  end
end
```

Run the test again, it should now report a missing method `say()` on `HelloWorld`. Let's make the test pass ("green"):

```ruby
class HelloWorld
  def self.say()
    "Hello World"
  end
end
```

The test should pass now. Let's add a failing test to make sure that both a failing test and a successful test are being reported:

```ruby
require "hello_world"

describe HelloWorld do
  it "says Hello World" do
    expect(HelloWorld.say()).to eq("Hello World")
  end

  it "says Goodbye World" do
    expect(HelloWorld.say()).to eq("Goodbye World")
  end
end
```

Running `bundle exec rspec` should now report a failing ("red"), and a passing ("green") test.

Congrats, we have a boilerplate we can work with on the coderetreat!