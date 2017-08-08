---
layout: default
---
# Blogposts

{% for post in site.posts %}

[<img src="https://avatars.githubusercontent.com/{{post.author}}" style="border-radius: 30px" height="60px" alt="{{post.authorname}}">](http://github.com/{{post.author}}) 
**[{{post.title}}]({{ post.url | relative_url }})**  
{{ post.preview }} [Continue...]({{ post.url | relative_url }})  
<span class="postedBy" style="vertical-align:top; display:inline">Added by [{{post.authorname}}](http://github.com/{{post.author}}) on {{ post.date | date: "%b %-d, %Y" }}
</span>

{% endfor %}

