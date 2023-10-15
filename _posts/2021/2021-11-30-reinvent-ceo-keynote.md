---
title: "re:Invent 2021 - Selipsky's Keynote"
categories: ["Cloud"]
tags: ["re:invent", "cloud", "keynote"]
---

![Header image](/assets/img/posts/20211130/header.png)

_Do you remember when the first Amazon Web Services launched? That was in 2006!_

The least we can say about AWS is that their growth has been phemonenal since day one. Fifteen years ago, in 2006, the
Cloud was another fad like Facebook, Youtube or the Nintendo Wii. Yet, if we are here today to tell you about our
success stories, it is because the Cloud was no fad after all.

The first services were Amazon S3 and then Amazon EC2. They were certainly not as feature complete as they are today nor
as integrated with many other services. Nevertheless, despite all the hacks you had to implement to bring your
applications online, both of these offerings were revolutionary.

<!-- READ MORE -->

For the fifteenth year, AWS did not skip on the details for one of their most important keynotes. But this one was
special: instead of Andy Jassy, which succeeded Jeff Bezos as the CEO of Amazon earlier this year, we saw Adam Selipsky
take the stage.

![Gartner Magic Quadrant for Cloud Infrastructure and Platform services](/assets/img/posts/20211130/gartner.png)

After a quick summary of AWS's history throughout the years, Adam started with a news that might not surprise you
anymore: AWS is the Leader for Cloud Infrastructure and Platform services in [Gartner's Magic Quadrant Report](https://www.gartner.com/doc/reprints?id=1-271OE4VR&ct=210802){:rel="nofollow"}
for the eleventh consecutive year. And it shows: this year, AWS focused their efforts to not only grow in terms of
technical offering but also and primarily in terms of industries. In terms of strategy, this is significant as it shows
that AWS is mature and trusted enough that they can afford building off-the-shelf solutions that enable companies to
focus on their business while leveraging AWS's scale.

Examples of this customer obsession include Nasdaq, Dish, 3M and United Airlines, whose representatives noted their
close cooperation with AWS on their migrations and cutting edge works. Moments later, Adam Selipsky announced a slew of
new offerings that all have something in common. Try to guess:

- [AWS Mainframe Modernization](https://aws.amazon.com/about-aws/whats-new/2021/11/introducing-aws-mainframe-modernization/){:rel="nofollow"},
  which lowers the barrier to entry for companies wishing to move out of mainframe infrastructures;
- [AWS Private 5G](https://aws.amazon.com/about-aws/whats-new/2021/11/preview-aws-private-5g/){:rel="nofollow"},
  allowing customers to provision their own private 5G network in a matter of days instead of months while AWS provides
  and maintains the equipment. Customers only pay for the provisioned network, not the number of connected devices;
- [AWS IoT FleetWise](https://aws.amazon.com/about-aws/whats-new/2021/11/aws-iot-fleetwise-transferring-vehicle-data-cloud/){:rel="nofollow"},
  a solution to collect, store and analyze data from very large fleets of vehicles with the aim of giving insights into
  their behaviors on the road and help the training of driver assistance systems;
- [AWS IoT TwinMaker](https://aws.amazon.com/about-aws/whats-new/2021/11/aws-iot-twinmaker-build-digital-twins/){:rel="nofollow"},
  to create realistic digital twins of equipments fed with real time data and CAD files. Digital twins are very valuable
  when simulating changes to the equipment or its environment, versus producing prototypes;
- [Goldman Sachs Financial Cloud for Data](https://www.goldmansachs.com/media-relations/press-releases/2021/goldman-sachs-aws-announcement-30-nov-2021.html){:rel="nofollow"},
  bringing the best of financial analysis and cloud computing together to deliver a [specialized platform](https://developer.gs.com){:rel="nofollow"}
  for Financial Services organizations.

Most of these announcements are closely related to an industry. The rest of us who wish to tacke novel problems also
need new set of tools and AWS delivered.

![Recently announced EC2 instances](/assets/img/posts/20211130/ec2-instances.png)

Two years ago, [AWS introduced Inferentia](https://aws.amazon.com/blogs/aws/amazon-ec2-update-inf1-instances-with-aws-inferentia-chips-for-high-performance-cost-effective-inferencing/){:rel="nofollow"},
a new set of EC2 instances aimed at optimizing inference workloads and powering Alexa. Compared to GPU instances, EC2
Inf1 significantly reduces cost and latency and increases throughput! However, Machine Learning is not just limited to
inference: models have to be trained before being put to production. That is exactly why [Trainium1 EC2 instances](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-ec2-trn1-instances/){:rel="nofollow"}
have been announced. Plus, they have an edge: for very complex models, you can scale instances to the tens of thousands!
In Preview at the time of writing, keep an eye out if you are interested.

At the same time, Machine Learning should become more accessible. Building on the success of [Amazon QuickSight Q](https://aws.amazon.com/quicksight/q/){:rel="nofollow"},
the service which involved Natural Language Understanding, Business Intelligence and Data Vizualization, a new solution
was needed to automate Machine Learning model creation. Enters [Amazon SageMaker Canvas](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-sagemaker-canvas-machine-learning-models/){:rel="nofollow"},
which is powered by [Amazon SageMaker Autopilot](https://aws.amazon.com/sagemaker/autopilot/){:rel="nofollow"}, a
solution that automaticaly generates relevant ML models based on input data.

On that note, building real-time data pipelines backed by a datalake will get simpler thanks to [AWS Lake Formation Governed Tables](https://aws.amazon.com/about-aws/whats-new/2021/11/aws-lake-formation-governed-tables-storage-security/){:rel="nofollow"},
which will listen to S3 events, handle merges and errors and optimizes storage to minimize query time. Moreover,
building projections to limit the data that a certain group of users can access is a thing of the past thanks to row and
cell-level permissions!

Let's not forget about the more structured data sources, database services. They are among the hardest to estimate and
scale, which leaves optimizations on the table when they are not underprovisioned. To help customers stop guessing their
infrastructure, [Amazon EMR](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-emr-serverless-preview/){:rel="nofollow"},
[Amazon Kinesis Data Streams](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-kinesis-data-streams-on-demand/){:rel="nofollow"},
[Amazon MSK](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-msk-serverless-public-preview/){:rel="nofollow"}
and [Amazon Redshift](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-redshift-serverless/){:rel="nofollow"}
now all support serverless or on demand pricing options.

And finally, last but not least, if you closely follow ARM news you might have noticed that Graviton2 is based on ARM
Neoverse N1 cores and that ARM has announced their Neoverse roadmap last year with very enticing year over year
improvements.

![ARM Neoverse 2020 roadmap](/assets/img/posts/20211130/arm-neoverse-roadmap.png)

You get better performance, more connectivity in a controlled power draw thanks to node size improvements. But what are
the fundamental differences between those three Neoverse series?

![ARM Neoverse series](/assets/img/posts/20211130/arm-neoverse-series.png)

Basically, _V_ is the Performance line-up, _N_ the Balanced line-up and _E_ the Efficiency line-up. Why are we talking
about this? Because AWS just introduced [C7g EC2 instances](https://aws.amazon.com/about-aws/whats-new/2021/11/amazon-ec2-c7g-instances-aws-graviton3-processors/){:rel="nofollow"}
and if the "g" prefix rings a bell for you, it is because they are powered by **Graviton3** processors. You read that
right, it is time for the third generation of ARM based, Amazon developed, highly cost-effective processors! Also in
preview at the time of writing, sign up on the [preview invitation form](https://pages.awscloud.com/C7g-Preview.html){:rel="nofollow"}
if this caught your attention too!

If we look closer to the announcement and to the images above, the performance uplift is more than what you could
achieve with a generational update; these are the sign of Neoverse V1 cores. Were this correct, this could translate to
greater improvements down the line for services adapted to make full use of the ARMv9 instruction set and the
capabilities of the chip. Not just for customers but also AWS services with Graviton options such as Amazon RDS, Amazon
Elasticache, AWS Lambda, Amazon ECS, etc.

![ARM Neoverse V1](/assets/img/posts/20211130/arm-neoverse-v1.png)

Even though the announcement flow was not as dense as last year's, they all reflect the evolution of the platform. AWS
has always had the lead and today they are graduating into industry partners and not just technological partners.

## Your turn now

What a great time to be a Cloud engineer! But wait, we are just getting started. Check back soon for new announcements
on this week of re:Invent. Or check out the [AWS Blog](https://aws.amazon.com/blogs){:rel="nofollow"} if you cannot wait!