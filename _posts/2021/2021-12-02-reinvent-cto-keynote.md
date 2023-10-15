---
title: "re:Invent 2021 - Vogels's Keynote"
categories: ["Cloud"]
tags: ["re:invent", "cloud", "keynote", "sustainability", "architecture"]
---

![Header image](/assets/img/posts/20211202/header.png)

_Shouldn't there be an Infrastructure Keynote blog post between this one and the last?_

He was sitting there, in the middle of the desert. Hawaiian shirt, jacket, yellow shades and a bob on his head.
Suddenly his ride arrived. He packed his soft drinks, jumped on the driver's seat and started the engine. Las Vegas was
his destination, the road to re:Invent was the perfect occasion to play some bangers and remember the good old times.

This was the tenth iteration of his keynote. An important anniversary. This one started with contemporary music played
by a small orchestra. As he arrived on the stage and stepped under the light, a feeling of surprise and amusement took
the crowd. We all knew what was on everyone's head, like a collective unconscious: no t-shirt this time?! Then it
settled: there was one under his jacket and his hawaiian shirt. With everything now back to normal, it was high time for
the Keynote to begin.

By the way, we predict a spike of searches and merch sales for The Stranglers.

<!-- READ MORE -->

We are going on a journey. Through fifteen years of innovations both from AWS and from their customers. Fifteen years of
breaking boundaries, setting new highs. And we are going to visit three points in time: 2006, today and the Future.

![The Six WAF pillars as two sporks. SPORCS?](/assets/img/posts/20211202/sporks.png)

## When it all began

In the beginning, there was nothing. That is, until the idea of renting resources that were mostly sitting around
idle. The market did not exist yet, the idea was not on everyone's mind but somehow they knew that they possessed the
one thing that revolutionized the world: programmable infrastructure. Innovation on the Web was difficult back then: a
web server was thought of as a physical appliance. Scaling was not elastic but manual. Infrastructure needed to be
overprovisioned and we had to tend to the servers. EC2 revealed that the need existed. The idea was well received.

It all started in North Virginia. The first region, from where everyone on the planet was reserving their piece of
compute and storage. The region we now refer to as `us-east-1`. People in other continents experienced higher latencies
but they knew that it was all worth it. Had Amazon Alexa been released at that time, it could not move much past the
American borders as it has to respond to queries in less than one second so that the conversation could feel natural.

In one second —and this still holds true today— Amazon Alexa has to record the request and wait for it to finish,
translate it to text, understand the intent, send requests, collect responses, build a text response, translate it to
speech and play it. Now think about what can reasonably be sent over the network in that time and the impact of servers
that are far away from an individual.

Going back to instances for a bit: the Cloud was truly a public, shared experience. There was initially only one
instance type, `m1.small`. To talk to other instances, you had to go over the Internet. Both instances had a public IP
assigned; the notion of Virtual Private Cloud arrived later. As a mattter of fact, Classic Load Balancers and
Autoscaling Groups were released before VPCs. After VPCs were introduced you could truly use the backbone to your
advantage, which revolutionized the Cloud again and the rest is history.

![From your pocket to space: the Everywhere Cloud](/assets/img/posts/20211202/edge.png)

## The journey we have taken together

Things definitely changed. Software and hardware offered more possibilities, the model matured, needs became clearer. We
shifted gears a few times. We spawned a universe of features since then. Take EC2: it started with one instance type and
now there are over four hundred. Adding one more:
[Amazon EC2 M1 Mac instances](https://aws.amazon.com/about-aws/whats-new/2021/12/amazon-ec2-m1-mac-instances-macos/){:rel="nofollow"}!
In a nutshell: mac2 is an incredible value proposition over mac1.

![Mac dedicated hosts on demand pricing](/assets/img/posts/20211202/mac2.png)

_Note: the web page in the screenshot has been simplified._

This is all possible thanks to the Nitro hypervisor system and the ARM migration. Werner Vogels's Keynote from last year
explained how Nitro works and we detailed parts of the explanation [at the time]({% post_url
2020/2020-12-01-macos-on-ec2 %}). Today, Amazon EC2 starts nearly 60 million instances per day. That is almost 700
instance starts per second!

Breaking constraints has been AWS's leitmotiv. There are some that cannot be overcome and the Law of Physics is one of
them. You cannot break the speed of light, but you can eliminate frontiers: when you can't come to the Cloud, let the
Cloud come to you.

The most obvious way to consume AWS is through a Region. There are 25 of them across six continents today. Each region
contains multiple AZs, which ultimately host services. There are a total of 81 AZs online today. However, it does not
stop there: certain services like [Amazon CloudFront](https://aws.amazon.com/cloudfront/),
[CloudFront Functions](https://aws.amazon.com/about-aws/whats-new/2021/05/cloudfront-functions/) and
[Lambda@Edge](https://aws.amazon.com/lambda/edge/) live at Edge locations, and there are about 300 of them today. It
makes sense to create more of these Regions and points of presence: the more there are, the better the latency to access
AWS from all across the globe.

Did you know that you could host your services elsewhere? For instance in Local Zones. Local Zones are Regions that are
simplified and located closer to end users to cut latencies. All Local Zones at the time of writing are located in the
United States. The list of locations can be found on the
[Local Zones map](https://aws.amazon.com/about-aws/global-infrastructure/localzones/locations/){:rel="nofollow"}.

We are not done yet: you can technically deploy AWS anywhere with
[AWS Outposts](https://aws.amazon.com/outposts/){:rel="nofollow"} or to remote locations with the
[AWS Snow Family](https://aws.amazon.com/snow/){:rel="nofollow"} (Snowcode, Snowball, Snowmobile) or monitor locations
and equipment with [Amazon Monitron](https://aws.amazon.com/monitron/){:rel="nofollow"} and
[AWS Panorama Appliance](https://aws.amazon.com/panorama/appliance/){:rel="nofollow"} or even not in space but almost
thanks to [AWS Ground Station](https://aws.amazon.com/ground-station/){:rel="nofollow"}. Integrators can also use
[FreeRTOS](https://aws.amazon.com/freertos/){:rel="nofollow"} to securely deploy, connect and manage their device
fleets. If you need ultra low latency you can deploy critical parts of your applications at the edge with
[AWS WaveLength](https://aws.amazon.com/wavelength/){:rel="nofollow"}.

We have progresssively broken every barrier to deploying and connecting services anywhere, from remote locations to
space. All of these services share the same AWS experience: programmable, composable. Together, they form what Werner
Vogels calls the **Everywhere Cloud**.

![For Builders of all horizons](/assets/img/posts/20211202/new-world.png)

## The future belongs to Builders

### Global Network capabilities

Now that we can deploy anywhere and anytime, where will AWS go next? First, il will come closer to the end users with
more Regions, Edge locations, Local Zones, more capabilities to AWS Outposts, the Snow Family, IoT services and the 5G
Network. 30 new Local Zones have been announced and will be deployed starting 2022. The vast majority of them will be
located outside the United States. There will be one in a city held dear by Werner himself: Amsterdam!

With all these possibilities, companies may manage networks spanning across all continents and reaching millions of
devices and users. In order to get the same experience everywhere, AWS released
[AWS Cloud WAN](https://aws.amazon.com/about-aws/whats-new/2021/12/introducing-aws-cloud-wan/){:rel="nofollow"} in
Preview. AWS Cloud WAN is a dashboard that helps network engineers program their network, create and manage isolated
segments, define routing rules, diagnose connectivity issues and add observability to their platform through the network
lens.

But that is not all: the teams behind
[Network Reachability Analyzer](https://aws.amazon.com/about-aws/whats-new/2020/12/amazon-vpc-announces-reachability-analyzer-to-simplify-connectivity-testing-and-troubleshooting/){:rel="nofollow"}
were hard at work to provide a new network analysis tool called
[Network Access Analyzer](https://aws.amazon.com/about-aws/whats-new/2021/12/amazon-vpc-network-access-analyzer/){:rel="nofollow"}.
Also based on Automated Reasoning, this tool allows configuring Network requirements for Cloud infrastructures and, for
each Elastic Network Interface, analyzes network rules to check whether the requirements are met. This class of tools
helps Network teams make informed decisions and simplify compliance work and we hope they become mainstream and
proactive —preview changes— instead of reactive —react to changes— over time.

Reducing or outright eliminating the chores seems to be part of the future strategy of AWS and there is much to
appreciate about it. Take for instance IP address management. Some organisations track their CIDRs and IP address
assignments using spreadsheets or internally developed solutions. There is now a native solution for that too:
[IP Address Manager](https://aws.amazon.com/about-aws/whats-new/2021/12/amazon-virtual-private-cloud-vpc-announces-ip-address-manager-ipam/){:rel="nofollow"}
which manages, tracks and assigns IP addresses automatically, removing this burden from individuals and further
simplifying compliance and auditing work. Note that these services can only get better over time thanks to customer
feedback therefore evaluating them today can give you a valuable lead start.

### Development work

The next population is developers of any kind. Developing services that integrate with AWS will get easier soon thanks
to a collection of releases for the community including some **by** the community!
[Kotlin](https://aws.amazon.com/about-aws/whats-new/2021/12/aws-sdk-kotlin-developer-preview/){:rel="nofollow"},
[Swift](https://aws.amazon.com/about-aws/whats-new/2021/12/aws-sdk-swift-developer-preview/){:rel="nofollow"} and
[Rust](https://aws.amazon.com/about-aws/whats-new/2021/12/aws-sdk-rust-developer-preview/){:rel="nofollow"} are the next
languages to receive support for the AWS SDK! All engineered to follow their respective language development and
dependency management best practices including interfacing with AWS. Currently in developer preview! That's not all:
earlier this year,
[AWS announced AWS Cloud Development Kit (CDK) v2](https://aws.amazon.com/about-aws/whats-new/2021/04/aws-cloud-development-kit-aws-cdk--v2-and-go-cdk-is-now-available-for-developer-preview/){:rel="nofollow"}
and the support for Go both in developer preview. Now,
[AWS CDK v2 is generally available](https://aws.amazon.com/about-aws/whats-new/2021/12/aws-cloud-development-kit-cdk-generally-available/){:rel="nofollow"}
for all supported languages except Go which is still in preview. AWS CDK v2 introduced the
[Watch mode](https://docs.aws.amazon.com/cdk/v2/guide/cli.html#cli-deploy-watch){:rel="nofollow"}, which greatly
simplifies development of applications in the Cloud by watching for local file system changes, continuously building
your stack definitions and deploying the changes automatically. Changes made to Lambda functions can be synchronized in
near real-time for faster iteration.

Today, trends that benefit development work include AI assistants such as
[GitHub Copilot](https://copilot.github.com/){:rel="nofollow"}, using SaaS or managed services, using no-code solutions
such as [Amazon HoneyCode](https://www.honeycode.aws/){:rel="nofollow"} or
[Amazon QuickSight Q](https://aws.amazon.com/quicksight/q/){:rel="nofollow"} and using tools and libraries that
implement patterns like
[CDK Constructs](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html){:rel="nofollow"}. Let's start with
Constructs: with the release of [Construct Hub](https://constructs.dev/){:rel="nofollow"}, there are now hundreds of
constructs submitted by AWS, HashiCorp and the community to implement complex patterns in only a minimal amount of lines
of code! And you can contribute your own constructs back to the community! You can also integrate with third-party
vendors and create constructs out of other constructs!

Moving on to frontend. There are solutions to simplify the integration of Figma components or to retrieve just the right
amount of data with GraphQL. However, integrating with backend is another beast. No-Code tools are No-Code until you
need something specific that cannot be accomplished out of the box. This and more is why AWS is announcing
[AWS Amplify Studio](https://aws.amazon.com/about-aws/whats-new/2021/12/aws-amplify-studio/) in public preview.
Development teams can accelerate their work thanks to its visual development and data management capabilities,
customizable Figma components and the possibility to export the code and customize it.

### Solution architecture

AWS runs global infrastructure for a large number of customers and individuals and provides more than two hundred
services, some core, some composed of other services just like
[AWS Lake Formation](https://aws.amazon.com/lake-formation/){:rel="nofollow"},
[AWS App Runner](https://aws.amazon.com/apprunner/){:rel="nofollow"} and
[AWS Amplify](https://aws.amazon.com/amplify/){:rel="nofollow"}.

AWS design their services with performance and scalability front and center and built a Cloud so that organizations can
not only scale out —add capacity— but also **scale in**. This was the **actual** revolution more than ten years ago. New
development models arrived with the advent of containers, serverless, infrastructure as code, functions as a service and
the resurgence of static website builders. There is demand for frugal solutions to complex needs.

Shifting our paradigms for compute models can make us realize that by relaxing or dropping good-to-have requirements we
could significantly reduce the footprint of our solutions. Choosing the latest infrastructure components, the best
regions for the workloads and keeping up to date also helps projects running efficiently on the Cloud and keeping up
with the demand.

This leads us to the question of sustainability, which has become a growing concern over the last years. Amazon and AWS
are both committed to reduce their environmental footprint, including electricity and water usage and carbon-equivalent
emissions. Soon, customers will be able to evaluate their climate impact on AWS too thanks to the recently announced
[AWS Customer Carbon Footprint Tool](https://www.aboutamazon.com/news/aws/aws-re-invent-2021-what-you-need-to-know?p=aws-announces-customer-carbon-footprint-reporting){:rel="nofollow"}
available early 2022.

To help customers transition to more sustainable alternatives, in addition to this report, a sixth Pillar has been added
to the Well Architected Framework:
[Sustainability](https://aws.amazon.com/about-aws/whats-new/2021/12/new-sustainability-pillar-aws-well-architected-framework/
){:rel="nofollow"}. The updated Pillars of the Well Architected Framework are:

- Security
- Performance efficiency
- Operational excellence
- Reliability
- Cost optimization
- **Sustainability**

Finally, for Cloud practitioners of all kinds, a new platform will soon become the reference for questions and
authoritative answers: [re:Post](https://repost.aws/). You can connect with your AWS user account and start asking and
answering questions today or search for accepted answers.

## Your turn now

This was the last post of the series following the 2021 re:Invent Keynotes and announcements. AWS strives to make their
platforms more accessible to everyone and their services and tools more capable and scalable while committing themselves
to reduce their environmental footprint and by proxy their customers'.

If you are a builder or even if you are not, the time is ideal to pick up your tools and try your hand at Machine
Learning or development work to build the tool or website you always dreamed of. As Werner says,
"[Now go build](https://aws.amazon.com/startups/NowGoBuild/){:rel="nofollow"}"!
