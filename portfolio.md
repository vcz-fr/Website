---
layout: default
active: portfolio
---

<div id="portfolio">
<div class="card" markdown="1">

## The past, the present

This is a showcase of my past and present work. There are repeating themes, ideas and technologies. This is only the
_tip of the iceberg_ and I would enjoy going into details about projects that did not make it to this list.

</div>

{% for item in site.data.portfolio %}
<div class="card portfolio-item">
    <picture class="portfolio-image">
        {% if item.image.exts contains "avif" %}
        <source type="image/avif" srcset="/assets/img/portfolio/{{item.image.id}}.avif">
        {% endif %}
        {% if item.image.exts contains "webp" %}
        <source type="image/webp" srcset="/assets/img/portfolio/{{item.image.id}}.webp">
        {% endif %}
        <img alt="{{item.name}}" loading="lazy" decoding="async" src="/assets/img/portfolio/{{item.image.id}}.webp">
    </picture>
<div markdown="1">

### {{ item.name }}

{{ item.description  }}

{% if item.link.url != "#" %}[Let's go!]({{item.link.url}}){% unless item.link.follow %}{:rel="nofollow"}{% endunless %}{% endif %}

</div>

</div>
{% endfor %}

</div>