---
title: "NextDNS, tried and trusted!"
categories: ["Tools"]
tags: ["dns", "freemium", "tracking"]
---

_"There are alternatives"_

Never has the Web been that encumbered with tracking, telemetry, ads and essentially junk. Never has the Web been that
difficult to navigate, whether because there are cookie banners everywhere or noisy chatbots. On the other side of the mirror, never have these solutions been so simple to implement! You can subscribe to any SaaS that provides one of these
services, connect a few things here and there and here you go: you expose your users to third parties to serve ever more
relevant content.

<!-- READ MORE -->

Granted, this daunting situation sparked positive initiatives. In Analytics, you can have better for a decent price with
services such as [Plausible](https://plausible.io/){:rel="nofollow"} and [Fathom](https://usefathom.com/){:rel="nofollow"}.
Nevertheless, the vast majority of the web still concentrates on a small number of actors.

Today, we will focus on DNS.

## What is DNS?

DNS stands for "Domain Name System". If you have never heard of it, go check out [HowDNSWorks](https://howdns.works/){:rel="nofollow"}
by [DNSimple](https://dnsimple.com/){:rel="nofollow"}. This should clarify things as we delve into some explanations.
See, the Web is a collection of intertwined services. Your computer does not have intimate knowledge of the Web but you
do! To access a website, either you know the URL by heart, you search on your favorite search engine like [DuckDuckGo](https://duckduckgo.com/){:rel="nofollow"},
or you click on a link. After that, there is nothing magical: your browser locates the website by speaking to
authoritative third parties until it finds the IP address, connects to the IP address and downloads whatever kitten
pictures you requested.

You could say: wait, who are these "authoritative third parties" you were just talking about? And there it is, the
difficult part. The default value is usually defined by your ISP, your Internet Service Provider. This ISP has a say on
who to contact next, etc. This is also how some websites are "blocked" in certain countries: you can request the common
ISPs to censor suspicious domains. While this defeats the purpose of free information, it helps protect the people who
do not hold a deep understanding of the intricate structures of the platform. In other words: can be abused but still
helps in a way.

DNS is fundamental to the web. So critical that it being unencrypted can lead to dangerous practices. By intercepting
your traffic, one can have a general idea of what you are doing online. Do not tell me that you only visit Facebook,
Google and Youtube, that is simply not true. You read articles, purchase things, find contents about your hobbies and
look for gift ideas for your friends and family. And on your phone you play games, install apps that suit your needs.
Each person has a specific online history and its general idea is shared to at least whoever is first in line.

Here is a frightening example: your devices need to check for updates, which are stored on your OS manufacturer, i.e.
Microsoft, Google or Apple. Identify the domain and you know what device your users are on. Apple device purchasers are
more likely to belong to the category of people with higher disposable income, therefore you may receive ads for more
expensive products or services or, even worse, you could end up paying more for the exact same items!

## Simply outrageous! What can I do?

If you follow this blog closely, I already gave one piece of advice that has to deal with URLs: using a [content blocker]({%
post_url 2020/2020-06-03-started-using-adblocker %}) to reduce your digital footprint and declutter your web experience but
this does nothing outside of the realm of your browser. Think apps, games, OS. Content blockers do not apply to these
services. The clutter is still present, if not worse! In ["Reduce, Reuse, Recycle"](https://www.epa.gov/recycle){:rel="nofollow"},
there is a will to consume what you need, when you need it and transform it afterwards. **Reduce** should always be your
first step: ask less of your devices and more of your offline interactions! The others are difficult to achieve unless
you know your stuff pretty well and we are not talking about it here.

Let's address the first issue first: how do we encrypt DNS? Well that is simply hard today. DNS has been introduced in
1987 with [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035){:rel="nofollow"} and has been designed for the
Internet of that era. Today, DNS is so present that even deviating slightly from the protocol causes disruptions so you
cannot upgrade the protocol like any other application. This effect is called [Protocol ossification](https://en.wikipedia.org/wiki/Protocol_ossification){:rel="nofollow"}.
To avoid it, you could use protocols that are more flexible and natively support what you are looking for, just like
HTTPS and [QUIC](https://datatracker.ietf.org/doc/html/rfc9000){:rel="nofollow"}! Both of these protocols natively
support encryption and are the foundation of your Web experience so they are reliableand very flexible. We just need
some sort of standard to emulate DNS inside an HTTPS or a QUIC request. Enter DNS over TLS from [RFC7858](https://datatracker.ietf.org/doc/html/rfc7858){:rel="nofollow"}
and DNS over HTTPS from [RFC8484](https://datatracker.ietf.org/doc/html/rfc8484){:rel="nofollow"}. Long story short,
these two protocols can send encrypted DNS requests to a provider which resolves them and returns basically the same
result. While you will need to trust this actor, no one else will be able to inspect your traffic on the way.

## How do I install this?

When it comes to privacy, navigating the sea of products is extremely energy-consuming. Even the suggestions on this
blog post are not the best of the best. Essentially, whenever you can, trust services you build, then services you host.
If you cannot, then find some service that is highly praised and trusted by authorities you support. For instance, I
support [Mozilla](https://www.mozilla.org/en-US/){:rel="nofollow"} and their mission to make the Web better. I use and
love their browser [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/){:rel="nofollow"}. This
browser implemented DNS over HTTPS supporting two providers: [Cloudflare's 1.1.1.1](one.one.one.one){:rel="nofollow"}
and [NextDNS](https://nextdns.io/){:rel="nofollow"}.

Do not get me wrong, both of these services are exceptional and I personnally recommend NextDNS as it provides more
configuration options for an increased efficiency. Both offer comprehensive setup guides but one gives you more control.
Why don't we check out what options it provides?

You can block or allow domains to be resolved, meaning NextDNS will respond with the actual service IP instead of an
error. You can block common services such as Facebook, Tiktok or Amazon and schedule their blocking, block entire
categories of services such as Dating or Gambling, enable common blocklists you already use with [uBlock Origin](https://ublockorigin.com/){:rel="nofollow"},
block dubious websites and so on. And you can create multiple configurations for multiple class of devices: work,
personal, family-friendly. You can monitor and slightly configure the monitoring of the resolved and blocked
domains and even add your own rewrite rules.

I used to spend quite some time on my phone. When I did, NextDNS deflected clountless numbers of ad and tracking
services. About 35% of the DNS requests were blocked. Since I reduced my reliance on portable devices, this fell to just
below 20%. [AMP](https://amp.dev/){:rel="nofollow"} news sites were crippled with ads but I could only read the same
content: a message telling me that loading the ad failed.

Frankly, I love NextDNS and I welcome their new features. Just a few days ago, on May 31st of 2021, they announced on [their Twitter account](https://twitter.com/NextDNS){:rel="nofollow"}
that they switched to the latest and more efficient certificate chain from [Let's Encrypt](https://letsencrypt.org/){:rel="nofollow"}
for more efficient and secure encryption. I contributed a few translations for their French version on [their Crowdin project](https://crowdin.com/project/nextdns){:rel="nofollow"}.
You know what separates NextDNS from the rest of the pack: I am paying for it because I **want** to support the effort.

I want you to try NextDNS. Their free offering gives you 300k DNS requests after which it acts as a
regular-but-souped-up DNS resolver for the rest of the month. This is enough to test its efficiency on your devices. If
you do check it out then think about me by using [this referral link](https://nextdns.io/?from=64dcu5sy){:rel="nofollow"}.
It does not cost you a cent and will probably not lead to a payout anytime soon but if it can help in any way then it is
a win in my book.

Also check out the other tools and services I presented on this page. Some of them are well worth your time if privacy
matters for you. Send me a message if you wish to know what they provide and how to start using them!