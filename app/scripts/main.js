
$(document).ready(function(){


  function san(){
    $('body').removeClass('modal-open');
    $('*').on('click', function(){
      $('body').removeClass('modal-open');
    })

    setTimeout(function(){
      $('.m-card').removeClass('hidden')
    }, 1000)
  }
  function credits(){
    console.log('CREDITS')
    console.log('------------------------------')
    console.log('Original Design by Kevin Cudennec ( @kevinCdnc | http://kevincdnc.com )')
    console.log('Code : Lucas Bonomi ( @LukyVj | http://lucasbonomi.com )')
    console.log('Thanks to : Felix de Montis ( @dervondenbergen | http://demont.is )')
    console.log('------------------------------')
  }

  function particlesLaunch($element){
    particlesJS($element, {
      particles: {
        color: '#fff',
    shape: 'circle', // "circle", "edge" or "triangle"
    opacity: 1,
    size: 2,
    size_random: true,
    nb: 200,
    line_linked: {
      enable_auto: true,
      distance: 100,
      color: '#fff',
      opacity: 1,
      width: .5,
      condensed_mode: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    },
    anim: {
      enable: true,
      speed: 1
    }
  },
  interactivity: {
    enable: true,
    mouse: {
      distance: 250
    },
    detect_on: 'canvas', // "canvas" or "window"
    mode: 'grab',
    line_linked: {
      opacity: .5
    },
    events: {
      onclick: {
        enable: true,
        mode: 'push', // "push" or "remove" (particles)
        nb: 4
      }
    }
  },
  /* Retina Display Support */
  retina_detect: true
});

  }

  function randomizeHeader(){
  var st = ["c_1", "c_2", "c_3","c_4", "c_5", "c_6"];
  var lg = st.length;
  var random = Math.floor(Math.random() * lg);
  var it = $('.zone__background .background__layer');
  var itf = $('.footer');
  var pre = it.attr('class');
  var pref = itf.attr('class');
  it.attr('class', pre +' '+ st[random])
  itf.attr('class', pref +' '+ st[random])
  }

  function detectWidth(){


    function setMobileClass(){
      var winWidth = $(window).width();
      if(winWidth < 768){
        $('body').addClass("mobile-view");
        $('canvas').remove()

      }
      else{
        $('body').removeClass("mobile-view");
        particlesLaunch('particles-js');
        minimizeHeader();
        $('.header .zone__background').append('<div id="particles-js"></div>')
      }
    }

    setMobileClass();

    $(window).on('resize', function(){
      var winWidth = $(window).width();
      setMobileClass();
      $('#particles-js').remove()
    })
  }

  

  function changeGalleries(){
    var cat = $('.categories ul li a');

    cat.on('click', function(e){

      var $this = $(this);
      var selected = $this.attr('data-selector');
      var gall = $('.galleries');

      cat.removeClass('active');
      $this.addClass('active');

      gall.attr('data-selected', selected)

      $('.galleries ul[data-gallery='+ selected +']').fadeIn();


    });
  }

  

  function changeView() {


    var cat = $('.categories ul li a');
    var gall = $('.galleries');
    
    var pages = ['dribbble', 'github', 'blog', 'projects']; // only the sites you want to be able to view, so no projects for now probbably
    
    var hash = window.location.hash.split('/')[1];
    
    if ( pages.indexOf(hash) >= 0 ) {

      // there is a page, which has the same name as the hash
      var button = $('.categories ul li a[data-selector='+ hash +']');

      cat.removeClass('active');
      button.addClass('active');

      gall.attr('data-selected', hash)

      // $('.galleries ul[data-gallery='+ hash +']').fadeIn();
      
    }
    
  }


  function getAge() {
    $(".age").html( Math.floor( (Date.now() - 671752800000) / 1000 / 60 / 60 / 24 / 365 ) );
  }
  function getItYears() {
    $(".years").html( Math.floor( (Date.now() - 1257980400000) / 1000 / 60 / 60 / 24 / 365 )  );
  }
  function getCurrentYear(){
   var dteNow = new Date();
   var intYear = dteNow.getFullYear();
   $('.year').html( intYear );
 }

 function minimizeHeader(){
  requestAnimationFrame( minimizeHeader );  

  var header = $('.header,.zone, .zone__background, .background__layer');

  $(window).on('scroll', function(){
    var lvl = $(window).scrollTop();

    if(lvl > 100){
     header.addClass('minimized');       
   }
   else{

   }
 });


  
}


function dribbbleShotsDisplay(){
  $.jribbble.getShotsByPlayerId('lukyvj', function (playerShots) {
    var html = [];
    $.each(playerShots.shots, function (i, shot) {
      var shotId = shot.url
      .replace(/\+/g,'')
      .replace(/\//g, '')
      .replace(/\:/g, '')
      .replace(/\-/g, '')
      .replace(/\./g, '')
      .replace(/\]/g, '')
      .replace(/\[/g, '')
      .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/\~/g, '')
        .replace(/\_/g, '');




        html.push(' <li class="item"><div class="item-card"><div class="image">')
        html.push(' <div class="item_informations">');
        html.push(' <style stle="display:none">.fake-background#'+shotId+'::after{width: 100%; height: 100%; background: url('+ shot.image_url +')no-repeat center center; content: ""; position: absolute;z-index: 0; left: 0; filter: url("3data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="5" /></filter></svg>#filter"); -webkit-filter: blur(5px); filter: blur(5px); -webkit-transform: scale(1.05); transform: scale(1.05);background-size:cover; }</style>');
        html.push(' <span class="fake-background" id="'+shotId+'"></span>');
                // html.push(' <span class="fake-background" style="background: url('+shot.image_teaser_url+')no-repeat center center;-webkit-background-size:cover;background-attachment: fixed;-webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px); -ms-filter: blur(5px); filter: blur(5px);box-sizing: border-box;"></span>');
                html.push('<div class="info_content">')
                html.push('<span class="views"><a href="' + shot.url + '" target="_blank" >'+shot.views_count+'<span class="icon-eye"></span></a></span>');
                html.push('<span class="likes"><a href="' + shot.url + '/fans" target="_blank" >'+shot.likes_count+'<span class="icon-heart"></span></a></span>');
                html.push('<span class="comments"><a href="' + shot.url + '#comments-section" target="_blank" >'+shot.comments_count+'<span class="icon-comment"></span></a></span>');
                html.push('</div>')
                html.push('</div>');
                html.push('<a href="' + shot.url + '" target="_blank" >');
                html.push('<img class="shot-image" src="' + shot.image_teaser_url + '" data-adaptive-background="1" ');
                html.push('alt="' + shot.title + '" /><span class="title">'+shot.title+'</span></a></div></div></li>');
              });
$('.dribbble-feed').html(html.join(''));
}, {page: 1, per_page: 12});
}

function githubProjectsDisplay($name){
  $(".github-feed").getRepos($name)
}

function optiDribbbleImages(){

  setTimeout(function(){
    var imgs = $('.shot-image');
    imgs.each(function(){
      var $this = $(this);
      var oldUrl = $this.attr('src');
      var newUrl = oldUrl.replace('_teaser','');


      $this.parent().append('<img class="new-image" src="'+newUrl+'"/>')
    });
  }, 1000)
}

function deploy(){

  $(window).on('hashchange', changeView);

  credits();

  particlesLaunch('particles-js');
  randomizeHeader();
  minimizeHeader();
  detectWidth();
  changeGalleries();
  changeView();
  
  getAge();
  getItYears();
  getCurrentYear();

  san()

  // Load apis 
  githubProjectsDisplay("LukyVj");
  dribbbleShotsDisplay();
  
  optiDribbbleImages()
}

deploy();
});


(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
    || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }());