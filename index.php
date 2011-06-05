<!DOCTYPE html>
<html>
 	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		<title>greenishSlides</title>
		<script type="text/javascript" src="jquery-1.5.1.min.js"></script>
		<script type="text/javascript" src="jquery.greenishBackground-v0.0-alpha.js"></script>

<!--		<script type="text/javascript" src="jquery.jswipe-0.1.2.js"></script>-->
		<script type="text/javascript">
			(function($) {
				$(document).ready(function() {
				//	$("#background").greenishBackground();
				
				var context = $("body"),
					background = $(".greenishBackground"),
					wrapper = $(".wrapper"),
					img = $("img"),
					css= {
						width: {
							wrapperCSS : {
								position:"relative",
								width:"100%",
							},
							backgroundCSS : {
								position:"absolute",
								height:"100%",
								width:"100%",
								overflow:"hidden"
							},
							imgCSS : {
								display:"inline",
								width:"100%"
							}
						},
						height: {
							wrapperCSS : {
								position:"relative",
								height:"100%",
								width:"10100%",
								left:"-5000%",
								textAlign:"center"
							},
							backgroundCSS : {
								position:"absolute",
								height:"100%",
								width:"100%",
								overflow:"hidden"
							},
							imgCSS : {
								display:"inline",
								height:"100%"
							}						}
					}
					
					
					
					background.css(css.width.backgroundCSS);
					wrapper.css(css.width.wrapperCSS);
					img.css(css.width.imgCSS);
					

				var height=background.height(),
					imgHeight=386,
					imgWidth=600,
					percent=height*100/imgHeight;
					width=percent*imgWidth/100;
					
					console.log(height,imgHeight);
					console.log(percent, width);
					
//					wrapper.css("width", width);
					
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
		<div class="greenishBackground">
				<div class="wrapper">
					<img src="angular_momentum.jpg" id="background">
				</div>
		</div>
	</body>
</html>
