---
title: Installing NodeJs, the JavaScript runtime
resources:
  - type: url
    url: https://nodejs.org/en/download/
    description: Download link for node
  - type: shell
    command: "node -p '1+1'"
    description: "Type in the shell to verify your node installation is working"
video:
  poster: /getting-started/guides/windows-node.mp4.thumb.jpg
  src: /getting-started/guides/windows-node.mp4
  description: A screencast of setting up node in Windows (14.1MB)
---

NodeJs is the most popular _JavaScript_ runtime for any server-side tasks. It also powers a lot of other applications, suchs as _Slack_ or _VisualStudio Code_. It comes with `npm`, a package manager that allows you to install third-party code and use it in your application. We'll use `npm` later to install `jest`, a test-runner for JavaScript.

Download the appropriate installer (again, if in doubt, go for the **64bit** LTS version) and follow the installation guide.

To verify that everything works, open up _Git Bash_ again and launch a _node_ REPL (a **R**ead-**E**valuate-**P**rint-**L**oop, something like an interactive language environment) and type:

```bash
node --version    # Should print something like 'v12.16.3'
node -p '1+2'     # Should print '3'
```

<div class="advice small" markdown="1">
You might need to close and start *Git Bash* again after installing *NodeJs*, as it might has manipulated the `$PATH` environment variable, which contains all paths where global applications reside
</div>
