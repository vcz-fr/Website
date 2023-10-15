---
layout: default
active: resume
---

<div class="card" markdown="1">

## The Resume

Thank you for the time you have spent discovering this website. Did you know that it only uses HTML and CSS? That is
correct, no JavaScript. It is open source, hosted and delivered by [Cloudflare](https://www.cloudflare.com/){:rel="nofollow"}
and uses [Jekyll](https://jekyllrb.com/){:rel="nofollow"} to generate content.

If you want to leave with something, here are my generic resumes. Don't forget to send me a message!

</div>

{% for item in site.data.resume %}
<div class="card" markdown="1">

### {{item.language}}

[Link](/assets/resume/{{item.file}}) — last modified {{item.last-modified | date: "%m/%d/%Y"}}

</div>
{% endfor %}