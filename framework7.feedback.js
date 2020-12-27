var fbdialog;
var fbnotification;
var rating;

window.feedbackPlugin = {
	name: 'feedback',	
	
	install() {
		var css    = '.dialog-fb{width:90%;max-width:500px;margin-left:-45%}.fb-container{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;margin-top:10px}.fb-item{margin-right:10px;display:flex;justify-content:center;align-items:center;user-select:none}.fb-item:last-child{margin-right:0}.fb-radio{display:none}.fb-radio ~ span{font-size:2rem;filter:grayscale(0.5);cursor:pointer;transition:0.3s}.fb-radio:checked ~ span{filter:grayscale(0);font-size:2.5rem}';
		var head   = document.head || document.getElementsByTagName('head')[0];
		var style  = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); }
		head.appendChild(style);
	},
	
	
	
	params: {
		feedback: {
			auto_init: true,
			time_delay: 15000,
			show_once: true,
			storage_key: 'viewedFeedback',
			dialog:{
				title: 'Sorry for the interruption...',
				text: 'What do you think of our new site?',
				btn_ok: 'Send',
				btn_cancel: 'Close',
				post_ajax: false,
				post_ajax_url: 'https://f7feedback.free.beeceptor.com',
				post_ajax_param: 'rating'
			},
			options:{
				option_1: '🤬',
				option_2: '🙁',
				option_3: '😶',
				option_4: '😁',
				option_5: '😍',
			},
			notification:{
				show: true,
				icon: '<i class="f7-icons">rays</i>',
				title: 'Thank You!',
				titleRightText: 'now',
				subtitle: 'You won a discount coupon for lunch with us',
				text: 'Click to receive it',
				closeTimeout: 5000,
			},
			prompt:{
				show: true,
				text: 'Enter your email',
				response: 'We will send the instructions to ',
				post_ajax: false,
				post_ajax_url: 'https://f7feedback.free.beeceptor.com',
				post_ajax_param: 'answer',
				post_ajax_include_rating: true,
			},
			gtag:{
				send: true,
				event: 'feedback',
				param_sent: 'sent',
				param_rating: 'rating',
				param_prompt: 'answer',
			},
		}
	},
	
	
	
	create: function(){
		var app = this;
		var params = app.params.feedback;
		
		app.feedback = {
			open: function(){
				setTimeout(function(){ 
					if( !params.show_once ){ app.openDialog(); } 
					else { if( !localStorage[params.storage_key] ){ app.openDialog(); } }
				}, params.time_delay);
			}
		}
		
		fbdialog = app.dialog.create({
			title: params.dialog.title,
			text: params.dialog.text,
			content: `
				<div class="fb-container">
					<div class="fb-item"><label for="fb-5"><input class="fb-radio" type="radio" name="feedback" id="fb-5" value="5"><span>`+params.options.option_5+`</span></label></div>
					<div class="fb-item"><label for="fb-4"><input class="fb-radio" type="radio" name="feedback" id="fb-4" value="4"><span>`+params.options.option_4+`</span></label></div>
					<div class="fb-item"><label for="fb-3"><input class="fb-radio" type="radio" name="feedback" id="fb-3" value="3"><span>`+params.options.option_3+`</span></label></div>
					<div class="fb-item"><label for="fb-2"><input class="fb-radio" type="radio" name="feedback" id="fb-2" value="2"><span>`+params.options.option_2+`</span></label></div>
					<div class="fb-item"><label for="fb-1"><input class="fb-radio" type="radio" name="feedback" id="fb-1" value="1"><span>`+params.options.option_1+`</span></label></div>
				</div>
			`,
			buttons: [
				{
					text: params.dialog.btn_cancel,
					close: true,
					onClick: function(dialog,e){
						app.addGtag({[params.gtag.param_sent]: false});
					}
				},
				{
					text: params.dialog.btn_ok,
					bold: true,
					color: 'orange',
					onClick: function(dialog,e){
						rating = $$("input[name='feedback']:checked").val();
						app.addGtag({[params.gtag.param_sent]: true, [params.gtag.param_rating]: parseInt(rating) });
						if(params.dialog.post_ajax){ app.postAjax(params.dialog.post_ajax_url, { [params.dialog.post_ajax_param]: parseInt(rating) }); }
						if(params.notification.show){ app.openNotification(); }
					}
				},
				
			],
			cssClass: 'dialog-fb'
		});
		
		var promptCloseOnClick = params.prompt.show ? false : true;
		fbnotification = app.notification.create({
			icon: params.notification.icon,
			title: params.notification.title,
			titleRightText: params.notification.titleRightText,
			subtitle: params.notification.subtitle,
			text: params.notification.text,
			closeOnClick: promptCloseOnClick,
			closeTimeout: params.notification.closeTimeout,
			on: {
				click: function(){
					fbnotification.close();
					if(params.prompt.show){
						app.dialog.prompt(params.prompt.text, function (answer) {
							if(params.prompt.post_ajax){
								var ajax_params = {};
								ajax_params[params.prompt.post_ajax_param] = answer;
								if(params.prompt.post_ajax_include_rating){ ajax_params['rating'] = rating; }
								app.postAjax(params.prompt.post_ajax_url, ajax_params);
							}
							app.addGtag({[params.gtag.param_prompt]: answer });
							app.dialog.alert(params.prompt.response + answer);
						});
					} 
				}
			},
		});
	},


	
	instance: {
		openDialog: function(){ fbdialog.open(); localStorage[app.params.feedback.storage_key] = true; },
		openNotification: function(){ fbnotification.open() },
		addGtag: function(gtag_params={}){ var app = this; var params = app.params.feedback.gtag; if(params.send) { var event_name = params.event; gtag('event', event_name, gtag_params); } },
		postAjax: function(url, ajax_params={}){ var app = this; var params = app.params.feedback; app.request.post(url, ajax_params, function(r) { /* console.log('response:', r); */ });	}
	},
	
	
	
	on: {
		init: function () {
			var app = this;
			var params = app.params.feedback;	
			if(params.auto_init){
				setTimeout(function(){ 
					if( !params.show_once ){ app.openDialog(); } 
					else { if( !localStorage[params.storage_key] ){ app.openDialog(); } }
				}, params.time_delay);	
			}		
		},
	}
	
};