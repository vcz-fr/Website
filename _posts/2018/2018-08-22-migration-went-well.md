---
title: "Well, the migration went well!"
categories: ["Development"]
tags: ["repost", "archive", "php", "legacy", "migration", "engineering"]
---

**Words of notice:** This is a slightly edited repost from an article I published on my previous blog.

***

_A view into a real life story of a complete migration_

When I joined the company, they maintained a Content Management System shared by hundreds of different websites. Its I/O
was massive and it was frustrating for end users and the team of project managers to the point it felt almost unusable.
The code was legacy and still is today. Nobody had sufficient knowledge or technical ownership, they lost a tech lead
and the documentation was nowhere to be seen.

Not so long after, I started noticing that the reported issues were coming from unsafely written components and often
from the server itself. The team told me this was frequent. We had to do something about software quality, resilience
and performance. The only problem was that our knowledge about server architecture and cloud computing nears the
absolute zero and that we were supposed to rework an entire stack to move it to the future.

The conditions were met for months and months of fun. We learned a ton of things along the way while making our websites
more secure, resilient and performant.

<!-- READ MORE -->

## The plan

We had to devise a roadmap for our ecosystem. We needed ways to document, to find quirks and more serious issues with
our code base. The final objective was to make the experience natural. We wanted to use the tools that would allow us to
move as fast and as close as possible to our target. In parallel, we know our reporting experience was weak and that we
had no safeguard in case the worst happened.

Evidently, when dealing with these kinds of supertasks, you also needs ways to test. What better way than a human to
accuse of the progress of the snappiness feeling? Accompanied with a range of monitoring, dashboarding and objective
analyses tools to account for the rest of the metrics. Month after month, new tools would join our arsenal and help us
find errors sooner and sooner. We would be starting to move from a "postactive" reporting experience to a proactive one,
where we report issues to our customers!

The final plan contained the following steps:

1. Migrate the database to AWS and enable safeguards (logs, redundancy, backups, auto-updates);
1. Remove the biggest chunks of dead code: files and modules;
1. Remove references to scripts and files outside of the project directory;
1. Move the code and files to AWS and enable safeguards (same as database);
1. Fix architecture, explode the components, fix smaller issues;
1. Eventually, split the workload across multiple servers.

## The process

We had to start somewhere obvious: the migration. We thought out the migration so that it would be painless for as much
customers as possible. We figured the database would be first to go. Then the compute server, which would run in
parallel with the old one and finally the domains.

### Database

The database migration was the easiest part. In our case, it was just a matter of dumping and importing! The
compatibility was total and the performance gain was visible. Except the database was not the one we all agreed on by
size or engine. A while after, we unsuccessfully tried to rightsize the database. Relational databases being not
elastic by definition, it could not handle peak load and we had to rollback.


After the database migration, we encountered the classic issues. The pages that relied the most on the database were
painfully slow to generate as the servers were now further apart. The sneakiest was those frequent spikes of the
database that rendered our platform unusable for about ten minutes multiple times a day! What was odd is that we could
still send queries to the database. The most basic debugging query — [SHOW FULL PROCESSLIST;](https://dev.mysql.com/doc/refman/5.6/en/show-processlist.html){:rel="nofollow"}
— helped us understand what was going on; a critical index for the CMS was missing.

After adding some missing indices, our database held up the charge, even though it gets seriously underused. Database
rightsizing and application caches are solutions that are considered at the current time but it will require some
performance work to secure the perimeter.

### Compute server

Since we could start fresh with the compute server, we decided to pick the latest tools considering our stack. Our PHP
version went from 5.4 to 5.6 with no damage, NginX moved from 1.01 (yes!) to 1.14 and added memcached for session
handling. Consequently, we skimmed through the configuration docs of these technologies to find ways to reduce I/O.

We also had the opportunity to improve the content delivery and its security by enabling [HTTP/2](http://nginx.org/en/docs/http/ngx_http_v2_module.html#example){:rel="nofollow"}
and sending and compressing our resources thanks to a CDN! NginX and [CloudFlare](https://www.cloudflare.com/){:rel="nofollow"}
made the changes effortless and allowed to slash the download times! To put it differently: quick and efficient wins!

Now that the easy part was done, we had to move the code at some point and test it until every module was up and
running. This step looks a lot like moving to a new place. We stumbled upon a large quantity of unused configurations
and files in the solution. Our logging level was also unsuited for production.

Finally, improving the performance of a website comes with knowing its critical path. To this end, we wanted a simple
tool that any developer could get on board with in less than ten minutes. We settled on [BlackFire](https://blackfire.io/){:rel="nofollow"}.
With its modern and clean experience, we could clearly and rapidly iterate on what was costly in our infrastructure! We
could track down every database call, every duplicate function call, everything that was slowing us down.

Our solution was quickly up and running. It was missing files, PHP extensions and then it was good to go... Except that
we were missing one important detail that we noticed weeks later: the mail server! We had to spend more than a full day to
configure it and we ended up with a local Postfix relay which is underwhelming. There is definitely some work to do on
this department.

### The domains

The database and the server are running, what if we had some activity going on? When you have hundreds of websites to
move to your new server, you need strategies to guarantee that the service will still work when they do their switch.
For that, we replicated their files and configuration and we made sure with our internal demo sites that we were ready.
During the day one of our migration, we migrated our smallest and most convenient domain pool with two websites. No
surprise here: the sites were blazing fast and fully functional.

Days have passed and we migrated more and more pools of websites while simultaneously helping our clients migrating
their own custom domains. The CPU load has been steadily increasing. With the last pools, we had severe enough issues
that we had to consider increasing our capacity, which led us to a waste of resources yet to be resolved.

The slow downs caused by the load were deeply rooted in our CMS, which lazily generates thumbnails for images. Every
thumbnail causes a call to an inefficient image converter. Pages may be composed of many thumbnails, especially when new
global content is added for all websites. We had no choice but to give our server more space to breathe.

## Organizational changes

There is a saying stating that software projects often look like the organization they are created in. In that case, the
saying is on point. Indeed, the solution was difficult to get through and to maintain but on the bright side, its ideas
were mostly unheard of and fresh, albeit covered in dust. How does that convert to the organization's organization?

At that time, it was self-sufficient, autonomous and value-driven though with no clear cut direction. We knew that this
had to change and that communication had to evolve the goal was to shift the architectures of both the application and
the company.

How do you proceed when you are value-driven? By creating value! There are more than one type of value. A product may
have value for its customer, meaning they allow them to better conduct business. It could also hold value for you:
require less maintenance, reduce its running costs, be more secure, resilient, etc. On the organization side, well-oiled
and sufficient processes can streamline daily tasks, efficient communication would not get anything lost in translation,
a clear leadership at every stage of the hierarchy gives the general direction, etc.

During this project, we initiated a mixture of tools, light processes, communication and leadership to move forward
faster and safer: we would have a team and a technical owner, assess each tool as we used them to suit our needs either
by finding unused features or migrating, starting the first documentation, code assessment, actual code integration and delivery[^1]
pipeline. In a few months, we have been able to create a small Digital Factory within the Digital Factory.

The direction was also implicated and pushed for an extension of these ideas to the other projects covered by our team!
At the same time, these ideas reached the other teams who would then proceed to apply our experiments to their daily
routine, sometimes with our help. Communication started to be restored between the teams as well, piece after piece.

## Future work

Nobody could have ever imagined that we could go that far into the process in such a small amount of time, considering
the ecosystem and its constant evolution.

Today, with our current stack, we can make major updates on a weekly basis. Cleaning hundred of small code issues helps
us uncover dubious code and deleting unused calls to the database and to the file system. Leveraging the latest
enhancements in our tech stack allows us to decrease the size of our code base even further and makes the code more
readable. Furthermore, dividing responsibilities and distributing them to external services allowed us to actively
reduce the surface area of our main platform, making it more resilient by design.

There is more work to do, though. We need to automate our tasks. Autoscale, monitor, alert, inform. We need to make the
application crystal clear for newcomers by simplifying its code base, documenting and testing it extensively. Making it
fail-proof by implementing fallback mechanisms and rewriting code for efficiency.

There are still many ways to improve the user experience. These structural changes will have to happen at some point.
But first, we need to take a step back, reducing the amount of code and errors to the bare minimum.

## Footnotes

[^1]: Delivery, not deployment. The difference between Continuous Delivery and Continuous Deployment is the step you stop at. The former asks for a manual deployment while the latter automates it. Enters deployment strategies, rollbacks, automated monitoring and alerting, etc.