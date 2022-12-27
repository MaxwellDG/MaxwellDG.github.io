$('[path="5e1f207e07265"] #lay2').velocity({
	opacity: 0,
	scale: 1.5
}, {
	duration: 1
});
$('[path="5e1f207e07265"] #lay3, [path="5e1f207e07265"] #lay4, [path="5e1f207e07265"] #lay5, [path="5e1f207e07265"] #lay6, [path="5e1f207e07265"] #lay7').velocity({
	opacity: 0
}, {
	duration: 1
});
var delay5e1f258f89796 = setTimeout(function () {
	$('[path="5e1f207e07265"] #lay6, [path="5e1f207e07265"] #lay7').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258f89796);
var delay5e1f258f89710 = setTimeout(function () {
	$('[path="5e1f207e07265"] #lay5').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 800);
ARGO.options.removeTimeouts.push(delay5e1f258f89710);
var delay5e1f258f89600 = setTimeout(function () {
	$('[path="5e1f207e07265"] #lay3, [path="5e1f207e07265"] #lay4').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 1200);
ARGO.options.removeTimeouts.push(delay5e1f258f89600);
var delay5e1f258f8958e = setTimeout(function () {
	$('[path="5e1f207e07265"] #lay2').velocity({
		opacity: 1,
		scale: 1
	}, {
		duration: 500
	});
}, 1800);
ARGO.options.removeTimeouts.push(delay5e1f258f8958e);