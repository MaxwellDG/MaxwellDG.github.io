$('[path="5e1f204c70d05"] #lay3, [path="5e1f204c70d05"] #lay4, [path="5e1f204c70d05"] #lay5, [path="5e1f204c70d05"] #lay6').velocity({
	opacity: 0
}, {
	duration: 1
});
$('[path="5e1f204c70d05"] #lay7').velocity({
	opacity: 1,
	width: "0px"
}, {
	display: "block",
	duration: 1
});
var delay5e1f258f73a50 = setTimeout(function () {
	$('[path="5e1f204c70d05"] #lay6').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258f73a50);
var delay5e1f258f738cf = setTimeout(function () {
	$('[path="5e1f204c70d05"] #lay3').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 800);
ARGO.options.removeTimeouts.push(delay5e1f258f738cf);
var delay5e1f258f73950 = setTimeout(function () {
	$('[path="5e1f204c70d05"] #lay4').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 1200);
ARGO.options.removeTimeouts.push(delay5e1f258f73950);
var delay5e1f258f739d4 = setTimeout(function () {
	$('[path="5e1f204c70d05"] #lay5').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 1700);
ARGO.options.removeTimeouts.push(delay5e1f258f739d4);
var delay5e1f258f73c0e = setTimeout(function () {
	$('[path="5e1f204c70d05"] #lay7').velocity({
		width: "822.5px"
	}, {
		duration: 500
	});
}, 2200);
ARGO.options.removeTimeouts.push(delay5e1f258f73c0e);