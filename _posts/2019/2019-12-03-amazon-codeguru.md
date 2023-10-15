---
title: "Amazon CodeGuru: quality before all else"
categories: ["Cloud"]
tags: ["repost", "gekko", "cloud", "aws", "re:invent"]
---

**Words of notice:** This is an article I wrote for [Gekko](https://www.gekko.fr/). Many thanks for their consent to
sharing this story here.

***

_Gekko @ re:Invent 2019 – Tuesday, December 3rd of 2019_

## An artistic blur of quality

The notion of code quality is paradoxically one of the elements that divide development teams, but which nevertheless
exposes fundamental notions that have been anchored for decades in the field. At the turn of a conversation between
followers of [Software Craftsmanship](https://en.wikipedia.org/wiki/Software_craftsmanship){:rel="nofollow"}, we can
hear about technical debt, dead code elimination or, for the most subtle, [cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity){:rel="nofollow"}.

Developing a service requires writing code. Every new feature beyond the basic trivial brick requires wiring to the
existing code. Therefore, a development will contain phases of reading code. In the best case scenario, this reading is
fluid; understanding the purpose of each structure, function, file or other element of the code and incrementing it with
the development of a new feature is easy. But what happens in the other cases?

<!-- READ MORE -->

It is common to want to implement features as quickly as possible while ensuring a contained development cost and a
preserved scope. It is hard to keep the balance in this triangle without taking shortcuts. By using less recommendable
techniques and methods, one can reach an equivalent result much faster, at the risk of causing what is called the
"technical debt".

Seen from another angle, technical debt is a form of consumer credit: it can be contracted, generates interest and
must be repaid at term, since the code will have to be reinterpreted afterwards, understood, incremented and corrected.

Fortunately, there are solutions that limit the creation of debt. One of them is to have a third party member of the
development team proofread the feature code. However, this solution brings with it a significant cost, especially since
code proofreading is not always the most pleasant task.

_What to do then?_

## The mysterious road to performance

Along with the concerns that one might have about the quality of a product, similar questions about its performance may
arise. Indeed, behind this vague concept lie many indicators that cannot always be tracked or optimized and that will
have to be dealt with, especially when there is not enough time to think about more elegant solutions. Indicators
include CPU load, RAM and storage usage, network latency and so on.

In reality, performance is rarely the primary concern during development. A product is expected to perform before it can
be verified that it performs properly and scales. Moreover, it is difficult to emulate the behavior of a production
environment on a local workstation and expensive to validate the performance of each change. We may thus find ourselves
having to explore the different notions of load or performance testing in a dedicated environment, or even in
production! In other words, it is difficult to assess the impact of a feature, or even a line of code on the indicators
that attest to the proper functioning of a service.

_What to do then?_

## Amazon CodeGuru

As a new addition to the AWS Code\* services -AWS CodeBuild, AWS CodeCommit, AWS CodeDeploy, AWS CodePipeline and AWS
CodeStar- dedicated to development teams, Amazon CodeGuru simultaneously attacks the fronts presented above, namely code
review and detection of performance issues. A question immediately arises: how can an automated system be entrusted with
a task that is usually performed by humans?

Thanks to advances in artificial intelligence and machine learning, trained using thousands of projects and millions of
code reviews internally at Amazon as well as on open source repositories, Amazon CodeGuru is able to provide relevant
recommendations to complement the skills of experts and improve the stability and performance of a system before it goes
live, at the Pull Request level. In addition, this tool is also capable of analyzing the use of the AWS SDK to detect
possible inefficiencies.

Amazon CodeGuru does not stop there: there is a profiler agent you can include in your application. After your
application goes into production, it becomes possible to observe its behavior in order to detect additional issues and
be offered prioritized recommendations. The aim is to eliminate the most pressing performance inefficiencies and
therefore to reduce the prerequisites in terms of infrastructure and, by extension, the costs involved in running your
service!

The benefits of this solution have ripple effects; Amazon CodeGuru makes development teams aware of the performance of
their systems, reduces the load and difficulty of the code review process, improves the experience of a product for
end users, all while paying for itself by reducing the operational costs.

If this preliminary introduction to this new service has captured your interest, the next step is to [try and adopt
Amazon CodeGuru](https://console.aws.amazon.com/codeguru/){:rel="nofollow"}.