---
title: Setting up JUnit5 in the project
video:
    src: /getting-started/guides/windows-intellij-kotlin-2-gradle-add-junit5.mp4
    poster: /getting-started/guides/windows-intellij-kotlin-2-gradle-add-junit5.mp4.thumb.jpg
    description: "A screencast of configuring gradle for JUnit5 (0.8MB)"
---

Another slight annoyance is the fact that by default, a new *gradle* project ships with *JUnit4*, an old version. Upgrade it by changing the *junit* dependency declaration to use `kotlin.test` with the junit5 adapter, and to use the *JUnit5*-platform to run tests.

Your `build.gradle` should looks as follows:

```groovy
plugins {
    id 'java'
    id 'org.jetbrains.kotlin.jvm' version '1.3.72'
}

group 'org.example'
version '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

test {
    useJUnitPlatform()
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk8"
    testImplementation 'org.jetbrains.kotlin:kotlin-test-junit5'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.6.2'
}

compileKotlin {
    kotlinOptions.jvmTarget = "1.8"
}
compileTestKotlin {
    kotlinOptions.jvmTarget = "1.8"
}
```

Click on the elephant with the sync icon floating on the top right of your screen to fetch our newly declared dependencies.