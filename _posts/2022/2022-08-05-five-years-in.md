---
title: "Engineering, five years in"
categories: ["Society"]
tags: ["repost", "archive"]
---

_We have done so much, yet we have so much to do_

Remember [five years ago]({% post_url 2017/2017-07-18-engineering-newcomer %}), when I was about to get my engineering
degree? Well those five years flew by and I feel like I made significant progress from that time, yet I'm humbled that
there is still so much to learn.

<!-- READ MORE -->

What happened those last five years? I went from dev to Cloud engineer. This allowed me to oversee the complete product
development spectrum and stretch the legs of my knowledge. I created new things and participated in old ones. I have
faced legacy and teams fearing it.

## The world moves faster

The line of thinking behind most problematic decisions has started to crack. Why we let technical debt creep in, why we
hire external consultants, why work can grind to a halt, why teams are not into practices, why projects overrun budgets
by astronomical factors.

The very first thing I noticed is how software is chaotic and how organizing that chaos is difficult. This results in
few strategies:

- Letting teams decide and own their decisions;
- Reducing the number of technologies and deciders, being prescriptive about what cannot be done;
- Accepting the situation we are in and allowing experiments left and right, something is going to stick at some point.

Our platforms are fresh, still we do make the same mistakes by assuming that they are based on ancient tech therefore we
should use ancient ways.

> "Cloud you say? I only use their equivalent of my virtual machines! Now could you instruct me on how to connect my
> router-firewall appliance to the Cloud?"

Legacy is everywhere, we deal with it every day. Code is legacy, infrastructure is legacy, deployments are legacy. And
every engineer and technician has to deal with legacy. Most of those people do not even have documentation or comments
or well crafted code. Everything is just lying around waiting to be fixed, decommissioned, SaaS-ified.

So what are we doing to address that? On the Cloud side, there are good news: the web application tier pattern is
generally accepted and is so common that offerings cover it. Just have a look around: Vercel, DigitalOcean, Platform.sh,
Netlify. All of these solutions deploy common application architectures, and you could even argue that your Kubernetes
clusters do that and so much more automagically. It is just the beginning of this infrastructure golden era and I love
it!

On the development side, there are good news too! Our frameworks get more done out of the box, and we have started to
accept the way apps should be built: a static frontend and an API backend with an OAuth2 authorization layer managed by
a service that implements authentication once and for all. Ten years ago, we had to spend so many days developing sign
up and login modules, forms and whatnot on every project.

## A bit of this

So is this all? What learnings do we extract, and what does it tell about the next five years? First, there is a
realization to be made about how not everything is solvable through technology. This becomes abundantly clear when we
look at the trajectory our Earth is taking following our collective impact. Technology plays a minor role behind how we
the people organize.

Technology-wise we'll still websites and applications that take data from one end to the other. It stands to reason that
we could use this opportunity to build sustainably, can't we? We should not wait on the magical framework that will put
everyone on the same page.

The most complex thing to do is accepting change and that we don't need that many nice things around. We don't need to
renew devices every three years, we don't need to add features that nobody asked for just because, we can afford to slow
down and refine our existing apps well beyond diminishing returns. We must cherish maintenance!
