---
title: "Please don’t default to... JavaScript"
categories: ["Development"]
tags: ["repost", "archive", "javascript"]
---

**Words of notice:** This is a slightly edited repost from an article I published on my previous blog.

***

![The official jQuery Logo](/assets/img/posts/20180427/header.png)

_At the very beginning, there was nothing..._

...And then, there was the web. Not the one you know and love, though. A web of pure and structured information. Where
the only purpose was to share data across the world.

Raw data became soon not enough. The act of sharing needed to become personal and interactive. We wanted users to
experience and experiment. We needed a new language that implements new ideas to make it simple to learn and that
completes its companions HTML and CSS. That language was JavaScript.

<!-- READ MORE -->

JavaScript is an alien of the web. It is not a declarative language, which means that you cannot use it to describe what
you want to create. It does interact with the other languages, removes and adds structure and style. It does interact
with the rest of the world, be it your mouse and keyboard or the entire network. HTML and CSS can do that now, to a
limited extent[^1].

Soon after, developers started to realize the full potential of JavaScript. Being able to build virtually everything
that is missing from the other two main languages and to create increasingly complex systems in a decreasing number of
lines of code was the be all end all.

## Where everything was fantastic

This language has always been truly special and makes the web feel more complete, fast and accessible to new developers!
Building your first web page has never been more inexpensive and simple. Plus, there is a countless number of people
that are willing to lend a hand.

The state of JavaScript, if not for the usual lagging browsers, is such that what was thought to be impossible a few
years ago has its own tested and documented library. Granted, JavaScript has not evolved alone. The demand for a
stronger and more complete language has been steady over the years and the community has been creating new ways to
satisfy needs, simplifying processes, abstracting away browser-specific shenanigans and mindless verifications. By
itself, JavaScript does not implement everything we need but the rich ecosystem reduces the strain to use it.

Today, we are truly standing on the shoulders of giants. With new ways to write front and back-end code and traps that
are avoided thanks to better language and implementation features, we can afford to spend more time on the actual
business logic. Then, what if your business logic could be simplified by frameworks that implement the difficult bits of
your ideas? Today, everything is at our doorstep. After all, that is how we ended up with initiatives such as [No Code](https://www.nocode.tech/){:rel="nofollow"}.

Moreover, learning JavaScript has never felt so easy with tutorials, books and apps that can follow you in your everyday
routine. That applies to most languages and technologies developers use. [Grasshopper](https://grasshopper.codes/){:rel="nofollow"}
from the [Google Area 120](https://area120.google.com/){:rel="nofollow"} team is the latest option to try out if you
want to learn the language! If you need some practice, [CodinGame](https://www.codingame.com/){:rel="nofollow"} is a
neat website!

## The ugly part

It is common to rely on JavaScript to implement everything that cannot be handled effortlessly by CSS or HTML. [This article](http://beza1e1.tuxen.de/articles/accidentally_turing_complete.html){:rel="nofollow"}
states that HTML5 and CSS3 put together might be Turing complete by accident. This means that you should virtually be
able to code anything using the right combination of these two languages. This is obviously not advisable in any case.

More practically, an accordion is as simple as a checkbox + label system, for carousels you can use keyframes to animate
them. The hidden benefits of such ideas: your JavaScript engine will handle other critical tasks, your code is reusable
if well written and your JavaScript will be lighter. [See for yourself](https://codepen.io/Vincenzo/pen/xjwpvw){:rel="nofollow"}.

[CanIUse](https://caniuse.com/){:rel="nofollow"} is a fantastic resource to know about the latest changes in your
favorite technologies and their browser support. Mixing it with preprocessors and transpiling will allow you to write
browser-dependent code without even knowing.

In addition to edgy use cases, JavaScript is a language that is open to lots of mistakes by design. Chaining calls is so
easy and natural that you will often access properties of `null` or `undefined`. Scopes will make your head hurt when
you realize the amount of memory you can waste or what they do behind the scenes. Bad habits such as global variables
can kill your performance by chomping on the memory. And you know the saying: one deleted line of code is a line you
will not have to debug anymore. Easy unless your JavaScript is scattered all over your project.

Again, tools are available to avoid most of these issues: frameworks, linters, profilers, code scanners, [prettifiers](https://prettier.io/){:rel="nofollow"},
compilers / transpilers and even languages! Nevertheless, it would have made sense for JavaScript to be stricter from
day one, right? A decent type system with less magic and less ways to reach `undefined` or `null`.

The list of JavaScript quirks is indeed long but let us not forget every language has its own unique issues. JavaScript,
being the reference for web front-end, has to withstand massive amounts of criticism. Maybe the fact that its
specifications are way more vague than HTML or CSS does not contribute positively to its appreciation.

## What then?

Can we leave the JavaScript ecosystem? Obviously not. I would suggest being critical about its inclusion in a project.
It is constant evolution therefore needs space to grow. Do not lock yourself in a corner by sticking to one way of doing
things unless you cannot do otherwise and do not use JavaScript for things that could be achieved by thinking and
designing differently in the first place.

Do not hesitate to read about the [best practices](https://jstherightway.org/){:rel="nofollow"} and to be creative to
avoid defaulting to JavaScript for everything. Use CSS classes, HTML inputs and labels, keyframes, media queries, etc.
When a feature is purely cosmetic, you should be able to drop the browser support with the added benefit that your code
will be lighter and easier to understand in the end.

Remember JavaScript is not a bad language, it just needs to be understood and handled with care, especially when your
code reaches millions of people. Do not lose control of your JavaScript and your app will be fine for ever!

## Footnotes

[^1]: Granted, you can retrieve network resources with HTML and CSS. You have some control over the loading priority and the resource choice (media queries, [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset){:rel="nofollow"}, async / defer, WOFF2 in font-face, etc.). You can also be [creative](https://github.com/jbtronics/CrookedStyleSheets){:rel="nofollow"} with CSS and the url() function.