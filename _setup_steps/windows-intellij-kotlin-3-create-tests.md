---
title: Creating and running tests
video:
    src: /getting-started/guides/windows-intellij-kotlin-3-create-tests.mp4
    poster: /getting-started/guides/windows-intellij-kotlin-3-create-tests.mp4.thumb.jpg
    description: A screencast of creating and running tests in Kotlin (1.9MB)
---

Finally, we can create our tests to make sure that everything is working correctly. Create the folder `src/main/kotlin` and place a new Kotlin class `HelloWorld.kt` in there with a simple method that returns `"Hello World"` when called:

```kotlin
class HelloWorld {
    fun say(): String {
        return "Hello World"
    }
}
```

Create the folder `src/test/kotlin` and place a new Kotlin class `HelloWorldTest.kt` in there that contains the first test (supposed to be passing right away):

```kotlin
import kotlin.test.Test
import kotlin.test.assertEquals

class HelloWorldTest {
    @Test
    fun saysHelloWorld() {
        assertEquals("Hello World", HelloWorld().say())
    }
}
```

<div class="advice" markdown="1">
Be careful when relying on Autocompletition to import other functions such as the `@Test` annotation. As we're using both `junit5` and `kotlin.test` and they both happen to have `@Test` annotation, you need to watch out for the correct package (`kotlin.test.Test`) when you are importing it!
</div>

Running the test (click on the green arrow on the line where the class is defined) should tell you that all tests have passed ("are green"). To make sure that we're not overlooking anything, let's write a test that is failing ("is red"):


```kotlin
import kotlin.test.Test
import kotlin.test.assertEquals

class HelloWorldTest {
    @Test
    fun saysHelloWorld() {
        assertEquals("Hello World", HelloWorld().say())
    }

    @Test
    fun saysGoodbyeWorld() {
        assertEquals("Goodbye World", HelloWorld().say())
    }
}
```

If you run both tests, you should see one failure, and one success. This is exactly what we want, so we can move on to saving the project in its current state with `git`.