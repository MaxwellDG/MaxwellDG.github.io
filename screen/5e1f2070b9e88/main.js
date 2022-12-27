$('[path="5e1f2070b9e88"] #lay3, [path="5e1f2070b9e88"] #lay4, [path="5e1f2070b9e88"] #lay5').velocity({
	opacity: 0
}, {
	duration: 1
});
var delay5e1f258f76c0e = setTimeout(function () {
	$('[path="5e1f2070b9e88"] #lay5').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258f76c0e);
var delay5e1f258f76b92 = setTimeout(function () {
	$('[path="5e1f2070b9e88"] #lay4').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 800);
ARGO.options.removeTimeouts.push(delay5e1f258f76b92);
var delay5e1f258f76aeb = setTimeout(function () {
	$('[path="5e1f2070b9e88"] #lay3').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 1300);
ARGO.options.removeTimeouts.push(delay5e1f258f76aeb);