<!DOCTYPE html>
<html>
<head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-XXXXXXXXXX');
	</script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#2196f3">
    <title>Feedback Plugin</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/framework7/5.7.14/css/framework7.bundle.min.css" />
  </head>
<body>
<div id="app">
	<div class="view view-main">
    	<div data-name="home" class="page">
			<div class="navbar">
            	<div class="navbar-bg"></div>
				<div class="navbar-inner">
					<div class="title">Feedback Plugin</div>
				</div>
			</div>

			<div class="page-content">
            	<p class="showfb">Show Feedback Dialog</p>
			</div>
		</div>
	</div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/framework7/5.7.14/js/framework7.bundle.min.js"></script>
<script src="framework7.feedback.js"></script>

<script>
	Framework7.use(feedbackPlugin);
	var $$ = Dom7;	

	var app = new Framework7({
		root: '#app',
		feedback: {
			time_delay: 2000,
			show_once: false,
		},
	});

	var mainView = app.views.create('.view-main');
</script>

<script>
	// This below code is used only for this demo page, no need to add at yours ;)
	Dom7(document).on('click', ".showfb", function (e) {
		app.feedback.open();
	});

</script>
</body>
</html>
