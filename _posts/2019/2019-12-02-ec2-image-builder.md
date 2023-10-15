---
title: "EC2 Image builder: building EC2 AMIs the AWS way"
categories: ["Cloud"]
tags: ["repost", "gekko", "cloud", "aws", "re:invent"]
---

**Words of notice:** This is an article I wrote for [Gekko](https://www.gekko.fr/). Many thanks for their consent to
sharing this story here.

***

_Gekko @ re:Invent 2019 – Monday, December 2nd of 2019_

## The issue with image building

[Amazon Elastic Compute Cloud](https://aws.amazon.com/ec2/){:rel="nofollow"} or [EC2](https://aws.amazon.com/ec2/){:rel="nofollow"}
is one of the AWS top services. Its scope in terms of covered needs is immense and grows constantly with the
introduction of new variants of operating systems, services and additional hardware.

When a service is that ubiquitous, it becomes a standard and naturally forms its ecosystem. Today, this new feature
concerns one of the weakest links of EC2 which will certainly have caused headaches to more than one person: [Amazon Machine Images](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html){:rel="nofollow"}
construction.

<!-- READ MORE -->

Take the example of [Docker](https://www.docker.com/){:rel="nofollow"}. To create an image, it is common to use a [Dockerfile](https://docs.docker.com/engine/reference/builder/){:rel="nofollow"}
as a base which gets executed with `docker build` or with [Buildah](https://buildah.io/){:rel="nofollow"}. This process
executes a set of instructions, potentially accompanied by tests and produces the image. We can then create an
environment, the container, from this image or send it to a system that will host and distribute it, the registry.

How does this translate for AWS? Until now, it has been necessary to set up a process that starts an EC2, retrieves the
components to install and saves the instance. This requires a tight process due to the future production of the AMI and
the use of third party automation tools such as [Ansible](https://www.ansible.com/){:rel="nofollow"} or [Packer](https://www.packer.io/){:rel="nofollow"}.
Third-party solutions have their advantages and disadvantages: the need can be filled more easily although the solution
becomes less flexible and will cause operational friction due to communication between tools.

Therefore, AWS lacked a component to integrate this link into the EC2 production chain. Comes **EC2 Image Builder**.

## EC2 Image Builder

Designed to offer the widest range of possibilities, EC2 Image Builder simplifies the necessary steps to the creation of
an AMI from the choice of its operating system, software components and tests to the configuration of the building
process itself. In addition to this, EC2 Image Builder can automate the triggering of a build, allow images to opened to
the public, replicate them on other regions, apply a license automatically, add tags, choose the hardware that will
compile it, send status notifications and and so on and so forth.

This solution would not be complete if it did not offer flexibility to its users. Although EC2 Image Builder only
supports Amazon Linux 2, Windows 2012R2, 2016 and 2019 operating systems, it offers software components for **creating**
solutions using PHP, Java -with [Amazon Corretto](https://aws.amazon.com/corretto/){:rel="nofollow"}-, Docker, Python,
to **secure** them applying [STIG](https://en.wikipedia.org/wiki/Security_Technical_Implementation_Guide){:rel="nofollow"}
and allowing operating system updates and **testing** them by checking their status, their ability to create files,
connect to the network, reboot, use a package manager or connect with SSH. In addition, it is possible to add your own
components to create solutions based on different technologies, secure them and test them in a more varied way.

From the fact that it is integrated with AWS, EC2 Image Builder is a solution to consider when you want to automatically
generate AMIs that are always up to date for its applications. Its integration with AWS limits the risks related to third party solutions while making sensible use of resources. At no extra cost, only the infrastructure executing
the image-building process is charged.

> Image Builder is offered at no cost, other than the cost of the underlying AWS resources used to create, store, and
share the images.

Coupled with SNS and AWS Lambda, EC2 Image Builder can complete an architecture by generating an image than can be used
by groups of instances. The image generation process can be triggered manually or scheduled, which can be interesting in
the context of automating the updates of an application.

Finally, it is important to note that the AWS SDKs have been updated to support AWS EC2 Image Builder: [Python](https://github.com/boto/boto3/blob/develop/.changes/1.10.29.json){:rel="nofollow"},
[Go](https://github.com/aws/aws-sdk-go/releases/tag/v1.25.44){:rel="nofollow"}, [JavaScript](https://github.com/aws/aws-sdk-js/blob/master/CHANGELOG.md#25810){:rel="nofollow"},
[.NET](https://github.com/aws/aws-sdk-net/blob/master/SDK.CHANGELOG.md#336400-2019-12-02-0931-utc){:rel="nofollow"}, [Java](https://github.com/aws/aws-sdk-java/blob/master/CHANGELOG.md#111684-2019-12-02){:rel="nofollow"},
[Java v2](https://github.com/aws/aws-sdk-java-v2/blob/master/.changes/2.10.26.json){:rel="nofollow"}, [PHP](https://github.com/aws/aws-sdk-php/releases/tag/3.124.0){:rel="nofollow"}
and [Ruby](https://github.com/aws/aws-sdk-ruby/releases/tag/v2.11.407){:rel="nofollow"}. This suggests that applications
that are dependent on these libraries will be updated in turn in the near future.

## Demonstration

![Step 1: Recipe](/assets/img/posts/20191202/step1-recipe.png)

The user interface uses the most recent AWS design guidelines for their services. Be careful however not to press the
Back button inadvertently: this has the effect of reinitializing the form.

The first step defines the contents of the AMI to create and the tests to run. It is also during this step that we
indicate that the image must remain up to date with respect to its base.

![Step 2: Pipeline](/assets/img/posts/20191202/step2-pipeline.png)

The second step of the process definition relates to the configuration of process itself: the EC2 instances on which it
is going to be based, its update frequency, the EC2 role, the VPC, etc.

This step is very important as it lays the foundations for a secure AMI construction process with controlled and limited
access. This line of thinking is commonly found in AWS good practice examples.

![Step 3: Additional configuration](/assets/img/posts/20191202/step3-additional.png)

Then comes the additional configuration. This step concerns the image distribution parameters, the tags to be applied
and the license to be associated, optionally.

We can also notice that it is possible to dedicate an AWS account of an organization to AMI creation. The images can
then be automatically exposed to the AWS accounts of the organization that wish to use them.

![Step 4: Review](/assets/img/posts/20191202/step4-review.png)

Finally, the last step of the process definition is a review before validation. The process will not start immediately
after its creation. Its first run will follow the frequency assigned to it.

EC2 Image Builder is available in all AWS regions. All that remains now is to [discover the service](https://console.aws.amazon.com/imagebuilder/){:rel="nofollow"}.
