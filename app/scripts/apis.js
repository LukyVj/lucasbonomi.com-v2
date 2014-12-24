//Github Api
jQuery.gitUser = function(username, callback) {
    jQuery.getJSON("https://api.github.com/users/"+username+"/repos?sort=created?per_page=16?access_token=e642b7759c83db790f5c52623f4f894cb765a0e7&client_id=3e90e28f90fcdd904183&client_secret=c59b5e8168be6f58d853da62522965e4d7b9d211&callback=?", callback)
}
jQuery.fn.getRepos = function(username) {
    this.html("<h2 style=\"color:#FFF;\">Hold on tight, digging out " + username + "'s repositories...</h2><br>");
    var target = this;
    $.gitUser(username, function(data) {
        var repos = data.data;
        sortByForks(repos);
        var list = $('.github-feed');
        target.empty().append(list);
        $(repos).each(function() {
            checkfork = this.fork;
            if ((this.name != (username.toLowerCase() + '.github.com')) && (checkfork != true)) {
                list.append('<li class="item"><a href="' + (this.homepage ? this.homepage : this.html_url) + '" target="_blank"><div class="item-card"><span class="title">' + this.name + '</span> <span class="url">'+ this.html_url +'</span><span class="git-infos"> <span class="icon-code-fork"></span> ' + this.forks + '  |  <span class="icon-eye"></span> ' + this.watchers + '  |  <span class="icon-star"></span>'+ this.stargazers_count +'  </span> <code data-code="'+this.language+'">' + (this.language ? ('(' + this.language + ')') : '') + '</code></div></a> ');
            }
        });
    });

    function sortByForks(repos) {
        repos.sort(function(a, b) {
            return a.forks - b.forks;
        });
    }
};

// Dribbble Api
(function(e) {
    "use strict";
    e.jribbble = {};
    var t = function(t, s) {
            e.ajax({
                type: "GET",
                url: "http://api.dribbble.com" + t,
                data: s[1] || {},
                dataType: "jsonp",
                success: function(e) {
                    e === undefined ? s[0]({
                        error: !0
                    }) : s[0](e)
                }
            })
        },
        s = {
            getShotById: "/shots/$/",
            getReboundsOfShot: "/shots/$/rebounds/",
            getShotsByList: "/shots/$/",
            getShotsByPlayerId: "/players/$/shots/",
            getShotsThatPlayerFollows: "/players/$/shots/following/",
            getPlayerById: "/players/$/",
            getPlayerFollowers: "/players/$/followers/",
            getPlayerFollowing: "/players/$/following/",
            getPlayerDraftees: "/players/$/draftees/",
            getCommentsOfShot: "/shots/$/comments/",
            getShotsThatPlayerLikes: "/players/$/shots/likes/"
        },
        o = function(e) {
            return function() {
                var s = [].slice.call(arguments),
                    o = e.replace("$", s.shift());
                t(o, s)
            }
        };
    for (var r in s) e.jribbble[r] = o(s[r])
})(jQuery, window, document);

// Medium Api 
function kimonoCallback(data) {
    var $this = data; 
    var posts = $this.results.posts;
    $.each(posts, function(key, post){
      var title = post.title.text;
      var link  = post.title.href;
      var desc  = post.description.text;
      $('.blog-feed').append('<li class="item"><div><header><h2><a href="'+link+'">'+title+'</a></h2><span class="story-share"><a href="http://www.twitter.com/share?url='+link+'&text=A%20Medium%20post%20of%20@LukyVj%20" target="_blank"><span class="icon-twitter"></span></a>  <a href="http://www.facebook.com/sharer/sharer.php?u='+link+'&t=A%20Medium%20post%20of%20@LukyVj%20" target="_blank"><span class="icon-facebook"></span></a></span></header><div><p>'+desc+'</p></div></div></li>');
    });
  }

  $.ajax({
    "url":"https://www.kimonolabs.com/api/5806o9dk?apikey=V0DwgBZ7AxNN5qo5ILIFLVx5pvFqoM26&callback=kimonoCallback",
    "crossDomain":true,
    "dataType":"jsonp"
  });
