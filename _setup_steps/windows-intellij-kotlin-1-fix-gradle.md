---
title: "Temporary: Fixing a bug in gradle"
resources:
  - type: url
    url: https://github.com/gradle/gradle/issues/10248
    description: Link to the issue on GitHub that's not fixed in the default version of gradle shipped with IntelliJ
video:
  src: /getting-started/guides/windows-intellij-kotlin-1-fix-gradle.mp4
  poster: /getting-started/guides/windows-intellij-kotlin-1-fix-gradle.mp4.thumb.jpg
  description: "A screencast of manually upgrading gradle (1.5MB)"
---

At the time of writing this tutorial, IntelliJ ships with an old version of *gradle* that is broken with the latest (and recommended) *OpenJDK* version (version 14). Once you're past the wizard, IntelliJ will report an "Invalid Gradle JDK configuration found" and no build tasks will work.

To fix this, we have to manually intervene and upgrade *gradle* to a recent version (at the time of writing, this is version 6.5.1). Open the *Project* sidebar on the left and create a new file `gradle-wrapper.properties` in `gradle/wrapper/` to tell IntelliJ which gradle version you want to use as follows:

```sh
distributionUrl=https\://services.gradle.org/distributions/gradle-6.5.1-all.zip
```

Afterwards, click on the "Open Gradle Settings" link in the bottom pane, set the SDK to use to *Project SDK (OpenJDK 14)* and click OK. IntelliJ should successfully sync with *gradle* now.