<!DOCTYPE html>
<html>
 	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		<title>greenishSlides</title>
		<script type="text/javascript" src="jquery-1.5.1.min.js"></script>
		<script type="text/javascript" src="jquery.greenishBackground-v0.0-alpha.js"></script>
		<link rel="stylesheet" type="text/css" href="jquery.greenishBackground-v0.0-alpha.css">

<!--		<script type="text/javascript" src="jquery.jswipe-0.1.2.js"></script>-->
		<script type="text/javascript">
			(function($) {
				$(document).ready(function() {
				//	$("#background").greenishBackground();
				
				var context = $("body"),
					background = $(".greenishBackground"),
					wrapper = $(".wrapper"),
					img = $("img"),
				
					
				var imgHeight=386,
					imgWidth=600;
					marginTop=50/imgWidth*imgHeight; // Based on the fact that (marginTop 100% == width).
					img.css("marginTop", -(marginTop)+"%");
					
				});
			})(jQuery);
		</script>
		
		<style>
			body {
				position:absolute;
				background-color:#eeffee;
				top:20px;
				right:100px;
				bottom:20px;
				left:222px;
			}
			.greenishBackground {
				background-color:#ffeeee;
			}

		</style>
	</head>
	<body>
		<div class="greenishBackground height">
				<div>
					<img src="angular_momentum.jpg" id="background">
				</div>
		</div>
	</body>
</html>
