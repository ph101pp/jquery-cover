/*! 
 * jQuery Cover plugin - v1.0.0 (https://github.com/greenish/jquery-cover)
 * 
 * Copyright (c) 2011 Philipp Adrian (www.philippadrian.com)
 *
 * The MIT Licence (http://opensource.org/licenses/MIT)
 *   
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions: 

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {
////////////////////////////////////////////////////////////////////////////////
var cover=$.fn.cover = function (method){	
	var call, args;
	if(typeof(method) === 'object' || !method) {
		args=arguments;
		call="_init";
	}
	else if(cover[method]) {
		args=Array.prototype.slice.call(arguments,1);
		call=method;
	}
	else throw "Error: The method \""+method+"\" doesn't exist in jQuery Cover";
	
	return $(this).each(function(){
//		Make sure to select the image (and not a wrapper)
		var img=$(this).is("img") ? $(this) : $("img", this),
			data = img.data("data");
			
//			IF already initialized -> update options.
			if(call == "_init" && data) {
				cover._opts(data, method, true);
				return;				
			}
			data = data || {
				self:$(this),
				callbacks : []
			};
			
		if(call=="_init") {
			data.opts=method=="_init"?Array.prototype.slice.call(arguments,1):method;
			args=[data];
		}
		else args=[data].concat(args);
		img.data("data", data);
		if(call=="_triggerCallback") return cover[call].apply(img, args);
		else try { 
				cover[call].apply(img, args);
			}
			catch(err){
				if(err!="callbackReturnedFalse") throw err;
			}
	});
};
$.extend(cover, {
	interval:false,
////////////////////////////////////////////////////////////////////////////////
	_init : function (data) {
		
//		Extends defaults into opts.
		var opts=cover._opts(data, data.opts, true);
		data.img = new Image();

//		binding callbacks to make them available.
		for(var callbacks in opts.callbacks) cover.bindCallback(data,callbacks,opts.callbacks[callbacks]);

		data.img.src = data.self.attr("src");
		data.self.wrap($("<div class=\"greenishCover height\"\><div\>"));
		data.wrapper=data.self.parent().parent();
		
		if(opts.backgroundPosition) {
			if(opts.backgroundPosition.search(/top/i) >= 0) data.wrapper.addClass("top");
			else if(opts.backgroundPosition.search(/bottom/i) >= 0) data.wrapper.addClass("bottom");
			if(opts.backgroundPosition.search(/left/i) >= 0) data.wrapper.addClass("left");
			else if(opts.backgroundPosition.search(/right/i) >= 0) data.wrapper.addClass("right");
		}
		
		if(opts.loadHidden) data.self.css({visibility:"hidden"});
		data.self.cover("_triggerCallback","preLoading"); // #CALLBACK
		if(!cover.interval) cover.interval=setInterval(cover._loading, 100);

		data.opts.checkWindowResize && $(window)
			.unbind("resize.cover")
			.bind("resize.cover", function(){$(".greenishCover").cover("update")});
	},
////////////////////////////////////////////////////////////////////////////////
	update : function() {
		var that = $(this),
			img=that.is("img") ? that : that.find("img"),
			data = img.data("data"),
			wrapper = data.wrapper,
			current = wrapper.hasClass("height") ? "height":"width",
			newRatio = wrapper.height()/wrapper.width() >= data.ratio ? "height":"width";

		if(current !== newRatio) {
			wrapper.addClass(newRatio).removeClass(current);
			img.cover("_triggerCallback","ratioSwitch"); // #CALLBACK
		}
	},
////////////////////////////////////////////////////////////////////////////////
	_loading : function () {
		cover.complete=true;
		$(".greenishCover").each(function (){
			var data = $("img", this).data("data"),
				image= data.img;
			if(!image || !image.complete || image.height <= 0 || image.width <= 0) {
				cover.complete=false;
				return;
			}
			data.ratio=image.height/image.width;
			var marginTop=50/image.width*image.height; // Based on the fact that (marginTop 100% == width).
			data.self.css({"marginTop":-marginTop+"%"});
			if(data.opts.loadHidden) data.self.css({visibility:"visible"});
			data.self.cover("_triggerCallback","postLoading"); // #CALLBACK
			data.wrapper.cover("update");
		});
		if(cover.complete) {
			clearInterval(cover.interval);
			cover.interval=false;
		}
	},
////////////////////////////////////////////////////////////////////////////////
	bindCallback : function (data, callback, func) {
		func=typeof(func)=="function"?[func]:func;
		data.callbacks[callback]=data.callbacks[callback]||[];
		for(var key in func) data.callbacks[callback].push(func[key]);
	},
////////////////////////////////////////////////////////////////////////////////
	_triggerCallback : function (data, callback, param) {
		if(!data.callbacks[callback] || data.callbacks[callback].length <= 0) return param;
		for(var key in data.callbacks[callback]) 
			if((param=data.callbacks[callback][key].apply(this, [data,param])) !== false) continue;
			else throw "callbackReturnedFalse";
		return param;
	},	
////////////////////////////////////////////////////////////////////////////////	
	_opts : function (data, opts, save) {
		opts=$.extend(true,{},this.defaults, data.opts||{}, opts||{});
		if(save) data.opts=opts;
		return opts;
	},
////////////////////////////////////////////////////////////////////////////////	
	defaults : {
		backgroundPosition:false,
		callbacks: {},
		checkWindowResize:true,
		loadHidden : true
	}
});
})(jQuery);


