---
layout: layout
permalink: /tutorials/
title: Tutorials
---
I like to write tutorials, right now all of these are intended for fellow
students at [Codam](https://www.codam.nl/) but I may create more general
tutorials later.

{% for post in site.posts %}
{% if post.unlisted != true and post.lang == "en" %}
  <h1>
    <a href="{{ post.url }}">{{ post.title }}</a>
    <span class="date">{{ post.date | date: "%Y-%m-%d" }}</span>
  </h1>
  {{ post.excerpt }}
{% endif %}
{% endfor %}
