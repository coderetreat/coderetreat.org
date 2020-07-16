---
title: Installing NodeJs, the JavaScript runtime
resources:
  - type: url
    url: https://nodejs.org/en/download/
    description: Download link for node
---

NodeJs is the most popular *JavaScript* runtime.

To verify that everything works, open up *Git Bash* again and launch a *node* REPL (a **R**ead-**E**valuate-**P**rint-**L**oop, something like an interactive language environment) and type:

```bash
node --version    # Should print something like 'v12.16.3'
node -p '1+2'     # Should print '3'
```

<TODO>SCREENSHOT OF A GIT BASH SHOWING THESE COMMANDS</TODO>

<div class="advice">
You might need to close and start *Git Bash* again after installing *NodeJs*, as it might has manipulated the `$PATH` environment variable, which contains all paths where global applications reside
</div>