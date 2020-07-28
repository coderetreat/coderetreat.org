---
title: Creating a new Kotlin project
video:
  poster: /getting-started/guides/windows-intellij-kotlin-0-new-project.mp4.thumb.jpg
  src: /getting-started/guides/windows-intellij-kotlin-0-new-project.mp4
  description: "A screencast of setting up a new Kotlin project with gradle (1.2MB)"
---

We'll continue with creating a new project. Start *IntelliJ* and proceed through the configuration wizard (again, the defaults are usually fine). Once prompted, click *Create new project* to open the project creation wizard.

Select *Gradle* on the left. If you don't have a recent *JDK* (**J**ava **D**evelopment **K**it, compilers and tools needed to develop on the *JVM*) installed, install OpenJDK 14 from Oracle through the select-box on the top.

Afterwards, proceed with selecting **Kotlin/JVM** as an additional library to bootstrap the project with and click **Next**. Pick a name for the project and finish the wizard.

<div class="advice" markdown="1">
While IntelliJ's *Java* project style offers to add Kotlin to it, we want to use *gradle* right away. IntelliJ has its own way of managing dependencies and project structures which is different from gradle (or maven for that matter). To be consistent across different projects and platforms, *gradle* and *maven* are the preferred way of setting up a new project.
</div>