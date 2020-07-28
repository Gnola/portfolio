(function($) {

	// View Projects / Designs
  var $viewwork = $('#view-work')
  var $viewprojects = $('#view-projects')
  var $viewdesign = $('#view-designs')
  
  var $work = $('.work')
	var $projects = $('.projects')
  var $designs = $('.designs')

  var click = 0;

  var currentPage = 'projects';
  var previousPage = 'projects';
  var pageQueue = ['projects'];

  const changePage = (page) => {
    if (currentPage === page) {
      return
    }
    pageQueue.push(page)
    for (let i = 0; i < pageQueue.length; i++) {
      currentPage = pageQueue[i]
      previousPage = pageQueue[i - 1]
    }
    console.log('current:' + currentPage);
    console.log('previous:' + previousPage);

    if (page === 'work') {
      $viewwork.css('font-weight', 'bold')
      $viewdesign.css('font-weight', 'lighter')
      $viewprojects.css('font-weight', 'lighter')
      if (previousPage === 'projects') {
        $projects.slideToggle(1000, () => {
          $work.slideToggle(2000)
        });
      } else if (previousPage === 'designs')
        $designs.slideToggle(1000, () => {
          $work.slideToggle(2000)
        });
    } else if (page === 'projects') {
      $viewprojects.css('font-weight', 'bold')
      $viewwork.css('font-weight', 'lighter')
      $viewdesign.css('font-weight', 'lighter')
      if (previousPage === 'designs') {
        $designs.slideToggle(1000, () => {
          $projects.slideToggle(2000)
        });
      } else if (previousPage === 'work')
        $work.slideToggle(1000, () => {
          $projects.slideToggle(2000)
        });
    } else if (page === 'designs') {
      $viewdesign.css('font-weight', 'bold')
      $viewwork.css('font-weight', 'lighter')
      $viewprojects.css('font-weight', 'lighter')
      if (previousPage === 'projects') {
        $projects.slideToggle(1000, () => {
          $designs.slideToggle(2000)
        });
      } else if (previousPage === 'work')
        $work.slideToggle(1000, () => {
          $designs.slideToggle(2000)
        });
    }
  }

  $viewwork.on('click', () => {
    changePage('work')
  })
  $viewprojects.on('click', () => {
    changePage('projects')
  })
  $viewdesign.on('click', () => {
    changePage('designs')
  })


  // $viewwork.on('click', () => {
  //   console.log(click);
  //   if (click === -1) {
  //     $work.slideToggle(1000, () => {
  //       $designs.slideToggle(2000)
  //     });
  //     $viewwork.css('font-weight', 'bold')
  //     $viewprojects.css('font-weight', 'lighter')
  //     $viewdesign.css('font-weight', 'lighter')
  //     click = -1
  //   } else if (click === 1 || click === 0) {
  //     return
  //   }
  // })

  // $viewprojects.on('click', () => {
  //   console.log(click);
  //   if (click === 1) {
  //     $designs.slideToggle(1000, () => {
  //       $projects.slideToggle(2000)
  //     });
  //     $viewdesign.css('font-weight', 'lighter')
  //     $viewprojects.css('font-weight', 'bold')
  //     click = 0
  //     console.log(click);

  //   } else if (click === 0) {
  //     return
  //   }
  // })

	// $viewdesign.on('click', () => {
  //   console.log(click);
	// 	if (click === 0) {
	// 		$projects.slideToggle(1000, () => {
	// 			$designs.slideToggle(2000)
	// 		});
	// 		$viewdesign.css('font-weight', 'bold')
	// 		$viewprojects.css('font-weight', 'lighter')
  //     click = 1
  //     console.log(click);

	// 	} else if (click === 1) {
	// 		return
	// 	}
	// })


	// Modal
	var $modalcontainer = $('#modal-container')
	var $modal = $('#modal')
	var $designimg = $('.design-img')
	$designimg.on('click', function(){
		$modal.css('background', 'url(' + this.src + ')')
		$modal.css('display', 'block')
		$modal.css('background-repeat', 'no-repeat')
		$modal.css('background-size', 'contain')
		$modal.css('background-position', 'center')
		$modalcontainer.css('display', 'block')
	})
	$modalcontainer.on('click', function(){
		$modalcontainer.css('display', 'none')
	})

	// Show about me paragraph and toggle button text
	var $aboutbtn = $('#about-button')
	var $aboutpara = $('#about-para')
	$aboutbtn.on('click', function() {
		var $this = $(this)
		$this.text(function(i, text){
			return text === 'Read More' ? 'Read Less' : 'Read More';
		})
		$aboutpara.toggle($aboutbtn = 'Read Less'),
		$aboutbtn.prop('value', 'Read Less')
	})

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);
