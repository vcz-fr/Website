---
layout: default
active: resume
---

<div class="card" markdown="1">

## The Resume

Thank you for the time you spent discovering this website. This website is statically generated and only contains trace
amounts of JavaScript for your browsing pleasure. It is open source, hosted and delivered by [Cloudflare](https://www.cloudflare.com/){:rel="nofollow"}
and uses [Jekyll](https://jekyllrb.com/){:rel="nofollow"} to generate content.

And if you insist on leaving with something here are my generic resumes. Don't forget to send me a message!

</div>

{% for item in site.data.resume %}
<div class="card" markdown="1">

### {{item.language}}

[Link](/assets/resume/{{item.file}}) — last modified {{item.last-modified | date: "%m/%d/%Y"}}

</div>
{% endfor %}