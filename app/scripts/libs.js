// Particles
/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : https://github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v1.0.3
/* ----------------------------------------------- */

function launchParticlesJS(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > canvas');

  /* particles.js variables with default values */
  pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      color: '#fff',
      shape: 'circle',
      opacity: 1,
      size: 2.5,
      size_random: true,
      nb: 200,
      line_linked: {
        enable_auto: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1,
        condensed_mode: {
          enable: true,
          rotateX: 65000,
          rotateY: 65000
        }
      },
      anim: {
        enable: true,
          speed: 1
      },
      array: []
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: 100
      },
      detect_on: 'canvas',
      mode: 'grab',
      line_linked: {
        opacity: 1
      },
      events: {
        onclick: {
          enable: true,
          mode: 'push',
          nb: 4
        }
      }
    },
    retina_detect: false,
    fn: {
      vendors:{
        interactivity: {}
      }
    }
  };

  /* params settings */
  if(params){
    if(params.particles){
      var paramsForParticles = params.particles;
      if(paramsForParticles.color) pJS.particles.color = paramsForParticles.color;
      if(paramsForParticles.shape) pJS.particles.shape = paramsForParticles.shape;
      if(paramsForParticles.opacity) pJS.particles.opacity = paramsForParticles.opacity;
      if(paramsForParticles.size) pJS.particles.size = paramsForParticles.size;
      if(paramsForParticles.size_random == false) pJS.particles.size_random = paramsForParticles.size_random;
      if(paramsForParticles.nb) pJS.particles.nb = paramsForParticles.nb;
      if(paramsForParticles.line_linked){
        var paramsForLineLinked = paramsForParticles.line_linked;
        if(paramsForLineLinked.enable_auto == false) pJS.particles.line_linked.enable_auto = paramsForLineLinked.enable_auto;
        if(paramsForLineLinked.distance) pJS.particles.line_linked.distance = paramsForLineLinked.distance;
        if(paramsForLineLinked.color) pJS.particles.line_linked.color = paramsForLineLinked.color;
        if(paramsForLineLinked.opacity) pJS.particles.line_linked.opacity = paramsForLineLinked.opacity;
        if(paramsForLineLinked.width) pJS.particles.line_linked.width = paramsForLineLinked.width;
        if(paramsForLineLinked.condensed_mode){
          var paramsForCondensedMode = paramsForLineLinked.condensed_mode;
          if(paramsForCondensedMode.enable == false) pJS.particles.line_linked.condensed_mode.enable = paramsForCondensedMode.enable;
          if(paramsForCondensedMode.rotateX) pJS.particles.line_linked.condensed_mode.rotateX = paramsForCondensedMode.rotateX;
          if(paramsForCondensedMode.rotateY) pJS.particles.line_linked.condensed_mode.rotateY = paramsForCondensedMode.rotateY;
        }
      }
      if(paramsForParticles.anim){
        var paramsForAnim = paramsForParticles.anim;
        if(paramsForAnim.enable == false) pJS.particles.anim.enable = paramsForAnim.enable;
        if(paramsForAnim.speed) pJS.particles.anim.speed = paramsForAnim.speed;
      }
    }
    if(params.interactivity){
      var paramsForInteractivity = params.interactivity;
      if(paramsForInteractivity.enable == false) pJS.interactivity.enable = paramsForInteractivity.enable;
      if(paramsForInteractivity.mouse){
        if(paramsForInteractivity.mouse.distance) pJS.interactivity.mouse.distance = paramsForInteractivity.mouse.distance;
      }
      if(paramsForInteractivity.detect_on) pJS.interactivity.detect_on = paramsForInteractivity.detect_on;
      if(paramsForInteractivity.mode) pJS.interactivity.mode = paramsForInteractivity.mode;
      if(paramsForInteractivity.line_linked){
        if(paramsForInteractivity.line_linked.opacity) pJS.interactivity.line_linked.opacity = paramsForInteractivity.line_linked.opacity;
      }
      if(paramsForInteractivity.events){
        var paramsForEvents = paramsForInteractivity.events;
        if(paramsForEvents.onclick){
          var paramsForOnclick = paramsForEvents.onclick;
          if(paramsForOnclick.enable == false) pJS.interactivity.events.onclick.enable = false;
          if(paramsForOnclick.mode != 'push') pJS.interactivity.events.onclick.mode = paramsForOnclick.mode;
          if(paramsForOnclick.nb) pJS.interactivity.events.onclick.nb = paramsForOnclick.nb;
        }
      }
    }
    pJS.retina_detect = params.retina_detect;
  }

  /* convert hex colors to rgb */
  pJS.particles.color_rgb = hexToRgb(pJS.particles.color);
  pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

  /* detect retina */
  if(pJS.retina_detect && window.devicePixelRatio > 1){
    pJS.retina = true;
  
    pJS.canvas.pxratio = window.devicePixelRatio
    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;
    pJS.particles.anim.speed = pJS.particles.anim.speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.particles.line_linked.distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.particles.line_linked.width * pJS.canvas.pxratio;
    pJS.interactivity.mouse.distance = pJS.interactivity.mouse.distance * pJS.canvas.pxratio;
  }


  /* ---------- CANVAS functions ------------ */

  pJS.fn.canvasInit = function(){
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function(){
    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    window.onresize = function(){
      if(pJS){
        pJS.canvas.w = pJS.canvas.el.offsetWidth;
        pJS.canvas.h = pJS.canvas.el.offsetHeight;

        /* resize canvas */
        if(pJS.retina){
          pJS.canvas.w *= pJS.canvas.pxratio;
          pJS.canvas.h *= pJS.canvas.pxratio;
        }

        pJS.canvas.el.width = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;

        /* repaint canvas */
        pJS.fn.canvasPaint();
        if(!pJS.particles.anim.enable){
          pJS.fn.particlesRemove();
          pJS.fn.canvasRemove();
          launchParticles();
        }
      }
    }
  };

  pJS.fn.canvasPaint = function(){
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasRemove = function(){
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  }


  /* --------- PARTICLES functions ----------- */

  pJS.fn.particle = function(color, opacity, position){

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* size */
    this.radius = (pJS.particles.size_random ? Math.random() : 1) * pJS.particles.size;
    if (pJS.retina) this.radius *= pJS.canvas.pxratio;

    /* color */
    this.color = color;

    /* opacity */
    this.opacity = opacity;

    /* animation - velocity for speed */
    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    /* draw function */
    this.draw = function(){
      pJS.canvas.ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.opacity+')';
      pJS.canvas.ctx.beginPath();

      switch(pJS.particles.shape){
        case 'circle':
          pJS.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        break;

        case 'edge':
          pJS.canvas.ctx.rect(this.x, this.y, this.radius*2, this.radius*2);
        break;

        case 'triangle':
          pJS.canvas.ctx.moveTo(this.x,this.y-this.radius);
          pJS.canvas.ctx.lineTo(this.x+this.radius,this.y+this.radius);
          pJS.canvas.ctx.lineTo(this.x-this.radius,this.y+this.radius);
          pJS.canvas.ctx.closePath();
        break;
      }

      pJS.canvas.ctx.fill();
    }

  };

  pJS.fn.particlesCreate = function(){
    for(var i = 0; i < pJS.particles.nb; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity));
    }
  };

  pJS.fn.particlesAnimate = function(){
    for(var i = 0; i < pJS.particles.array.length; i++){
      /* the particle */
      var p = pJS.particles.array[i];

      /* move the particle */
      p.x += p.vx * (pJS.particles.anim.speed/2);
      p.y += p.vy * (pJS.particles.anim.speed/2);

      /* change particle position if it is out of canvas */
      if(p.x - p.radius > pJS.canvas.w) p.x = p.radius;
      else if(p.x + p.radius < 0) p.x = pJS.canvas.w + p.radius;
      if(p.y - p.radius > pJS.canvas.h) p.y = p.radius;
      else if(p.y + p.radius < 0) p.y = pJS.canvas.h + p.radius;

      /* Check distance between each particle and mouse position */
      for(var j = i + 1; j < pJS.particles.array.length; j++){
        var p2 = pJS.particles.array[j];

        /* link particles if enable */
        if(pJS.particles.line_linked.enable_auto){
          pJS.fn.vendors.distanceParticles(p,p2);
        }

        /* set interactivity if enable */
        if(pJS.interactivity.enable){

          /* interactivity mode */
          switch(pJS.interactivity.mode){
            case 'grab':
              pJS.fn.vendors.interactivity.grabParticles(p,p2);
            break;
          }

        }


      }
    }
  };

  pJS.fn.particlesDraw = function(){
    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* move particles */
    pJS.fn.particlesAnimate();

    /* draw each particle */
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p = pJS.particles.array[i];
      p.draw('rgba('+p.color.r+','+p.color.g+','+p.color.b+','+p.opacity+')');
    }

  };

  pJS.fn.particlesRemove = function(){
    pJS.particles.array = [];
  };


  /* ---------- VENDORS functions ------------ */

  pJS.fn.vendors.distanceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx*dx + dy*dy);

    /* Check distance between particle and mouse mos */
    if(dist <= pJS.particles.line_linked.distance) {

      /* draw the line */
      var color_line = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (pJS.particles.line_linked.opacity-dist/pJS.particles.line_linked.distance) +')';
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(p2.x, p2.y);
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();

      /* condensed particles */
      if(pJS.particles.line_linked.condensed_mode.enable){
        var dx = p1.x - p2.x,
            dy = p1.y - p2.y,
            ax = dx/(pJS.particles.line_linked.condensed_mode.rotateX*1000),
            ay = dy/(pJS.particles.line_linked.condensed_mode.rotateY*1000);
        p2.vx += ax;
        p2.vy += ay;
      }

    }
  };

  pJS.fn.vendors.interactivity.listeners = function(){

    /* init el */
    if(pJS.interactivity.detect_on == 'window'){
      var detect_el = window;
    }else{
      var detect_el = pJS.canvas.el;
    }

    /* el on mousemove */
    detect_el.onmousemove = function(e){

      if(detect_el == window){
        var pos_x = e.clientX,
            pos_y = e.clientY;
      }
      else{
        var pos_x = e.offsetX||e.clientX,
            pos_y = e.offsetY||e.clientY;
      }

      if(pJS){

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if(pJS.retina){
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';
      }

    };

    /* el on onmouseleave */
    detect_el.onmouseleave = function(e){

      if(pJS){
        pJS.interactivity.mouse.pos_x = 0;
        pJS.interactivity.mouse.pos_y = 0;
        pJS.interactivity.status = 'mouseleave';
      }

    };

    /* el on onclick */
    if(pJS.interactivity.events.onclick.enable){
      switch(pJS.interactivity.events.onclick.mode){
        case 'push':
          detect_el.onclick = function(e){
            if(pJS){
              for(var i = 0; i < pJS.interactivity.events.onclick.nb; i++){
                pJS.particles.array.push(
                  new pJS.fn.particle(
                    pJS.particles.color_rgb,
                    pJS.particles.opacity,
                    {
                      'x': pJS.interactivity.mouse.pos_x,
                      'y': pJS.interactivity.mouse.pos_y
                    }
                  )
                )
              }
            }
          }
        break;

        case 'remove':
          detect_el.onclick = function(e){
            pJS.particles.array.splice(0, pJS.interactivity.events.onclick.nb);
          }
        break;
      }
    }
  };


  pJS.fn.vendors.interactivity.grabParticles = function(p1, p2){
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    var dx_mouse = p1.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p1.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

    /* Check distance between 2 particles + Check distance between 1 particle and mouse position */
    if(dist <= pJS.particles.line_linked.distance && dist_mouse <= pJS.interactivity.mouse.distance && pJS.interactivity.status == 'mousemove'){
      /* Draw the line */
      var color_line = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (pJS.interactivity.line_linked.opacity-dist_mouse/pJS.interactivity.mouse.distance) +')';
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();
    }
  };

  pJS.fn.vendors.destroy = function(){
    cancelAnimationFrame(pJS.fn.requestAnimFrame);
    canvas_el.remove();
    delete pJS;
  };


  /* --------- LAUNCH ----------- */

  function launchParticles(){
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.particlesDraw();
  };


  function launchAnimation(){
    pJS.fn.particlesDraw();
    pJS.fn.requestAnimFrame = requestAnimFrame(launchAnimation);
  };


  launchParticles();

  if(pJS.particles.anim.enable){
    launchAnimation();
  }

  if(pJS.interactivity.enable){
    pJS.fn.vendors.interactivity.listeners();
  }


};

/* --- VENDORS --- */

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};


/* --- LAUNCH --- */

window.particlesJS = function(tag_id, params){

  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    launchParticlesJS(tag_id, params);
  }

};



$(document).ready(function(){function initFramaterial(){var ctx=$("body");var md_class='material-design';if(!ctx.hasClass(md_class)){ctx.addClass(md_class);}
else{}}
function detectMobile(){if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){$('[class*="material-sidebar"]').attr('data-state','closed');}}
function hierarchy(){(function($){var speed=900;var container=$('.hierarchical-timing');container.each(function(){var elements=$(this).children();elements.each(function(){var elementOffset=$(this).offset();var offset=elementOffset.left*0.8+elementOffset.top;var delay=parseFloat(offset/speed).toFixed(2);$(this).css("-webkit-transition-delay",delay+'s').css("-o-transition-delay",delay+'s').css("transition-delay",delay+'s').addClass('animated');});});})(jQuery);}
$(function(){var ink,d,x,y;$("a[class*='btn'], [hasripple]").click(function(e){if($(this).find(".ink").length===0){$(this).prepend("<div class='ink'></div>");}
ink=$(this).find(".ink");ink.removeClass("animate");if(!ink.height()&&!ink.width()){d=Math.max($(this).outerWidth(),$(this).outerHeight());ink.css({height:d,width:d});}
x=e.pageX-$(this).offset().left-ink.width()/2;y=e.pageY-$(this).offset().top-ink.height()/2;ink.css({top:y+'px',left:x+'px'}).addClass("animate");});});function navigation(){var navigation=$('[class*="material-navigation"]');function subNavigation(){var subNavigation=navigation.find('.sub-navigation');var idi=0;subNavigation.each(function(){idi++;var $this=$(this);var navigationParent=$this.parent().closest('[class*="material-navigation"]')
navigationParent.addClass('sub-nav').attr('id','subnav_'+idi);$this.attr('id','subnav_child_'+idi)
if($('body').find('[class*="material-sidebar-left"]')){if($('[class*="material-sidebar"]').attr('data-state')=='closed'){var shrunk=$('[class*="material-sidebar"]').width();$this.addClass('shrunked').attr('data-shrunk',shrunk);$this.css({'width':'100%','float':'right','right':'0','position':'relative','top':'0px','box-shadow':'inset 2px 2px 4px rgba(0,0,0,.3)'})}
else{var shrunk=$('[class*="material-sidebar"]').width();$this.addClass('shrunked').attr('data-shrunk',shrunk);$this.css({'width':'calc(100% - '+shrunk+'px)','float':'right','right':'0','position':'relative','top':'60px','box-shadow':'inset 2px 2px 4px rgba(0,0,0,.3)'})}
$('*').on('click',function(){if($('[class*="material-sidebar"]').attr('data-state')=='closed'){var shrunk=$('[class*="material-sidebar"]').width();$this.addClass('shrunked').attr('data-shrunk',shrunk);$this.css({'width':'100%','float':'right','right':'0','position':'relative','top':'0','box-shadow':'inset 2px 2px 4px rgba(0,0,0,.3)'})}
else{var shrunk=$('[class*="material-sidebar"]').width();$this.addClass('shrunked').attr('data-shrunk',shrunk);$this.css({'width':'calc(100% - '+shrunk+'px)','float':'right','right':'0','position':'relative','top':'60px','box-shadow':'inset 2px 2px 4px rgba(0,0,0,.3)'})}});}
else if($('body').find('[class*="material-sidebar-right"]')){if($('[class*="material-sidebar"]').attr('data-state')=='closed'){var shrunk=$('[class*="material-sidebar"]').width();$this.addClass('shrunked').attr('data-shrunk',shrunk);$this.css({'width':'100%','float':'left','left':'0','position':'relative','top':'60px','box-shadow':'inset 2px 2px 4px rgba(0,0,0,.3)'})}
else{var shrunk=$('[class*="material-sidebar"]').width();$this.addClass('shrunked').attr('data-shrunk',shrunk);$this.css({'width':'calc(100% - '+shrunk+'px)','float':'left','left':'0','position':'relative','top':'60px','box-shadow':'inset 2px 2px 4px rgba(0,0,0,.3)'})}
$('*').on('click',function(){if($('[class*="material-sidebar"]').attr('data-state')=='closed'){var shrunk=$('[class*="material-sidebar"]').width();$this.addClass('shrunked').attr('data-shrunk',shrunk);$this.css({'width':'100%','float':'left','left':'0','position':'relative','top':'0','box-shadow':'inset 2px 2px 4px rgba(0,0,0,.3)'})}
else{var shrunk=$('[class*="material-sidebar"]').width();$this.addClass('shrunked').attr('data-shrunk',shrunk);$this.css({'width':'calc(100% - '+shrunk+'px)','float':'left','left':'0','position':'relative','top':'60px','box-shadow':'inset 2px 2px 4px rgba(0,0,0,.3)'})}});}
else{}});}
subNavigation();}
function sidebarActions(){function sidebarHeader($size){var sidebar=$('[class*="sidebar-"]');var header=sidebar.find('header');var img_url=header.attr('data-image-url');header.css({background:'url('+img_url+')',backgroundSize:$size})}
function sidebarToggle(){var trigger=$('[data-toggle*="sidebar"]');trigger.on('click',function(){var sidebar=$('[class*="material-sidebar"]');var sidebarState=sidebar.attr('data-state');if(sidebarState=="open"){sidebar.attr('data-state','closed')}
else{sidebar.attr('data-state','open')}});}
sidebarHeader('cover')
sidebarToggle()}
function openDropdown(){var trigger=$(".dropdown-title");var dropdownAll=$('.dropdown ul');dropdownAll.slideUp('fast');trigger.on('click',function(){var dropdown=$(this).next('ul');if(dropdown.hasClass('open')){dropdown.removeClass('open').slideUp('fast');}
else{dropdown.addClass('open').slideDown('fast');}});var notTrigger=$('a,input');notTrigger.on('click',function(){dropdownAll.removeClass('open').slideUp('fast');});}
function progressBars(){var bars=$('progress[class*="m-progress"]');var barsAnim=$('progress[class*="m-progress"][data-type="animated"]');var indeterminate=$('progress[data-type="indeterminate"]')
var ida=0;var idb=0;var idc=0;bars.each(function(){$this=$(this);$this.wrap('<div class="progress-group">')
ida++;$this.attr('id','prog_'+ida)});barsAnim.each(function(){var $this=$(this);var tVal=$this.attr('value');var sec=$this.attr('data-timeload');idb++;$this.attr('id','prog_anim_'+idb)
$this.parent().prepend('<style id="style_prog_anim_'+idb+'"></style>');$('#style_prog_anim_'+idb).empty().text('progress[data-timeload]#prog_anim_'+idb+'::-webkit-progress-value{transform:translateX(-100%);transition: transform '+sec+' linear}progress[data-timeload]#prog_anim_'+idb+'.loaded::-webkit-progress-value{transform:translateX(0);}');setTimeout(function(){$this.addClass('loaded')},100)});indeterminate.each(function(){idc++;var $this=$(this);var tVal=$this.attr('value');var sec=$this.attr('data-timeload');$this.attr('id','prog_indeterminate_'+idc)
$this.parent().prepend('<style id="style_prog_indeterminate_'+idc+'"></style>');$('#style_prog_indeterminate_'+idc).empty().text('progress[data-timeload]#prog_indeterminate_'+idc+'::-webkit-progress-value{transform:translateX(-100%);transition: transform '+sec+' linear}progress[data-timeload]#prog_indeterminate_'+idc+'.loaded::-webkit-progress-value{animation: progressIndeterminate '+sec+' linear infinite; }');setTimeout(function(){$this.addClass('loaded')},100)})}
function spinner(){var spinner=$('[class*="m-spinner"]');var svgSpinner='<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>'
spinner.each(function(){var $this=$(this);$this.append(svgSpinner)})}
function toastsSnackbar(){var toasts=$('[data-toggle*="toast"]');var snacks=$('[data-toggle*="snackbar"]');var idToast=0;var idSnack=0;toasts.each(function(){var $this=$(this);var posY=$this.attr('data-toast-posy');var posX=$this.attr('data-toast-posx');var content=$this.attr('data-toast-inner');var fadeTime=$this.attr('data-toast-fade-time');var fadeTime=fadeTime*1000;idToast++;if(!fadeTime){$this.attr('data-toast-fade-time','5');}
$this.attr('id','call_toast_'+idToast)
$this.parent().append('<div class="m-toast-'+posX+'-'+posY+'" id="toast_'+idToast+'"><p>'+content+'</p></div>');$this.on('click',function(){var fadeTime=$this.attr('data-toast-fade-time');var fadeTime=fadeTime*1000;var thisId=$this.attr('id').replace('call_','');$('[id*="'+thisId+'"]').toggleClass('on-screen');$('[class*="m-toast"]').not('[class*="m-toast"]#'+thisId).removeClass('on-screen');setTimeout(function(){$('[id*="'+thisId+'"]').removeClass('on-screen');},fadeTime);});})
snacks.each(function(){var $this=$(this);var posY=$this.attr('data-snackbar-posy');var posX=$this.attr('data-snackbar-posx');var content=$this.attr('data-snackbar-inner');var fadeTime=$this.attr('data-snackbar-fade-time');var fadeTime=fadeTime*1000;idSnack++;if(!fadeTime){$this.attr('data-snackbar-fade-time','5');}
$this.attr('id','call_snackbar_'+idSnack)
$this.parent().append('<div class="m-snackbar-'+posX+'-'+posY+'" id="snackbar_'+idSnack+'"><p>'+content+'</p></div>');$this.on('click',function(){var thisId=$this.attr('id').replace('call_','');$('[id*="'+thisId+'"]').toggleClass('on-screen');$('[class*="m-snackbar"]').not('[class*="m-snackbar"]#'+thisId).removeClass('on-screen')
setTimeout(function(){$('[id*="'+thisId+'"]').removeClass('on-screen');},fadeTime);});})}
function materialInput(){var ctx=$('.material-design')
var $inputTypeList='input[type*="text"][class*="m-input"],input[type*="email"][class*="m-input"],input[type*="number"][class*="m-input"],input[type*="password"][class*="m-input"]';var inputs=ctx.find($inputTypeList);inputs.each(function(){var $this=$(this);var $placeholder=$this.attr('placeholder');var $cl=$this.attr('class');var $cl=$cl.replace('m-input-','');if($this.attr('type')=='text'){$this.wrap('<div class="material-input-group-text '+$cl+'">').after('<span class="highlight '+$cl+'"></span> <span class="bar '+$cl+'"></span><label class="text-input-label">'+$placeholder+'</label>').attr('placeholder','');}
else if($this.attr('type')=='range'){$this.wrap('<div class="material-input-group-range '+$cl+'">').after('<span class="highlight '+$cl+'"></span> <span class="bar '+$cl+'"></span><label class="text-input-label">'+$placeholder+'</label>').attr('placeholder','');}
else if($this.attr('type')=='radio'){$this.wrap('<div class="material-input-group-radio '+$cl+'">').after('<span class="highlight '+$cl+'"></span> <span class="bar '+$cl+'"></span><label class="text-input-label">'+$placeholder+'</label>').attr('placeholder','');}
else if($this.attr('type')=='checkbox'){$this.wrap('<div class="material-input-group-checkbox '+$cl+'">').after('<span class="highlight '+$cl+'"></span> <span class="bar '+$cl+'"></span><label class="text-input-label">'+$placeholder+'</label>').attr('placeholder','');}
else{$this.wrap('<div class="material-input-group '+$cl+'">').after('<span class="highlight '+$cl+'"></span> <span class="bar '+$cl+'"></span><label class="text-input-label">'+$placeholder+'</label>').attr('placeholder','');}});function materialCheckboxesRadio(){var ip=$('input[type*="checkbox"],input[type*="radio"],[type*="range"]');ip.each(function(){var $this=$(this);var iId=$this.attr('id');var iLabel=$this.attr('data-label');$this.wrap('<div class="material-input-group"></div>')
if($this.attr('data-label')){$this.parent().append('<label for="'+iId+'">'+iLabel+'<span class="ripple"></span></label>')}
else{$this.parent().append('<label for="'+iId+'"><span class="ripple"></span></label>')}})}
function radioToggle(){var tog=$('[type*="radio"][data-type*="toggle"]');var radioStates={};$.each(tog,function(index,rd){radioStates[rd.value]=$(rd).is(':checked');});tog.click(function(){var val=$(this).val();$(this).attr('checked',(radioStates[val]=!radioStates[val]));$.each(tog,function(index,rd){if(rd.value!==val){radioStates[rd.value]=false;}});});}
function rangeOutput(){var rangeOutput=$('[type*="range"][data-output*="true"],[type*="range"][data-output-expand*="true"]');rangeOutput.each(function(){var $this=$(this);var idex=$this.attr('id');var id=idex.replace('rg','rgo');if($this.attr('data-output-expand')=="true"){$this.parent().prepend('<style id="style_'+id+'"></style>');$('#style_'+id+'').text('input[type*="range"]#'+idex+'::-webkit-slider-thumb:after{content:"'+$this.val()+'";}')
$this.on('change',function(){setInterval(function(){$('#style_'+id+'').text('input[type*="range"]#'+idex+'::-webkit-slider-thumb:after{content:"'+$this.val()+'";}')},150)});}
else{$this.parent().prepend('<style id="style_'+id+'"></style>');$('#style_'+id+'').text('input[type*="range"]#'+idex+'::-webkit-slider-thumb:after{content:"'+$this.val()+'";}')
$this.on('change',function(){setInterval(function(){$('#style_'+id+'').text('input[type*="range"]#'+idex+'::-webkit-slider-thumb:after{content:"'+$this.val()+'";}')},150)});}});}
function rangeFiller(){var range=$('[type*="range"]');range.each(function(){var $this=$(this);var factorMax=$this.attr('max')/100;var lvlMax=Math.floor($this.attr('value')/factorMax);var lvl=$this.attr('value');if($this.attr('max')>100){$this.css('background','-webkit-linear-gradient(left, currentColor '+lvlMax+'%, #B3B3B3 '+lvlMax+'%)')}
else if($this.attr('max')<100){$this.css('background','-webkit-linear-gradient(left, currentColor '+lvlMax+'%, #B3B3B3 '+lvlMax+'%)')}
else{$this.css('background','-webkit-linear-gradient(left, currentColor '+lvl+'%, #B3B3B3 '+lvl+'%)')}
$this.on('change',function(){var factorMax=$this.attr('max')/100;var lvlMax=Math.floor($this.attr('value')/factorMax);var lvl=$this.attr('value');if($this.attr('max')>100){$this.css('background','-webkit-linear-gradient(left, currentColor '+lvlMax+'%, #B3B3B3 '+lvlMax+'%)')}
else if($this.attr('max')<100){$this.css('background','-webkit-linear-gradient(left, currentColor '+lvlMax+'%, #B3B3B3 '+lvlMax+'%)')}
else{$this.css('background','-webkit-linear-gradient(left, currentColor '+lvl+'%, #B3B3B3 '+lvl+'%)')}});})}
function inputIdentification(){var ips=$('[type*="checkbox"], [type*="radio"], [type*="range"]');var id=0;ips.each(function(){var $this=$(this);id++;var lab=$this.parent().find('.material-input-group');if($this.attr('type')=='checkbox'){$this.attr('id','ck_'+id)}
else if($this.attr('type')=='radio'){$this.attr('id','rd_'+id)}
else if($this.attr('type')=='range'){$this.attr('id','rg_'+id)
$this.attr('value',$this.val())
if(!$this.attr('max')==true){$this.attr('max','100')}
$this.on('change',function(){$this.attr('value',$this.val())})}});}
inputIdentification();materialCheckboxesRadio();radioToggle();rangeOutput();rangeFiller();}
function sizeTooltip(){var tooltips=$('[class*="m-tooltip"]');tooltips.each(function(){var $this=$(this);var tt_content=$this.attr('data-tooltip-content');var tt_co_length=tt_content.split(' ');var tt_co_length=tt_co_length.length;$this.append('<span class="tooltip_content">'+tt_content+'</span>')
if(tt_co_length>25){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 300px}</style>')}
else if(tt_co_length>20){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 240px}</style>')}
else if(tt_co_length>10){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 200px}</style>')}
else if(tt_co_length>5){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 160px}</style>')}
else if(tt_co_length>3){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 120px}</style>')}
else{}});}
function cards(){function cardsNaturalizeLinks(){var cards=$('[class*="m-card"]');var footer_btn=cards.find('footer a[class*="-btn"]');footer_btn.on('click',function(e){var $this=$(this);var tUrl=$this.attr('href');if(tUrl=='#'||tUrl==''){e.preventDefault()}})}
function displayCards(){var $class='on-screen';var cards=$('[class*="m-card"]');cards.each(function(){var $this=$(this);if($this.hasClass('off-screen')){}
else{$this.addClass($class)}})}
function cardsIdentification(){var card=$('[class*="m-card"]');var id=0;card.each(function(){var $this=$(this);id++;if(!$this.attr('id')){if($this.attr('data-card-type')=='datepicker'){$this.attr('id','card_datepicker_'+id)}
else{$this.attr('id','card_'+id)}}})}
function cardsToggle(){var togglers=$('[data-btn-type*="toggle"]');var inCardTogglers=$('[class*="m-card"] footer a[data-btn-type*="toggle"]');togglers.each(function(){var $this=$(this);var toToggle=$this.attr('href');var toToggle=toToggle.replace('#','');$this.attr('data-toggle',toToggle)})
togglers.on('click',function(e){e.preventDefault();var $this=$(this);var cardToToggle=$this.attr('data-toggle');$('#'+cardToToggle).toggleClass('off-screen').toggleClass('on-screen');});inCardTogglers.each(function(){var $this=$(this);var inCardTogglersId=$this.parent().parent().attr("id")
$this.attr({'href':'#'+inCardTogglersId,'data-toggle':inCardTogglersId});})
function defineDay(){var tar=$('[data-card-type="datepicker"]');setTimeout(function(){tar.each(function(){var tid=$(this).attr('id');var d=new Date();var weekday=new Array(7);weekday[0]="Sunday";weekday[1]="Monday";weekday[2]="Tuesday";weekday[3]="Wednesday";weekday[4]="Thursday";weekday[5]="Friday";weekday[6]="Saturday";var n=weekday[d.getDay()];var today=$('#'+tid+' .pmu-today').text();var tyear=$('#'+tid+' .pmu-years .pmu-selected').text();var tmonth=$('#'+tid+' .pmu-month').text().substring(0,3);$('.pmu-view-days-num').empty().append(today)
$('.pmu-view-year-num').empty().append(tyear)
$('.pmu-month').empty().append(tmonth)
$('.pmu-today-h').empty().append(n)
console.log("found"+'#'+tid+' .pmu-selected.pmu-today')})},10)}
defineDay()}
function dataBackgroundUrl(){var t_item=$('[data-background-url]');t_item.each(function(){$this=$(this);var bg_url=$this.attr('data-background-url');var bg_target=$this.find('[data-background]');if($this.attr('data-background-url')){bg_target.css({background:'url('+bg_url+')no-repeat center center',backgroundSize:'cover'})}})}
function dataBackgroundColor(){var t_item=$('[data-background-color]');t_item.each(function(){$this=$(this);var bg_color=$this.attr('data-background-color');var bg_target=$this.find('[data-background]');if($this.attr('data-background-color')){bg_target.css({backgroundColor:bg_color,backgroundSize:'cover'})}})}
function dataBackgroundText(){var t_item=$('[data-background-text]');t_item.each(function(){$this=$(this);var bg_text=$this.attr('data-background-text');var bg_target=$this.find('[data-background]');if($this.attr('data-background-text')){bg_target.append('<span class="card-header-text">'+bg_text+'</span>')}})}
function dataCurtain(){var t_item=$('[data-curtain]');setTimeout(function(){t_item.each(function(){$this=$(this);if($this.attr('data-curtain')==="true"){$this.parent().append('<div class="curtain"></div>')}})},150)}
function datePicker(){var dp=$('[data-card-type*="datepicker"]');var day='17';var month='DEC';var year='2014';var id=0;dp.each(function(){var $this=$(this);var dateHeader=$this.find('header');var dateContent=$this.find('.inner__card');var datePickerContainer=$('[id*="datepicker"][data-picket-id]');id++;$this.attr('data-datepicker-frame-id',id);dateHeader.empty().append('<span class="dp_day">'+day+'</span><span class="dp_month">'+month+'</span><span class="dp_year">'+year+'</span>');dateContent.empty().append('<div id="datepicker'+id+'" data-picker-id="'+id+'"></div>')
datePickerContainer.empty().append('Date Picker Script');})}
function deployCardFunctions(){cardsIdentification();displayCards();dataCurtain();cardsToggle();dataBackgroundUrl();dataBackgroundColor();datePicker();cardsNaturalizeLinks();dataBackgroundText();}
deployCardFunctions();}
function textFlow(){var pTags=$('p');pTags.each(function(){var $this=$(this);$this.addClass('flow-text')});}
function deploy(){initFramaterial();detectMobile();hierarchy();navigation();openDropdown();sidebarActions()
materialInput();sizeTooltip();textFlow();cards();progressBars();spinner();toastsSnackbar();}
deploy();});