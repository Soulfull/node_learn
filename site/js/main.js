$(function() {
	$('body').append('<span class="helper"></span>');
	var h = $('.helper');
	var hTop = h.offset().top;
	var inProgress = true;

	hTop = Math.floor(hTop);

	function onSuccess(data) {

		var cl = h.clone();
		var elems = $([]);

		for(var i in data) {
			var el = document.createElement('div');
			var $el = $(el);
			elems = elems.add(el);
			$el.addClass('article').html(data[i]['text']);
			$el.css({
				'opacity' : 0,
				'margin-top': 150
			});
			$('body').append($el);
		}
		
		elems.animate({
			'opacity': 1,
			'margin-top': 0
		},1000, function() {
			h.remove();
			$('body').append(cl);
			h = cl;
			hTop = Math.floor(h.offset().top);

			inProgress = true;
		});

	}

	function send() {
		$.get('http://localhost:3000/data.json',{}, onSuccess);
		inProgress = false;
	}

	$(document).scroll(function(){
		var scrollWin = document.documentElement.clientHeight + window.pageYOffset;

		if (scrollWin >= hTop && inProgress) {
			send();
		}

	});
});

