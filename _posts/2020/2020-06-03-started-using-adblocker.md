---
title: "And so I started using an Ad Blocker"
categories: ["Tools"]
tags: ["web", "tracking", "ads"]
---

_Edit (14th of July 2020):_ Allow rules in uBlock Origin's Dynamic Filtering feature have been hidden[^1] due to them being
misunderstood by the user base. This article has been updated accordingly.

## Bad feelings and feeling bad

I will openly admit something: I always go above and beyond to reduce the amount of telemetry that gets sent to various
providers. While I am on the topic of confessions, I also strive to make my devices more performant. So you will not be
surprised when I tell you that I believe we can find performance in minimalism; we send and receive a large amount of
data and a significant part of it is insignificant.

<!-- READ MORE -->

Why would it be shameful to admit something of the sort? This is an innocuous and private matter. Well, not exactly.
Analytics is essential to provide to most relevant content to your audience. Not _just_ ads. Telemetry is important when
assessing the usage of a set of features. Probing for information you can or will never get straight from your users is
crucial to keep the engines running. If you know this site, you might also have noted something rather peculiar: this
site does not use those tools. They are simply not needed.

Should you block ads or contents too? [**You should**](https://shouldiblockads.com/), even though it is eventually up to
you to decide.

In France, ISPs have been offering almost-unlimited data plans over wired connections for a relatively inexpensive price
and with a phone and TV plan included. Mobile plans also used to be expensive but now are not. In other words, it is
possible to go through the month and avoiding your local coffee shop questionable WiFi that asks for your email and social security number.

We do not all have this chance. Some might live in regions that have bad reception, barely 3G service or possess a
low-end device. While that is rare, serving the right contents at the right time can be crucial to deliver essential
services to people who benefit from it the most.

## Definition of Essential

If a certain global pandemic taught us something, it is the definition of "essential". We all have divergent definitions
of that word. For the rest of this post, let us suppose "essential" means "that is strictly required, necessary".

If I go to a random news site, the essential content would be information: text, images, videos, infographics. Not
vaguely related articles, undesired analytics or retargeting content. You might actually want the web experience to fit
your interests and this is fine. In the context of this article, I prefer being picky, not force-fed.

For this usage, what can be better than a general-purpose filter, also abusively called an Ad Blocker? "Ad Blockers" are
too often semantically limited to just ads and seldom tracking when they can actually do all sorts of filtering
including cosmetic. Granted, this led to a never-ending battle between Ad Blockers and [anti-Ad Blocker technologies](https://www.bbc.com/news/technology-46508234){:rel="nofollow"}
then anti-anti-Ad Blocker technologies and so on... which, by the way, had a negative impact on users that do not use
these technologies in the first place.

Installing such tool is child's play. Nevertheless, what would you need to get started?

## This ain't an easy game

I use and love [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/){:rel="nofollow"} with only two
add-ons: [Decentraleyes](https://decentraleyes.org/){:rel="nofollow"} and [uBlock Origin](https://github.com/gorhill/uBlock){:rel="nofollow"}.
Nothing else. My browser is set to reject any kind of permission sollicitation and tracking and my extensions limit the
amount of requests I send and receive.

Have you ever noticed that badge next to the uBlock Origin icon? If you did not change any setting, it should look like
this:


![uBlock Origin's Easy mode](/assets/img/posts/20200603/easy-mode.png)  
_uBlock Origin's Easy mode_


The number indicates the number of requests that have been blocked. What does the color mean? This represents your "[Blocking mode](https://github.com/gorhill/uBlock/wiki/Blocking-mode){:rel="nofollow"}".
If you devour news like me, you will appreciate that the default mode is quite effective and there is room for
improvement if you have a few more minutes to spare! I have been using the Medium mode for a while now with no negative
impact on my daily browsing experience, quite the contrary even!


![My uBlock Origin dashboard](/assets/img/posts/20200603/my-ublock.png)  
_My uBlock Origin dashboard_


The blue badge on the uBlock Origin icon is a sign that this installation uses the Medium Blocking mode. Other than
bragging rights, this means you have enabled a stricter set of options than usual. While I recommend fine-tuning your
configuration, you might want to hold off with the default settings unless you know what you are doing.

## Reputation

Before talking in depth about the capture, it is important to note that these features are meant for [advanced users](https://github.com/gorhill/uBlock/wiki/Advanced-user-features){:rel="nofollow"}.
We will never state this enough: use at your own risk.

There are a lot of elements to talk about. First and foremost, the red cells are my doing: I did not wish to receive
content from those domains globally and the way I did it is too detailed for my own good and has been simplified since.
uBlock Origin allows you to universally and locally allow, "noop" and block contents. What is "noop" you ask? It is a
setting that cancels out broader allow or block rules! I was not lying when I said this was for advanced users.

On the left of each domain name, there is a red, yellow -not on the capture- or green band. Red means all requests have
been blocked, yellow that some requests have been blocked and green that everything has been allowed. The two clickable
columns are your dynamic filters status, both global and local. They can have one of three colors in two variants: green -allow-[^1],
red -block- or gray -noop-, bright -active- or faded -inherited effect-. "+" and "-" relate to the amount of allowed and
blocked requests. That is all you will ever need to know for a hobbyist usage of the tool!

As for the lines, from top to bottom:
- all: self-explanatory;
- images: really?;
- 3rd-party: everything that is not the current domain, not just scripts and frames;
- inline scripts: alters the execution of JavaScript tags included in the document;
- 1st-party scripts: JavaScript files from the same domain or subdomain;
- 3st-party scripts: JavaScript files from external websites;
- 3rd-party frames: contents embedded from other websites. Think Youtube videos;
- the rest: each domain and their subdomains get mentioned hereafter.

I would recommend fiddling with 3rd party frames and scripts and with websites you know you will never step into that
are not statically blocked yet. Blocking 3rd party scripts will definitely break some websites so you need to be ready
to "noop" that rule at any instant. Being that thorough is pointless and might cause more issues. It is, again, the
result of my experiments leading to this very post.

To insist, experiment with that dashboard for a few days or weeks and once you feel confident, you will have more power
over what you see on the web!

## Why this is important

After learning to play with this tool, I have truly noticed how strained my computing and networking resources were.
Today, navigation feels fast again, my non-video network usage has dropped noticeably and the experience feels less
janky. I even have one simple filter I am proud of, being a heavy [Tweetdeck](https://tweetdeck.twitter.com/){:rel="nofollow"}
user.

To see the flow of requests in real time, click on the icon immediately on the left of the sliders icon of the
capture. If your popup is simplified, click on the "More" link a few times.


![The logger interface](/assets/img/posts/20200603/logger.png)  
_The logger interface_


This is the **Logger** interface. It displays the latest requests that have been handled and highlights those that have
been rejected in red. See these red "beacon" requests? The [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API){:rel="nofollow"}
can sneak requests anytime, even when you are about to close the tab. I have yet to find a legitimate use case that
benefits the user, therefore I decided to block beacons. To do so, I had to craft this rule: `*^$ping,important`. This
informs the extension that beacon requests should be blocked in any case. How did I do that?

1. Visit a website sending beacons, Tweetdeck or Google will do;

1. Open the uBlock Origin panel by clicking on its icon, then the **Logger**;

1. Using the "filter logged content" search box, search for "beacon";

1. Hover over the results. Some parts of the line you are hovering are colored differently and display a magnifying
   glass pointer. Click when you see that magnifying glass;

1. This opens a dialog over the Logger. Click on the **Static filter** tab;

1. Make sure the text says the following by selecting the most relevant answers:  
  `Block` network requests of `type="beacon"`  
  which URL address matches `www.google.com`  
  and which originates `from anywhere`,  
  `even if` there is a matching exception filter.

1. The static filter should now look like `||www.google.com^$ping,important`. To apply it to all websites, replace
   `www.google.com` with `*`;

1. Click on "Create" and your filter will be applied immediately to all subsequent requests!


![That dialog interface](/assets/img/posts/20200603/dialog.png)  
_That dialog interface_


Removing that filter is simpler:

1. Go to your dashboard by clicking the now famous sliders icon on the panel;

1. Navigate to the "My filters" tab;

1. Locate and remove the filter `*^$ping,important` and its comment. Done!

## Your turn!

Now, if a website requests undesired contents, [rub some **beacon** on it](https://www.youtube.com/watch?v=wSReSGe200A){:rel="nofollow"}!
That is, you know what to do to restrict it. And if the web feels faster again, help the people around you realizing
what the Web can become when some actors are kept in check. With regards to HTTP requests minimalism is key, whether
you are an engineer or a casual meme browser.

It is high time to play with your new tools now!

## Footnotes

[^1]: Starting with version [1.28.0](https://github.com/gorhill/uBlock/releases/tag/1.28.0), the green buttons have been removed from the default Dynamic Filtering interface because they are misunderstood, leading to privacy issues. There is a way to enable them back but please only use them as a last resort and prioritize the gray "noop" buttons when possible.
