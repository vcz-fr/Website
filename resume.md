---
layout: default
active: resume
---

<div class="card" markdown="1">

## The Resume

Again, thank you for the time you have spent discovering this website. Did you know that it only uses HTML and CSS for
everything? That is correct, no JavaScript. It is open source, hosted and delivered by [Cloudflare](https://www.cloudflare.com/){:rel="nofollow"}
and uses [Jekyll](https://jekyllrb.com/){:rel="nofollow"} to generate content!

Anyway, if you want to find out more, here are my generic resumes. Don't forget to come see me on my social networks!

</div>

{% for item in site.data.resume %}
<div class="card" markdown="1">

### {{item.language}}

[Link](/assets/resume/{{item.file}}) — last modified {{item.last-modified | date: "%m/%d/%Y"}}

</div>
{% endfor %}