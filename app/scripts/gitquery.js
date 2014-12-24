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
