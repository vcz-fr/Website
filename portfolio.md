---
layout: default
active: portfolio
---

<div id="portfolio">
<div class="card" markdown="1">

## When boredom strikes

The tiles of this section will give you an overall idea of my favorite pass-time. It is just the _tip of the iceberg_
and I would be delighted to further go into details about projects that did not make it to this list because reasons.

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

{{ item.description | markdownify }}

{% if item.link != "#" %}[Let's go!]({{item.link}}){% endif %}

</div>

</div>
{% endfor %}

</div>