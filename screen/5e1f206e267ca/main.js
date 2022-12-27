$('[path="5e1f206e267ca"] #lay2, [path="5e1f206e267ca"] #lay3, [path="5e1f206e267ca"] #lay4').velocity({
	opacity: 1,
	height: "0px"
}, {
	duration: 1
});
var delay5e1f258f95bc0 = setTimeout(function () {
	$('[path="5e1f206e267ca"] #lay4').velocity({
		height: "116.5px"
	}, {
		duration: 800
	});
}, 500);
ARGO.options.removeTimeouts.push(delay5e1f258f95bc0);
var delay5e1f258f95afe = setTimeout(function () {
	$('[path="5e1f206e267ca"] #lay2').velocity({
		height: "211px"
	}, {
		duration: 800
	});
}, 1200);
ARGO.options.removeTimeouts.push(delay5e1f258f95afe);
var delay5e1f258f95b63 = setTimeout(function () {
	$('[path="5e1f206e267ca"] #lay3').velocity({
		height: "220px"
	}, {
		duration: 800
	});
}, 2000);
ARGO.options.removeTimeouts.push(delay5e1f258f95b63);