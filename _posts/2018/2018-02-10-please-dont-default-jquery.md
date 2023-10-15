---
title: "Please don’t default to... jQuery"
categories: ["Development"]
tags: ["repost", "archive", "javascript", "jquery"]
---

**Words of notice:** This is a slightly edited repost from an article I published on my previous blog.

***

![The official jQuery Logo](/assets/img/posts/20180210/header.png)
_The official jQuery Logo_

_It’s not you, it’s me._

## A bit of history

When I was a student in Computer Science, one of my teachers told the class that achieving something as complete and
optimized as the STL for C++ would take an entire career of engineering efforts and that we should not even get started.
I chose to keep in mind that these works are never the result of the passion of a single person but rather a global move
in the community that fostered the best practices around the scope of that said piece of software.

<!-- READ MORE -->

To a certain -far-fetched- extent, jQuery mirrors the STL: it emanated from the premise that writing in JavaScript
should be effortless and the community has followed because the results were tangible and pretty decent at the moment.
Also, it helped writing code that had consistent behavior across browsers, which was the thing that mattered ten years
ago, when basic features were implemented very differently.

From then on, jQuery helped creating experiences that were increasingly complex, thanks to the abstraction layer it
added to the DOM manipulation, event management and AJAX requests. We even started to see jQuery based libraries appear
everywhere. Then people gathered their ideas in the same place, the [jQuery Plugin Registry](http://plugins.jquery.com/){:rel="nofollow"}
or [NPM](https://www.npmjs.com/){:rel="nofollow"}, which led the following web revolution that we will keep for another
article.

The rest is recent history, from the JavaScript community that finds rarities and oddities among the terrifying amount
of packages that appear every day, the makers that use these findings to build even more complex systems to the new
framework trends and so on.

## Why would I drop jQuery?

I was a fervent adopter of jQuery when it caught my eye back in 2012. It helped me solve pretty critical issues that I
did not believe were easily solvable with vanilla JavaScript. It was my favorite tool when dealing with complex tasks.

At one point, in 2014, I had an epiphany: I was **forcing** users to spend their data allowance for assets they
**never** needed in the first place! This was the first step of my journey through web performance. I started learning
how to optimize my assets and serve them at the right time, the right way. This notably induces critical thinking about
the dependencies I use in my projects.

Today, whenever I see jQuery, I oftentimes wonder what it brings to the table. Moreover, I prefer developing with one of
the latest trending frameworks and build the DOM than editing what is there, sewing pieces of code together with raw
JavaScript or jQuery.

Apart from that, most of the developers around me come up with the same reason as to why they are attached to this
technology: the selectors. Not the browser support, the added benefit of a layer on top of the DOM, event handling,
animation and plugins. I personally defend jQuery when its inclusion is highly beneficial in terms of productivity and
usefulness in a project. Plus, the Slim version is a very welcome idea. Still, if you only need jQuery for the
selectors, the same team did a pretty good job with [Sizzle](http://sizzlejs.com/){:rel="nofollow"}.

You can also turn to Vanilla for your selectors: [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll){:rel="nofollow"}
for the most complex and the famous [document.getElementsByTagName()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName){:rel="nofollow"},
[document.getElementsByClassName()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName){:rel="nofollow"}
and [document.getElementById()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById){:rel="nofollow"}
for the 80+% remaining cases. Also: you can chain them in very specific circumstances[^1].

![Some performance statistics](/assets/img/posts/20180210/comparison.png)
_These samples have run on jsPerf on the HTML of my website. jQuery v1.11.1 is used as the reference_

Even though they don’t have the exact same behavior, the alternatives ask for less network and system resources. Also
note that you can polyfill for the left out browsers like Internet Explorer, which happens to have lost 12% of its
market share between the end of 2016 and the end of 2017 according to [NetMarketShare](https://netmarketshare.com/){:rel="nofollow"}.
Perhaps in a few years, you won’t need to polyfill anymore and you will be able to use the latest vanilla enhancements,
meaning your code will be shorter and finally consistent!

## What do I do if my application has a strong dependency?

The major part of the Alexa top websites have jQuery ([Source](https://publicwww.com/websites/jquery/){:rel="nofollow"}).
Some even use an old version that cannot be easily upgraded! It is not a shame to have a website that runs thanks to
this framework; that proves it can handle production environments. If you frantically refactor your logic and keep it
clean, you don’t have to worry about your legacy that much! You can still replace the last few $ by their vanilla
counterparts later if you want to. [You Might Not Need jQuery](http://youmightnotneedjquery.com/){:rel="nofollow"} is a
neat website that could very well teach you a few tricks for that matter.

Remember, you don’t need to move out of it. Just don’t integrate it too deeply or you won’t be able to upgrade it
anymore and don’t start a project with this framework in mind just when the JavaScript world is starting to get
interesting! Go and test some new ideas with React, Angular and Vue, automate and optimize your builds with Webpack,
Gulp or Grunt, play with dependencies and Yarn, NPM or Bower. Go have some fun!

Finally, please upgrade your jQuery version and keep it up to date. The jQuery team has you covered with their Migrate
plugin. There are obvious benefits in upgrading your version. First, you will have better performance for a slimmer
download size! Secondly, you will be able to eliminate dead and hazardous code and increase your product quality and
efficiency. Finally, if you use events, check their behavior to prevent them for firing more than necessary.

## Footnotes

[^1]: The document.getElement_s functions return HTMLCollections. You have to iterate over the collection to call the next document.getElement function. Nevertheless, you can chain any document.getElement function after document.getElement, unless... one of them returns null and breaks everything.
