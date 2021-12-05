---
layout: default
active: resume
---

<div class="card" markdown="1">

## The Resume

Again, thank you for the time you have spent discovering this website. Did you know that it only uses HTML and CSS for
everything? That is correct, no JavaScript. It is hosted on [GitHub Pages](https://pages.github.com/){:rel="nofollow"},
using [Jekyll](https://jekyllrb.com/){:rel="nofollow"} to generate the content you see on your screen and is delivered
to you by [Cloudflare](https://www.cloudflare.com/){:rel="nofollow"}!

Anyway, if you want to find out more, here are my generic resumes. Don't forget to come see me on my social networks!

</div>

{% for item in site.data.resume %}
<div class="card" markdown="1">

### {{item.language}}

[Link](/assets/resume/{{item.file}}) — last modified {{item.last-modified | date: "%m/%d/%Y"}}

</div>
{% endfor %}