$('[path="5e1f206742af3"] #lay2, [path="5e1f206742af3"] #lay3, [path="5e1f206742af3"] #lay4, [path="5e1f206742af3"] #lay5').velocity({
	opacity: 0
}, {
	duration: 1
});
var delay5e1f258fa5566 = setTimeout(function () {
	$('[path="5e1f206742af3"] #lay2, [path="5e1f206742af3"] #lay3').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258fa5566);
var delay5e1f258fa563c = setTimeout(function () {
	$('[path="5e1f206742af3"] #lay4, [path="5e1f206742af3"] #lay5').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 800);
ARGO.options.removeTimeouts.push(delay5e1f258fa563c);