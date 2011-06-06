<!DOCTYPE html>
<html>
 	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		<title>greenishBackground</title>
		<script type="text/javascript" src="jquery-1.5.1.min.js"></script>
		<script type="text/javascript" src="jquery.greenishBackground-v0.0-alpha.js"></script>
		<link rel="stylesheet" type="text/css" href="jquery.greenishBackground-v0.0-alpha.css">

<!--		<script type="text/javascript" src="jquery.jswipe-0.1.2.js"></script>-->
		<script type="text/javascript">
			(function($) {
				$(document).ready(function() {
					$("#background").greenishBackground( {
						loading:false
						
					});
					$(window).resize(function(){$("#background").greenishBackground("checkRatio")});
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
		<img src="angular_momentum.jpg" id="background">
	</body>
</html>
