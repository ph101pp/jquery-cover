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
(function($) {
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
//		Make sure to select the image (and not a wrapper)
		var img=$(this).is("img") ? $(this) : $("img", this),
			data = img.data("data");
			
//			IF already initialized -> update options.
			if(call == "_init" && data) {
				$.gB.opts(data, method, true);
				return;				
			}

			data = data || {
				self:$(this),
				hooks : []
			};
			
		if(call=="_init") {
			data.opts=method=="_init"?Array.prototype.slice.call(arguments,1):method;
			args=[data];
		}
		else args=[data].concat(args);
		img.data("data", data);
		if(call=="_triggerHook") return $.gB[call].apply(img, args);
		else try { 
				$.gB[call].apply(img, args);
			}
			catch(err){
				if(err!="hookReturnedFalse") throw err;
			}
	});
};
$.extend($.gB, {
	inteval:false,
////////////////////////////////////////////////////////////////////////////////
	_init : function (data) {
		
//		Extends defaults into opts.
		var opts=$.gB.opts(data, data.opts, true),
			css={},
			wrapper;
	//	data.opts.onWindowResize && $(window).resize(function(){data.self.greenishBackground("checkRatio")});
		data.img = new Image();

//		binding hooks to make them available.
		for(hooks in opts.hooks) $.gB.bindHook(data,hooks,opts.hooks[hooks]);

		data.img.src = data.self.attr("src");
		
		data.self.wrap($("<div class=\"greenishBackground\"\><div\>"));
		data.wrapper=data.self.parent().parent();
		
		if(opts.backgroundPosition) {
			wrapper=data.self.closest(".greenishBackground");
			if(opts.backgroundPosition.search(/top/i) >= 0) wrapper.addClass("top");
			else if(opts.backgroundPosition.search(/bottom/i) >= 0) wrapper.addClass("bottom");
			if(opts.backgroundPosition.search(/left/i) >= 0) wrapper.addClass("left");
			else if(opts.backgroundPosition.search(/right/i) >= 0) wrapper.addClass("right");
		}
		
		if(opts.loading) data.self.css({visibility:"hidden"});
		data.self.greenishBackground("_triggerHook","preLoading"); // hook
		if(!$.gB.interval) $.gB.interval=setInterval($.gB._loading, 100);

		data.opts.checkWindowResize && $(window)
			.unbind("resize.greenishBackground")
			.bind("resize.greenishBackground", function(){$(".greenishBackground").greenishBackground("checkRatio")});
	},
////////////////////////////////////////////////////////////////////////////////
	checkRatio : function() {
		$(this).each(function (){
		var img=$(this).is("img") ? $(this) : $("img", this),
			data = img.data("data"),
			wrapper = data.wrapper;
			current = wrapper.hasClass("height") ? "height":"width";
				
			wrapper.height()/wrapper.width() >= data.ratio ?
				wrapper.addClass("height").removeClass("width"):
				wrapper.addClass("width").removeClass("height");
			!wrapper.hasClass(current) && img.greenishBackground("_triggerHook","ratioSwitch"); // hook
		});
	},
////////////////////////////////////////////////////////////////////////////////
	_loading : function () {
		$.gB.complete=true;
		$(".greenishBackground").each(function (){
			var data = $("img", this).data("data"),
				image= data.img;
			if(!image || !image.complete || image.height <= 0 || image.width <= 0) {
				$.gB.complete=false;
				return;
			}
			data.ratio=image.height/image.width;
			marginTop=50/image.width*image.height; // Based on the fact that (marginTop 100% == width).
			data.self.css({"marginTop":-marginTop+"%"});
			if(data.opts.loading) data.self.css({visibility:"visible"});
			data.img.greenishBackground("_triggerHook","postLoading"); // hook
			data.wrapper.greenishBackground("checkRatio");
		});
		if($.gB.complete) {
			clearInterval($.gB.interval);
			$.gB.interval=false;
		}
	},
////////////////////////////////////////////////////////////////////////////////
	bindHook : function (data, hook, func) {
		func=typeof(func)=="function"?[func]:func;
		data.hooks[hook]=data.hooks[hook]||[];
		for(var key in func) data.hooks[hook].push(func[key]);
	},
////////////////////////////////////////////////////////////////////////////////
	_triggerHook : function (data, hook, param) {
		if(!data.hooks[hook] || data.hooks[hook].length <= 0) return param;
		for(var key in data.hooks[hook]) 
			if((param=data.hooks[hook][key].apply(this, [data,param])) !== false) continue;
			else throw "hookReturnedFalse";
		return param;
	},	
////////////////////////////////////////////////////////////////////////////////	
	opts : function (data, opts, save) {
		opts=$.extend(true,{},this.defaults, data.opts||{}, opts||{});
		if(save) data.opts=opts;
		return opts;
	},
////////////////////////////////////////////////////////////////////////////////	
	defaults : {
		loading:true,
		backgroundPosition:false,
		hooks: {},
		checkWindowResize:true
	}
});
})(jQuery);


