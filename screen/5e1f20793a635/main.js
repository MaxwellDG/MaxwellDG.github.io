$('[path="5e1f20793a635"] #lay2').velocity({
	opacity: 0,
	scale: 1.5
}, {
	duration: 1
});
$('[path="5e1f20793a635"] #lay3, [path="5e1f20793a635"] #lay4, [path="5e1f20793a635"] #lay5, [path="5e1f20793a635"] #lay6').velocity({
	opacity: 0
}, {
	duration: 1
});
var delay5e1f258fa291c = setTimeout(function () {
	$('[path="5e1f20793a635"] #lay5, [path="5e1f20793a635"] #lay6').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258fa291c);
var delay5e1f258fa288f = setTimeout(function () {
	$('[path="5e1f20793a635"] #lay4').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 800);
ARGO.options.removeTimeouts.push(delay5e1f258fa288f);
var delay5e1f258fa27fc = setTimeout(function () {
	$('[path="5e1f20793a635"] #lay3').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 1200);
ARGO.options.removeTimeouts.push(delay5e1f258fa27fc);
var delay5e1f258fa277e = setTimeout(function () {
	$('[path="5e1f20793a635"] #lay2').velocity({
		opacity: 1,
		scale: 1
	}, {
		duration: 500
	});
}, 1800);
ARGO.options.removeTimeouts.push(delay5e1f258fa277e);