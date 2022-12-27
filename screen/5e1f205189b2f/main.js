$('[path="5e1f205189b2f"] #lay3, [path="5e1f205189b2f"] #lay4, [path="5e1f205189b2f"] #lay5, [path="5e1f205189b2f"] #lay6').velocity({
	opacity: 0
}, {
	duration: 1
});
var delay5e1f258f98220 = setTimeout(function () {
	$('[path="5e1f205189b2f"] #lay6').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258f98220);
var delay5e1f258f9817c = setTimeout(function () {
	$('[path="5e1f205189b2f"] #lay5').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 800);
ARGO.options.removeTimeouts.push(delay5e1f258f9817c);
var delay5e1f258f980dd = setTimeout(function () {
	$('[path="5e1f205189b2f"] #lay4').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 1300);
ARGO.options.removeTimeouts.push(delay5e1f258f980dd);
var delay5e1f258f9802e = setTimeout(function () {
	$('[path="5e1f205189b2f"] #lay3').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 1800);
ARGO.options.removeTimeouts.push(delay5e1f258f9802e);