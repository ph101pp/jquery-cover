/*! 
 * greenishBackground: jQuery Slideshow plugin - v0.0 - alpha (8/6/2011)
 * http://www.philippadrian.com
 * 
 * Copyright (c) 2011 Philipp C. Adrian
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses. 
 */
 
 /*
 greenishSlides(
 
 	activate
 	deactivate
 	next
 	prev
 	setOpts
 
 )
 
 */
;(function($) {
////////////////////////////////////////////////////////////////////////////////
$.greenishBackground=$.fn.greenishBackground = function (method){	
	return $(this).each(function(){
		$().greenishBackground.init($(this));	
	});
};
$.extend($().greenishBackground, {
		inteval:false,
		init : function (image) {
			var img = new Image();
				img.src = image.attr("src");
			image
				.css({visibility:"hidden"})
				.wrap($("<div class=\"greenishBackground\"><div>")
				.data("img",img))
				
				
			if(!$().greenishBackground.interval) $().greenishBackground.interval=setInterval($().greenishBackground.loading, 100);
		},
		update : function(context) {
			context=$(context).length >= 1 && !context.target ? context:$("body");
			$(".greenishBackground",context).each(function (){
				var img = $("img",this);
				$(this).height()/$(this).width() >= img.height()/img.width() ?
					$(this).addClass("height").removeClass("width"):
					$(this).addClass("width").removeClass("height");
			});
		},
		loading : function () {
			$().greenishBackground.complete=true;
			$(".greenishBackground").each(function (){
				var image=$(this).data("img");
				if(!image || !image.complete || image.height <= 0) {
					$().greenishBackground.complete=false;
					return;
				}
				marginTop=50/image.width*image.height; // Based on the fact that (marginTop 100% == width).
				$("img",this).css({visibility:"visible","marginTop":-(marginTop)+"%"});
				$().greenishBackground.update($(this).parent());
			});

			if($().greenishBackground.complete) {
				clearInterval($().greenishBackground.interval);
				$().greenishBackground.interval=false;
			}
		},
});
})(jQuery);


