$('[path="5e1f207c46464"] #lay1').velocity({
	opacity: 1
}, {
	display: "block",
	duration: 1
});
var delay5e1f258f4e22b = setTimeout(function () {
	$('[path="5e1f207c46464"] #lay1').velocity({
		opacity: 0
	}, {
		duration: 3000,
		display: "none"
	});
}, 200);
ARGO.options.removeTimeouts.push(delay5e1f258f4e22b);