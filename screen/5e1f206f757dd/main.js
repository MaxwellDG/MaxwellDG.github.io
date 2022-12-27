$("[path='5e1f206f757dd']  #lay6").off("touchstart").on("touchstart", function () {
	console.log("INIT some kind of main flow screen thing? 1")
	ARGO.init("flow2", 1)
});
$("[path='5e1f206f757dd']  #lay7").off("touchstart").on("touchstart", function () {
	console.log("INIT some kind of main flow screen thing? 2")
	ARGO.init("flow3", 1)
});
$("[path='5e1f206f757dd']  #lay8").off("touchstart").on("touchstart", function () {
	console.log("INIT some kind of main flow screen thing? 3")
	ARGO.init("flow4", 1)
});
$('[path="5e1f206f757dd"] #lay9, [path="5e1f206f757dd"] #lay10, [path="5e1f206f757dd"] #lay11, [path="5e1f206f757dd"] #lay12').velocity({
	opacity: 0
}, {
	duration: 1
});
var delay5e1f258f40201 = setTimeout(function () {
	$('[path="5e1f206f757dd"] #lay9').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	})
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258f40201);
var delay5e1f258f40264 = setTimeout(function () {
	$('[path="5e1f206f757dd"] #lay10').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	})
}, 900);
ARGO.options.removeTimeouts.push(delay5e1f258f40264);
var delay5e1f258f402c0 = setTimeout(function () {
	$('[path="5e1f206f757dd"] #lay11').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	})
}, 1400);
ARGO.options.removeTimeouts.push(delay5e1f258f402c0);
var delay5e1f258f4031b = setTimeout(function () {
	$('[path="5e1f206f757dd"] #lay12').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	})
}, 1600);
ARGO.options.removeTimeouts.push(delay5e1f258f4031b);