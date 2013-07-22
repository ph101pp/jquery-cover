#jQuery Cover plugin

This plugin mimics the CSS3 `background-size:cover;` behavior and therefore makes it available in all browsers.

Compatible with IE 7.0+, Firefox 3+, Safari 3.1+, Opera 9.6+ and Google Chrome.

[Example](http://greenish.github.io/jquery-cover)

#Documentation

1.	General
----------------
	
To start off, get the newest version of the jQuery Cover plugin from Github and move it into your project folder.

Include the files __(JS AND CSS)__ into your HTML and you're ready to go:

``` javascript
jQuery(function(){
	$("img.myBackgroundImage").cover();
});
```

So the code above takes an image:

``` html
<body>
	<img src="myBackground.jpg" class="myBackgroundImage">
</body>
```

And makes it cover its parent container element completely. 

The new markup will look like this:

``` html
<body>
	<div class="greenishCover width|height">
		<div>
			<img src="myBackground.jpg" class="myBackgroundImage">
		</div>
	</div>
</body>
```
	
2.	Methods
----------------
	
``` javascript
$(".myBackgroundImage").cover([Object options]);				
```

> ####Initialize / Update Options
>
> Initialize the jQuery Cover plugin on a set of Images.
>
> Optional you can pass an object with options (see below) to the function.
>
> Also you can change options with this at any time after initialisation.

-------------------------
	
``` javascript
$(".myBackgroundImage").cover("update");				
```

> #### Update
>
> Tests the aspect ratio of the container against the aspect ratio of the image and updates the display of the image if necessary.

-------------------------
	
``` javascript
$(".myBackgroundImage").cover("bindCallback", Function);				
```

> #### Bind a Callback/Event
>
> Registers or binds a callback function to a certain event. (see below). 


3.	Options
----------------

Options can be set or changed by passing an object to the cover() function. This can be done on initialisation or afterwards to change any value.

Here are all the possibile options (set to their __default values__):

``` javascript
$(".myBackgroundImage").cover({
		backgroundPosition:"center",
		checkWindowResize:true,
		loadHidden:true,
		callbacks: {}
	});
```

###Option Details

``` javascript
backgroundPosition:				String									Default: "center"
```

> Works similar to the CSS property ``background-position``. 
> 
> Can be any of the following: __"center"__, __"top"__, __"right"__, __"bottom"__, __"left"__ 
>
> And also a combination of two like: __"top left"__ or __"bottom left"__.

-------------------------	

``` javascript
checkWindowResize:				boolean									Default: true
```

> If true the plugin will automatically call ``$(".myBackgroundImage").cover("update");`` on window resize.

-------------------------	

``` javascript
loadHidden:						boolean									Default: true
```

> If true the image is hidden until its displayed properly. This prevents some jittering.

-------------------------	

``` javascript
callbacks: {																Default: {}
	"callbackName":				Function(callback function)
								Object	(multiple callback functions)
								Array	(multiple callback functions)	
}	
```


> Allows to register callback functions during initialisation. 
>
> To learn more about the available callbacks look at the Callbacks/Events chapter below.

-------------------------

4.	Callbacks/Events
----------------

During the runtime of the plugin a bunch of callbacks are fired. 

Callbacks can be registered by adding the functions to the options object or by calling the "bindCallback" method.

Every callback function receives the _data_ object as first parameter while the following parameters can change.

By returning __false__ in the callback the pluging cancels the current event and stopps its action. 

This is a list of all the callbacks that are available at the moment (to find them in the code search for _#CALLBACK_):

``` javascript
"preLoading"					function(data)					Context: $(".myBackgroundImage")
```

> Called on initialisation before the image is loaded.

-------------------------

``` javascript
"postLoading"					function(data)					Context: $(".myBackgroundImage")
```

> Called on initialisation after the image is loaded.

-------------------------

``` javascript
"ratioSwitch"					function(data)					Context: $(".myBackgroundImage")
```

> Called when the display style of the image changes to either be ``width:100%`` or ``height:100%``.


###Add New Callback

If you need a new callback that is missing, feel free to add it in the code!
Just put the following at the place you need the call:

``` javascript
[context].cover("_triggerCallback","myCallbackName" [,parameterOne, parameterTwo, ...]);
```

Notice that the new callback will come with all the features of the default ones:
* The _data_ object will always be passed as the first parameter. (And you can add as many additional parameters as you wish.)
* return __false__ will stop the further execution of the acutal event.

__When you added a new callback, tell me about it! So I can consider adding it to the default callbacks.__
