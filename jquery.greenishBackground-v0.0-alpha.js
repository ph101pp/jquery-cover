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
		init : function (img) {
			var image = new Image();
				image.src = img.attr("src");
			img
				.css({visibility:"hidden"})
				.wrap($("<div class=\"greenishBackground\">").css($().greenishBackground.css.greenishBackground).data("img",image))
				.wrap($("<div class=\"center\">").css($().greenishBackground.css.center))
				.wrap($("<div class=\"wrapper\">").css($().greenishBackground.css.wrapper));
				
			if(!$.greenishBackground.interval) $.greenishBackground.interval=setInterval($.greenishBackground.loading, 100);
		},
		update : function (context) {
			context=$(context).length >=1 && !context.target? context:$("body");
			$(".greenishBackground",context).each(function (){
				var bg = $(window),
					img = $("img",this),
					imgHeight=img.height(),
					imgWidth=img.width(),
					height=bg.height(),
					width=bg.width(),
					bgRatio=height/width;
				bgRatio >= imgHeight/imgWidth ?
					img.css($.greenishBackground.css.height).css({marginLeft:"-50%",marginTop:0}).parent().css({height:"100%",width:"auto"}).parent().css({height:"100%",width:"300%",left:"50%", top:0}):
					img.css($.greenishBackground.css.width).css({marginTop:"-50%",marginLeft:0}).parent().css({height:"auto",width:"100%"}).parent().css({height:"300%",width:"100%",left:0, top:"50%"});
					
			});
		},
		loading : function () {
			$.greenishBackground.complete=true;
			$(".greenishBackground").each(function (){
				var image=$(this).data("img");
				if(!image || !image.complete || image.height <= 0) {
					$.greenishBackground.complete=false;
					return;
				}
				$("img",this).css({visibility:"visible"});
				$.greenishBackground.update($(this).parent());
			});

			if($.greenishBackground.complete) {
				clearInterval($.greenishBackground.interval);
				$.greenishBackground.interval=false;
			}
		},
		css: {
			height:{
				position:"relative",
				height:"100%",
				width:"auto",
				top:0,
				left:0
			},
			width:{
				position:"relative",
				width:"100%",
				height:"auto",
				top:0,
				left:0
			},
			wrapper:{},
			center:{
				position:"absolute",
				overflow:"visible",
			},
			greenishBackground:{
				position:"relative",
				top:0,
				left:0,
				width:"100%",
				height:"100%",
				overflow:"hidden"
			}
		}
});
})(jQuery);


