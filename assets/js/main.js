// We need to pass $ on the function
// so we could use $ on our script.
jQuery(document).ready(function($) {

	// Have to make functions since there are 2 elements
	// that would use these elements:
	function scrollBtnContainer(elemClass){
		return $('<div></div>', { class: elemClass});
	}

	function arrowButton(elemClass){
		return $('<span></span>', { class: elemClass + " glyphicon glyphicon-chevron-down" })
	}

	function seeAllLink(elemClass){
		return $('<a></a>', { href: 'http://google.com', text: 'See All', class:  elemClass });
	}

	function setStyles(){

		// Set initial style values for scroll btn.

		// Add a 30px padding to the last child of the
    	// trending events list to give space for the 
    	// arrow button.
		$('.trending-event:last-child, .upcoming-event:last-child').css('marginBottom', '30px');

		// Set initial styles for button containers.
		$('.te-scroll-btn-container, .ue-scroll-btn-container').css({
			// Set the position to absolute to
			// remove it to the normal document flow.
			position: 'absolute',
			top: '319px',
			height: '30px'
		});
	}

	// When the scroll button is clicked.
	function animateScroll(eventsList, buttonContainer, arrow, seeAllLink){
		eventsList.animate({ scrollTop : eventsList.scrollTop() + 230 }, 1000, function(){
						
			// Check if the bottom of the scroll is reached.
			if(eventsList.scrollTop() + eventsList.innerHeight() >= eventsList[0].scrollHeight) {
	        	// $(".te-scroll-btn").remove();
	        	arrow.remove();
	        	buttonContainer.append(seeAllLink);
	    	}

    	});

	}


	var lastScrollTop = 0;

	function detectScroll(currentST, elementList, btnContainer, link, arrow){

		if(currentST > lastScrollTop){

			// Downscroll.

			// Check if the bottom of the scroll is reached.
			if(elementList.scrollTop() + elementList.innerHeight() >= elementList[0].scrollHeight) {
	        	arrow.remove();
	        	btnContainer.append(link);
	    	}

		}else{

			// If the arrow up is not yet set. Set it.
			// To make sure that the arrow would only
			// be included once on a scroll up.
			if(btnContainer.has(link)){
				link.remove();
            	btnContainer.append(arrow);
    			
			}

		}

		lastScrollTop = currentST;
	}

	// tE = Trending Events.
	// uE = Upcoming Events.

	// The arrow button.
	// Trending Events arrow.
	var tEArrow  = arrowButton('te-scroll-btn');

	// Upcoming Events arrow.
	var uEArrow = arrowButton('ue-scroll-btn');

	// The black div containing the arrows.
    var tEventsScrollBtnContainer = scrollBtnContainer('te-scroll-btn-container').append(tEArrow);
    var uEventsScrollBtnContainer = scrollBtnContainer('ue-scroll-btn-container').append(uEArrow);

	// The containers of the events with 'See All' links.
	// also append the button containers(containing the buttons).
    var trendingEventsContainer = $('.trending-events-container').append(tEventsScrollBtnContainer);
    var tESeeAllLink = seeAllLink('trending-event-see-all');

    var upcomingEventsContainer = $('.upcoming-events-container').append(uEventsScrollBtnContainer);
    var uESeeAllLink = seeAllLink('upcoming-event-see-all');

    // This is the one that scrolls, not the container.
    var trendingEventsList = $('.trending-events-list');
    var upcomingEventsList = $('.upcoming-events-list');

    // Set necessary styles.
    setStyles();

    // When buttons were scrolled by clicking.
	tEventsScrollBtnContainer.on('click', function(){
		// $(this).prev() refers to the events list.
		animateScroll($(this).prev(), $(this), tEArrow, tESeeAllLink);
	});

	uEventsScrollBtnContainer.on('click', function(){
		animateScroll($(this).prev(), $(this), uEArrow, uESeeAllLink);
	});

	// When a scroll is triggered.
	trendingEventsList.scroll(function(){

		detectScroll($(this).scrollTop(), trendingEventsList, tEventsScrollBtnContainer, tESeeAllLink, tEArrow);
				
	});

	upcomingEventsList.scroll(function(){

		detectScroll($(this).scrollTop(), upcomingEventsList, uEventsScrollBtnContainer, uESeeAllLink, uEArrow);
				
	});


	// Header Test

	var searchRowPosition = $('.search-row').position();
	var searchRow = $('.search-row');
	var searchField = $('.search-form .search-field');
	var searchForm = $('.search-form');
	var totalHeight = parseInt(searchField.css('height'), 10) + parseInt(searchForm.css('marginTop'), 10);
	//alert(totalHeight);
	$('#masthead').css('backgroundColor', 'rgba(255,255,255,1)');

	var shown = false;
	$(window).scroll(function(){

		if($(this).scrollTop() > (searchRowPosition.top + totalHeight)){

			if(shown == false){

				$('#masthead').css({ zIndex : 999, position : 'fixed', background: '#fff', opacity : '0', width: '100%'});
				$('#masthead').animate({
					opacity : '1'
				});


				$('.search-row').removeClass('row').addClass('col-md-6').detach().insertAfter('.navigation-col');
				$('.search-form').css({ marginTop : '10px' });

				$('.navigation-col').removeClass('col-md-9').addClass('col-md-3');

				$('.branding-col .site-branding').css({ display: 'inline', marginRight : '40px'});

				$('<button></button>', { text : 'Menu', class : 'nav-button' }).css({ border : 'none', background: '#3EB54B', color : '#fff' }).appendTo($('.branding-col')).on('click', function(){
					$('#site-navigation').fadeToggle();
					// $('#primary-menu').removeClass('navbar-nav').addClass('nav-pills nav-stacked').css({
					// 	position: 'absolute'
					// });

				});
				//$('#site-navigation').animate({ width: '20px'});
				//.insertAfter($('.site-header'))
				//$('#site-navigation').detach();
				var navButtonPos = $('.nav-button').position();
				$('#site-navigation').css({position : 'absolute', top : '60px', left : '-200px', background: '#fff'}).hide();
				$('#primary-menu').removeClass('navbar-nav').addClass('nav-pills nav-stacked text-left');
				
			}

			shown = true;
		}

		if($(this).scrollTop() == 0 && shown == true){

			$('#masthead').css({ position : 'relative', opacity : '0'});
			$('#masthead').animate({ opacity: '1' }, 1000);

			$('.search-row').removeClass('col-md-6').addClass('row').detach().insertAfter($('#masthead'));
			$('.nav-button').hide();
			$('.search-row').detach().prependTo('.main-container').hide().fadeIn(1000);
			$('.search-form').css('marginTop', '70px');
			//$('#site-navigation').animate({ width: '966px'});
			//$('#site-navigation').detach().insertAfter($('.site-branding'));
			$('#site-navigation').css({position : 'relative', top : '0', left : '0',background: '#fff'}).show();
			$('#primary-menu').removeClass('nav-pills nav-stacked text-left').addClass('navbar-nav');
			$('.navigation-col').removeClass('col-md-3').addClass('col-md-9');
			shown = false;

		}
	});


});