# Framework7 Feedback Plugin

This plugin  will show a Feedback Survey to collect user's satisfaction/mood into [Framework7](http://www.framework7.io) apps and websites.

Most aspects of the plugin are customizable by set or change the settings in your F7 initialization script. 

Made with Vanilla JS and only Framework7 components ([Dialog](https://framework7.io/docs/dialog.html), [Notification](https://framework7.io/docs/notification.html), [Prompt](https://framework7.io/docs/dialog.html#prompt) and [Alert](https://framework7.io/docs/dialog.html#alert)). Tested only in PWA without other implementations (Vue, React or Svelte).


The plugin implements Google Analytics with gtag events function, so make sure to install your GA code in order to send the events to your property.
It also lets you send data collected through Ajax POST to any remote server.


## Live Preview
https://nachoaguirre.github.io/framework7-feedback-plugin/


## Installation

1. Download plugin file (framework7.feedback.js) somewhere in your app folder.
2. Place file somewhere in your app folder (maybe /js/ folder)
3. Load file AFTER Framework7's script.

```
<script src="path/to/framework7.min.js"></script>
<script src="path/to/framework7.feedback.js"></script>
```



### Install & Enable Plugin

After include script file in your page, you need to initialize it. Do this BEFORE you init app:

```js
// install plugin to Framework7
Framework7.use(feedbackPlugin);

// init app
var app = new Framework7({
	root: '#app', // or what ever your root is
	name: 'your-app-name',
	feedback: { // Here you can change the default parameters of the plugin based on your needs. If you dont need to change some default parameter, then there is no need to include here.
		auto_init: true,
		time_delay: 15000,
		show_once: true,
	},
    ...
})
```

### Full Parameters List
```js
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
```


### Parameters Description

<table>
	<thead>
		<tr>
			<th>Parameter</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>    
		<tr>
			<td><b>auto_init</b></td>
			<td>boolean</td>
			<td>true</td>
			<td>Should Feedback dialog be presented on startup? (after time_delay params).</td>
		</tr>
		<tr>
			<td><b>time_delay</b></td>
			<td>integer</td>
			<td>15000</td>
			<td>Time before show the feedback dialog, in miliseconds.</td>
		</tr>
		<tr>
			<td><b>show_once</b></td>
			<td>boolean</td>
			<td>true</td>
			<td>Show dialog only once time per user, or always (based on LocalStorage data)</td>
		</tr>
		<tr>
			<td><b>storage_key</b></td>
			<td>string</td>
			<td>viewedFeedback</td>
			<td>LocalStorage key name set when user view feedback, used with show_once parameter</td>
		</tr>	
		<tr>
			<td>dialog &raquo;<br /><b>title</b></td>
			<td>string</td>
			<td>Sorry for the interruption ...</td>
			<td>Dialog title</td>
		</tr>
		<tr>
			<td>dialog &raquo;<br /><b>text</b></td>
			<td>string</td>
			<td>What do you think of our new site?</td>
			<td>Dialog inner text</td>
		</tr>
		<tr>
			<td>dialog &raquo;<br /><b>btn_ok</b></td>
			<td>string</td>
			<td>Send</td>
			<td>Text for submit button (could be HTML string)</td>
		</tr>
		<tr>
			<td>dialog &raquo;<br /><b>btn_cancel</b></td>
			<td>string</td>
			<td>Close</td>
			<td>Text for close dialog without send feedback (could be HTML string)</td>
		</tr>
		<tr>
			<td>dialog &raquo;<br /><b>post_ajax</b></td>
			<td>boolean</td>
			<td>false</td>
			<td>If enabled then user rating is sent to remote path/url via POST</td>
		</tr>
		<tr>
			<td>dialog &raquo;<br /><b>post_ajax_url</b></td>
			<td>string</td>
			<td>https://f7feedback.free.beeceptor.com</td>
			<td>URL to send the POST data from feedback. Available only if post_ajax is true</td>
		</tr>
		<tr>
			<td>dialog &raquo;<br /><b>post_ajax_param</b></td>
			<td>string</td>
			<td>rating</td>
			<td>Name of the key sent in POST to URL. Available only if post_ajax is true. </td>
		</tr>
		<tr>
			<td>options &raquo;<br /><b>option_1</b></td>
			<td>string</td>
			<td>🤬</td>
			<td>Content to show for the option with value 1</td>
		</tr>
		<tr>
			<td>options &raquo;<br /><b>option_2</b></td>
			<td>string</td>
			<td>🙁</td>
			<td>Content to show for the option with value 2</td>
		</tr>
		<tr>
			<td>options &raquo;<br /><b>option_3</b></td>
			<td>string</td>
			<td>😶</td>
			<td>Content to show for the option with value 3</td>
		</tr>
		<tr>
			<td>options &raquo;<br /><b>option_4</b></td>
			<td>string</td>
			<td>😁</td>
			<td>Content to show for the option with value 4</td>
		</tr>
		<tr>
			<td>options &raquo;<br /><b>option_5</b></td>
			<td>string</td>
			<td>😍</td>
			<td>Content to show for the option with value 5</td>
		</tr>
		<tr>
			<td>notification &raquo;<br /><b>show</b></td>
			<td>boolean</td>
			<td>true</td>
			<td>If user submits the feedback dialog (button with 'btn_ok' value), should be presented a notification message?</td>
		</tr>
		<tr>
			<td>notification &raquo;<br /><b>icon</b></td>
			<td>string</td>
			<td>< i class="f7-icons" >rays < /i ></td>
			<td>Notification icon HTML layout, e.g. < i class="f7-icons" >house< /i > or image < img src="path/to/icon.png" ></td>
		</tr>
		<tr>
			<td>notification &raquo;<br /><b>title</b></td>
			<td>string</td>
			<td>Thank You!</td>
			<td>Notification title</td>
		</tr>
		<tr>
			<td>notification &raquo;<br /><b>titleRightText</b></td>
			<td>string</td>
			<td>now</td>
			<td>Additional text on the right side of title</td>
		</tr>
		<tr>
			<td>notification &raquo;<br /><b>subtitle</b></td>
			<td>string</td>
			<td>You won a discount coupon for lunch with us</td>
			<td>Notification subtitle</td>
		</tr>
		<tr>
			<td>notification &raquo;<br /><b>text</b></td>
			<td>string</td>
			<td>Click to receive it</td>
			<td>Notification inner text</td>
		</tr>
		<tr>
			<td>prompt &raquo;<br /><b>show</b></td>
			<td>boolean</td>
			<td>true</td>
			<td>If user clicks the notification message, should be presented a prompt dialog?</td>
		</tr>
		<tr>
			<td>prompt &raquo;<br /><b>text</b></td>
			<td>string</td>
			<td>Enter your email</td>
			<td>Prompt dialog text</td>
		</tr>
		<tr>
			<td>prompt &raquo;<br /><b>response</b></td>
			<td>string</td>
			<td>We will send the instructions to </td>
			<td>Text presented in an alert window prepending the user response</td>
		</tr>
		<tr>
			<td>prompt &raquo;<br /><b>post_ajax</b></td>
			<td>boolean</td>
			<td>false</td>
			<td>If enabled then user response is sent to remote path/url via POST</td>
		</tr>
		<tr>
			<td>prompt &raquo;<br /><b>post_ajax_url</b></td>
			<td>string</td>
			<td>https://f7feedback.free.beeceptor.com</td>
			<td>URL to send the POST data with response. Available only if post_ajax is true</td>
		</tr>
		<tr>
			<td>prompt &raquo;<br /><b>post_ajax_param</b></td>
			<td>string</td>
			<td>answer</td>
			<td>Name of the key sent in POST to URL. Available only if post_ajax is true.</td>
		</tr>
		<tr>
			<td>prompt &raquo;<br /><b>post_ajax_include_rating</b></td>
			<td>boolean</td>
			<td>true</td>
			<td>Include the rating value set by the user on the ajax post? The value is sent as 'rating' post name.</td>
		</tr>
		<tr>
			<td>gtag &raquo;<br /><b>send</b></td>
			<td>boolean</td>
			<td>true</td>
			<td>If enabled then events will be sent to google analytics</td>
		</tr>
		<tr>
			<td>gtag &raquo;<br /><b>event</b></td>
			<td>string</td>
			<td>feedback</td>
			<td>Event name of all the hits sent to GA</td>
		</tr>
		<tr>
			<td>gtag &raquo;<br /><b>param_sent</b></td>
			<td>string</td>
			<td>sent</td>
			<td>Name of the parameter sent if user submit or cancel the feedback dialog</td>
		</tr>
		<tr>
			<td>gtag &raquo;<br /><b>param_rating</b></td>
			<td>string</td>
			<td>rating</td>
			<td>Name of the parameter of the value choosen in dialog</td>
		</tr>
		<tr>
			<td>gtag &raquo;<br /><b>param_prompt</b></td>
			<td>string</td>
			<td>answer</td>
			<td>Name of the parameter of the text sent by user in prompt</td>
		</tr>
	</tbody>
</table>


## API

The following method are available on a feedback instance

```javascript
app.feedback.open();    // Open the feedback dialog. Use it if 'auto_init' parameter is set to false.
```


## Credits
Made with effort and desire to learn in SCL.
