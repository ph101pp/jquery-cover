/*! 
 * greenishBackground: Creates a fullscreen image that always covers the available space without stretching the image. (à la css3 cover)
 * v0.0 - alpha (8/5/2011)
 * http://www.philippadrian.com
 * 
 * Copyright (c) 2011 Philipp C. Adrian
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses. 
 */
 
 /*
 */
;(function($) {
////////////////////////////////////////////////////////////////////////////////
$.gB=$.fn.greenishBackground = function (method){	
	if(typeof(method) === 'object' || !method) {
		args=arguments;
		call="_init";
	}
	else if($.gB[method]) {
		args=Array.prototype.slice.call(arguments,1);
		call=method;
	}
	else throw "Error: The method \""+method+"\" doesn't exist in greenishBackground";
	
	return $(this).each(function(){
		$.gB[call].apply(this, args);
	});
};
$.extend($.gB, {
	inteval:false,
	////////////////////////////////////////////////////////////////////////////////
	_init : function (opts) {
		var data = {
				img : new Image(),
				opts : $.extend(true,{},$.gB.defaults, opts||{})
			};	
		data.img.src = $(this).attr("src");
		$(this)
			.css({visibility:"hidden"})
			.wrap($("<div class=\"greenishBackground\"><div>"))
			.parent().parent()
			.data("data",data);
		if(!$.gB.interval) $.gB.interval=setInterval($.gB._loading, 100);
	},
	////////////////////////////////////////////////////////////////////////////////
	checkRatio : function() {
		$(this).each(function (){
			var self = $(this).hasClass("greenishBackground") ? 
					$(this) : 
					$(this).closest(".greenishBackground"), 
 				img = $("img",self);
			self.height()/self.width() >= img.height()/img.width() ?
				self.addClass("height").removeClass("width"):
				self.addClass("width").removeClass("height");
		});
	},
	////////////////////////////////////////////////////////////////////////////////
	_loading : function () {
		$.gB.complete=true;
		$(".greenishBackground").each(function (){
			var image=$(this).data("data").img;
			if(!image || !image.complete || image.height <= 0 || image.width <= 0) {
				$.gB.complete=false;
				return;
			}
			marginTop=50/image.width*image.height; // Based on the fact that (marginTop 100% == width).
			$("img",this).css({visibility:"visible","marginTop":-marginTop+"%"});
			$(this).greenishBackground("checkRatio");
		});
		if($.gB.complete) {
			clearInterval($.gB.interval);
			$.gB.interval=false;
		}
	},
	////////////////////////////////////////////////////////////////////////////////
	defaults : {
		loading:true,
		loader:false
	}
});
})(jQuery);


