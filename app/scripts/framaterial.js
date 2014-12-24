
$(document).ready(function(){function initFramaterial(){var ctx=$("body");var md_class='material-design';if(!ctx.hasClass(md_class)){ctx.addClass(md_class);}
else{}}
function detectMobile(){if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){$('[class*="material-sidebar"]').attr('data-state','closed');}}
function hierarchy(){(function($){var speed=900;var container=$('.hierarchical-timing');container.each(function(){var elements=$(this).children();elements.each(function(){var elementOffset=$(this).offset();var offset=elementOffset.left*0.8+elementOffset.top;var delay=parseFloat(offset/speed).toFixed(2);$(this).css("-webkit-transition-delay",delay+'s').css("-o-transition-delay",delay+'s').css("transition-delay",delay+'s').addClass('animated');});});})(jQuery);}
$(function(){var ink,d,x,y;$("a,li").click(function(e){if($(this).find(".ink").length===0){$(this).prepend("<div class='ink'></div>");}
ink=$(this).find(".ink");ink.removeClass("animate");if(!ink.height()&&!ink.width()){d=Math.max($(this).outerWidth(),$(this).outerHeight());ink.css({height:d,width:d});}
x=e.pageX-$(this).offset().left-ink.width()/2;y=e.pageY-$(this).offset().top-ink.height()/2;ink.css({top:y+'px',left:x+'px'}).addClass("animate");});});function sidebarActions(){function sidebarHeader($size){var sidebar=$('[class*="sidebar-"]');var header=sidebar.find('header');var img_url=header.attr('data-image-url');header.css({background:'url('+img_url+')',backgroundSize:$size})}
function sidebarToggle(){var trigger=$('[data-toggle*="sidebar"]');trigger.on('click',function(){var sidebar=$('[class*="material-sidebar"]');var sidebarState=sidebar.attr('data-state');if(sidebarState=="open"){sidebar.attr('data-state','closed')}
else{sidebar.attr('data-state','open')}});}
sidebarHeader('cover')
sidebarToggle()}
function openDropdown(){var trigger=$(".dropdown-title");var dropdownAll=$('.dropdown ul');dropdownAll.slideUp('fast');trigger.on('click',function(){var dropdown=$(this).next('ul');if(dropdown.hasClass('open')){dropdown.removeClass('open').slideUp('fast');}
else{dropdown.addClass('open').slideDown('fast');}});var notTrigger=$('a,input');notTrigger.on('click',function(){dropdownAll.removeClass('open').slideUp('fast');});}
function materialInput(){var ctx=$('.material-design')
var $inputTypeList='input[type*="text"],input[type*="email"],input[type*="number"],input[type*="password"]';var inputs=ctx.find($inputTypeList);inputs.each(function(){var $this=$(this);var $placeholder=$this.attr('placeholder');var $cl=$this.attr('class');var $cl=$cl.replace('m-input-','');$this.wrap('<div class="group '+$cl+'">').after('<span class="highlight '+$cl+'"></span> <span class="bar '+$cl+'"></span><label>'+$placeholder+'</label>').attr('placeholder','');});}
function sizeTooltip(){var tooltips=$('[class*="m-tooltip"]');tooltips.each(function(){var $this=$(this);var tt_content=$this.attr('data-tooltip-content');var tt_co_length=tt_content.split(' ');var tt_co_length=tt_co_length.length;$this.append('<span class="tooltip_content">'+tt_content+'</span>')
if(tt_co_length>25){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 300px}</style>')}
else if(tt_co_length>20){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 240px}</style>')}
else if(tt_co_length>10){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 200px}</style>')}
else if(tt_co_length>5){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 160px}</style>')}
else if(tt_co_length>3){$this.prepend('<style>[class*="m-tooltip"][data-tooltip-content*="'+tt_content+'"] .tooltip_content{width: 120px}</style>')}
else{}});}
function dataBackgroundUrl(){var t_item=$('[data-background-url]');t_item.each(function(){$this=$(this);var bg_url=$this.attr('data-background-url');var bg_target=$this.find('[data-background]');bg_target.css({background:'url('+bg_url+')no-repeat center center',backgroundSize:'cover'})})}
function textFlow(){var pTags=$('p');pTags.each(function(){var $this=$(this);$this.addClass('flow-text')});}
function deploy(){initFramaterial();detectMobile();hierarchy();openDropdown();sidebarActions()
materialInput();sizeTooltip();textFlow();dataBackgroundUrl();}
deploy();});