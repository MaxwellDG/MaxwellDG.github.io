$('[path="5e1f2080d24a6"] #lay4, [path="5e1f2080d24a6"] #lay5, [path="5e1f2080d24a6"] #lay6, [path="5e1f2080d24a6"] #lay7').velocity({
	opacity: 1,
	height: "0px"
}, {
	display: "block",
	duration: 1
});
$('[path="5e1f2080d24a6"] #lay8').velocity({
	opacity: 0
}, {
	duration: 1
});
var delay5e1f258f5f1de = setTimeout(function () {
	$('[path="5e1f2080d24a6"] #lay8').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258f5f1de);
var delay5e1f258f5f07a = setTimeout(function () {
	$('[path="5e1f2080d24a6"] #lay4').velocity({
		height: "154.5px"
	}, {
		duration: 500
	});
}, 400);
ARGO.options.removeTimeouts.push(delay5e1f258f5f07a);
var delay5e1f258f5f0dd = setTimeout(function () {
	$('[path="5e1f2080d24a6"] #lay5').velocity({
		height: "169.5px"
	}, {
		duration: 500
	});
}, 800);
ARGO.options.removeTimeouts.push(delay5e1f258f5f0dd);
var delay5e1f258f5f133 = setTimeout(function () {
	$('[path="5e1f2080d24a6"] #lay6').velocity({
		height: "196.5px"
	}, {
		duration: 500
	});
}, 1300);
ARGO.options.removeTimeouts.push(delay5e1f258f5f133);
var delay5e1f258f5f18a = setTimeout(function () {
	$('[path="5e1f2080d24a6"] #lay7').velocity({
		height: "193.5px"
	}, {
		duration: 500
	});
}, 1800);
ARGO.options.removeTimeouts.push(delay5e1f258f5f18a);