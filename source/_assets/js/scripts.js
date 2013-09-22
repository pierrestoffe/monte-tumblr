(function(){

// SET ----------------------------------------------------------------------------------------------------

	// Selectors

	body = $('body');
	aside = $('aside');
	container = $('.container');
	bloc = $('.bloc');
	content = $('#content');
	view = $('.view');
	img = $('img');
	imgf = $('img:first');
	imgl = $('img:last');
	single = $('body').hasClass('single');

	// Parameters

	ok = true;
	slide = 0;
	turnB = 1;
	isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);

	// Init

	turn();
	dim();

// USE ----------------------------------------------------------------------------------------------------

	// Ready

	$(document).ready(function(){
		img.hide();
	});

	$(window).load(function(){
		img.css({'position': 'absolute'});
		reIm();
		imgf.fadeIn().addClass('visible');
	});

	// Navigation | CLIC

	$('.view').find('img').on('click', function(){
		next();
	});

	// Navigation | CLAVIER

	$(document.documentElement).keydown(function(e){
		if((e.keyCode == 37) || (e.keyCode == 39)){
			e.preventDefault();
		};
	}).keyup(function(e){
		if(e.keyCode == 37){ // Left
			prev();
		};
		if(e.keyCode == 39){ // Right
			next();
		};
	});

	// Navigation | FINGER

	if(isMobile){
		$('.view').find('img').touchwipe({
			wipeLeft: function(){next();},
			wipeRight: function(){prev();},
			min_move_x: 20,
			preventDefaultEvents: false
		});
	}

	// Navigation | HOVER

	if(!isMobile){
		view.hover(function(){
			if(turnB){
				turnB = 0;
				window.clearInterval(slide);
			}
		}, function(){
			if(!turnB){
				turnB = 1;
				turn();
			}
		});
	}

	// Action | RESIZE

	$(window).resize(function(){
		dim();
		reIm();
		turnReset();
	});

// DO ----------------------------------------------------------------------------------------------------

	// Layout | BASIC

	function dim(){
		wh = $(window).height();
		ww = $(window).width();
		if(ww > 800){
			ww = ww-200;
			aside.css({'height': wh, 'float': 'left', 'top': 'auto', 'bottom': 'auto'}).find('.container').css({'top': 'auto', 'bottom': '0px', 'padding-bottom': 40});
			content.css({'width': ww, 'height': wh, 'float': 'right'});
			view.css({'width': ww, 'height': wh});
		}else if(ww > 500 && ww <= 800){
			wh = wh-100;
			aside.css({'height': 100, 'float': 'none', 'top': 'auto', 'bottom': 0}).find('.container').css({'bottom': 'auto', 'padding-bottom': 0});
			content.css({'width': ww, 'height': wh, 'float': 'none'});
			view.css({'width': ww, 'height': wh});
		}else{
			coh = container.outerHeight();
			wh = wh-72;
			aside.css({'height': coh, 'float': 'none', 'top': 'auto', 'bottom': -coh}).find('.container').css({'bottom': 'auto', 'padding-bottom': 20});
			content.css({'width': ww, 'height': wh, 'float': 'none'});
			view.css({'width': ww, 'height': wh});
		}	
	}

	// Layout | IMAGES

	function reIm(){
		img.each(function(){
			imgT = $(this);
			imgT.css({'height': 'auto', 'width': '100%', 'left': 'auto', 'top': 'auto'});
			imgh = imgT.height();
			if(imgh < wh){
				imgw = imgT.width();
				imgT.css({'height': wh, 'width': 'auto'});
				diff = (imgw-ww)/2;
				imgT.css({'left': -diff});
			}else{
				diff = (imgh-wh)/2;
				imgT.css({'top': -diff});
			}
			imgw = imgT.width();
			if(imgw > ww){
				diff = (imgw-ww)/2;
				imgT.css({'left': -diff});
			}else{
				imgT.css({'left': 0});
			}
		});
	}

	// Next image | DESKTOP

	function prev(){ // Previous function
		if(ok == true && !single){
			ok = false;
			old = $('.visible');
			old.css({'z-index': 10});
			pre = old.prev('img');
			if(!pre.length > 0){
				pre = imgl;
			}
			pre.css({'z-index': 20}).fadeIn(1000, function(){
				old.hide().removeClass('visible');
				ok = true;
			}).addClass('visible');
		}
		turnReset();
	}

	// Previous image | DESKTOP

	function next(){ // Next function
		if(ok == true && !single){
			ok = false;
			old = $('.visible');
			old.css({'z-index': 10});
			nex = old.next('img');
			if(!nex.length > 0){
				nex = imgf;
			}
			nex.css({'z-index': 20}).fadeIn(1000, function(){
				old.hide().removeClass('visible');
				ok = true;
			}).addClass('visible');
		}
		turnReset();
	}

	// Slideshow | ON

	function turn(){
		slide = window.setInterval(function(){next();}, 5000);
	}

	// Slideshow | RESET

	function turnReset(){
		if(turnB){
			window.clearInterval(slide);
			turn();
		}
	}

})();