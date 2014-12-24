function kimonoCallback(data) {
    var $this = data; 
    var posts = $this.results.posts;
    $.each(posts, function(key, post){
      var title = post.title.text;
      var link  = post.title.href;
      var desc  = post.description.text;
      $('.blog-feed').append('<li class="item"> <header><h2><a href="'+link+'">'+title+'</a></h2><span class="story-share"><a href="http://www.twitter.com/share?url='+link+'&text=A%20Medium%20post%20of%20@LukyVj%20" target="_blank"><span class="icon-twitter"></span></a>  <a href="http://www.facebook.com/sharer/sharer.php?u='+link+'&t=A%20Medium%20post%20of%20@LukyVj%20" target="_blank"><span class="icon-facebook"></span></a></span></header><p>'+desc+'</p></li>');
    });
  }

  $.ajax({
    "url":"https://www.kimonolabs.com/api/5806o9dk?apikey=V0DwgBZ7AxNN5qo5ILIFLVx5pvFqoM26&callback=kimonoCallback",
    "crossDomain":true,
    "dataType":"jsonp"
  });
