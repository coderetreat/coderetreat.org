---
title: Setting up an empty project with a failing test case
resources:
  - type: shell
    command: git init .
    description: Initialize a new git repository in the current folder
  - type: shell
    command: npm init
    description: Initialize a new npm project in the current folder
  - type: shell
    command: npm install --save-dev jest
    description: Download "jest" and save it as a development dependency
video:
  poster: /getting-started/guides/windows-vscode-node-empty-project.mp4.thumb.jpg
  src: /getting-started/guides/windows-vscode-node-empty-project.mp4
  description: A screencast of setting up an empty project in JavaScript on Windows (6.4MB)
---

Now we're ready to create our first failing testcase. Create a new folder somewhere (e.g. in your *Documents* folder) and open that folder in *Visual Studio Code* using *Open folder...". 

### Setting the correct shell

Select *Terminal -> New Terminal*. By default, *VisualStudio Code* will start a *PowerShell*, but we installed *Git Bash* in a previous step, which is a superior shell if you want to work with `git` and other linux-related tools.

Open the dropdown in the bottom-right that says "1: powershell" and click on "Select Default Shell". A Pop-up will give you the option to use *Git Bash*. Close the *PowerShell* terminal and start a new terminal. You should be presented with a *Git Bash* shell (as indicated by the select saying "1: bash").

### Initialize a new npm project

Next, we will initialize a `npm`-project by running `npm init` in the terminal session. Type `npm init` and proceed through the wizard. Enter will use a default value, which is alright for all prompts **except for the test command**, which we want to set up to be `jest`.

```bash
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (coderetreat) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to package.json:

{
  "name": "coderetreat",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) 
```

This will create a new `package.json`, which contains meta information about your project, but also the dependencies it requires. Let's fill that!

<div class="advice" markdown="1">
If running `npm init` fails with "bash: npm: command not found", try restarting *VisualStudio Code*. This can happen if *Node* didn't get a chance to update the `$PATH` variable before you started *VisualStudio Code*.
</div>


### Adding jest as a dependency

`jest` is a popular test-runner for JavaScript/NodeJs. It scans your project for files with `.test.` in the name (such as `index.test.js`) or any file in a `__tests__` folder and runs the tests they contain.

To install it, type `npm install --save-dev jest`. This will save `jest` as a development dependency in your `package.json`. `jest` has a lot of dependencies itself, so the process of installing `jest` might take a while.

### Creating your first tests

Once `jest` has finished installing, create two files, `index.js` and `index.test.js` in the root of your folder. `index.js` will contain the implementation, and `index.test.js` will contain the corresponding tests.

The content of `index.js` is very short:

```js
module.exports = () => "Hello World";
```

It defines a method that takes no parameters and always returns the string `"Hello World"`. This method is assigned to `module.exports`, which tells NodeJs that it can be used in other files.

We'll now use this function in `index.test.js` to run some tests:

```js
const HelloWorld = require('./index');

test("HelloWorld returns Hello World", () => {
    expect(HelloWorld()).toEqual("Hello World");
})
```

This first test calls the function we imported (here "required") from `index.js` and compares it's result to the string `"Hello World"`. If we run `npm test` in the terminal, we should see this test pass. After all, that's all that the function does!

<img class="img-fluid drop-shadow-small" src="{% link getting-started/guides/windows-vscode-node-green.png %}"/>

### Creating a failing test

How does a failing test case look like though? Let's find out:

```js
test("HelloWorld returns Hello World", () => {
    expect(HelloWorld()).toEqual("Goodbye World");
})
```

Running `npm test` now should now report a failure, as `HelloWorld()` does not in fact return `"Goodbye World"`, as demonstrated by the *diff* that `jest` will show.

<img class="img-fluid drop-shadow-small" src="{% link getting-started/guides/windows-vscode-node-red-test.png %}"/>

<div class="advice" markdown="1">
We generally start with a failing test-case, because the absence of a failure does not imply the absence of problem. A failing test-case will tell you that a) you set up the test runner successfully, and b) that your test runner finds your testcases in the right place. You'd be surprised how often you get a false-positive testrun because of this!
</div>

### Committing to git

Now that we have the project in a good shape, it's time to add it to `git`. In your terminal, run `git init .` to initialize a new repository in the folder we're developing our application in.

```shell
$ git init
Initialized empty Git repository in /tmp/coderetreat/.git/
```

At this point, *VisualStudio Code* will complain that there are too many files to watch, as it also considers `jest` and all your dependencies that were installed in the `node_modules/` folder earlier. If it offers you to ignore that folder, press yes. It will create a file `.gitignore` that lists all files that `git` should not be concerned about.

If *VisualStudio Code* does not bat an eye, create the `.gitignore`-file as follows:

```
node_modules/
```

`git` has a handy command, `git status`, that will tell you the current state of your project. You can run this any time without any consequence, just to check what `git` thinks has changed.

`git add .` will add all files in the folder (except for the ones in `.gitignore`) to the "stage". We can commit this stage to `git` by running `git commit -m "Add boilerplate with a failing testcase"`, where the string is the *commit message* in which we describe what we changed.

🎉 Congrats, you just set up your project with a failing test-case and you're all set for the coderetreat!