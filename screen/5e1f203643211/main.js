$('[path="5e1f203643211"] #lay2_0, [path="5e1f203643211"] #lay2_2, [path="5e1f203643211"] #lay3, [path="5e1f203643211"] #lay4, [path="5e1f203643211"] #lay6, [path="5e1f203643211"] #lay8, [path="5e1f203643211"] #lay9').velocity({
	opacity: 0
}, {
	duration: 1
});
$('[path="5e1f203643211"] #lay5, [path="5e1f203643211"] #lay7').velocity({
	opacity: 1,
	width: "0px"
}, {
	display: "block",
	duration: 1
});
function loadImages(sources, callback) {
	var images = {},
		loadedImages = 0,
		numImages = 0;
	// get num of sources
	for (var src in sources) {
		numImages++;
	}
	for (var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if (++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
};
function draw(images) {
	var stage = new Kinetic.Stage({
		container : 'container',
		width : 245,
		height : 245
	});
	var layer = new Kinetic.Layer();
	var Wedge = new Kinetic.Wedge({
		x : 122,
		y : 122,
		radius : 122,
		angle : 0,
		fillPatternImage : images.wheel,
		fillPatternOffset : {
			x : 122,
			y : -122
		},
		rotation : -90
	});
	layer.add(Wedge);
	stage.add(layer);
	var tween = new Kinetic.Tween({
		node : Wedge,
		angle : 360,
		duration : 3
	});
	var delay6 = setTimeout(function() {
		tween.play();
	}, 1200);
}
var sources = {
	wheel : 'screen/5e1f203643211/images/5e1f203643211_lay2_1.png',
};
loadImages(sources, function(images) {
	draw(images);
});
var delay5e1f258f9cdb8 = setTimeout(function () {
	$('[path="5e1f203643211"] #lay9').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 300);
ARGO.options.removeTimeouts.push(delay5e1f258f9cdb8);
var delay5e1f258f9caec = setTimeout(function () {
	$('[path="5e1f203643211"] #lay2_0').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 800);
ARGO.options.removeTimeouts.push(delay5e1f258f9caec);
var delay5e1f258f9cb78 = setTimeout(function () {
	$('[path="5e1f203643211"] #lay3, [path="5e1f203643211"] #lay8').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 1000);
ARGO.options.removeTimeouts.push(delay5e1f258f9cb78);
var delay5e1f258f9cc30 = setTimeout(function () {
	$('[path="5e1f203643211"] #lay5').velocity({
		width: "339px"
	}, {
		duration: 500
	});
}, 1200);
ARGO.options.removeTimeouts.push(delay5e1f258f9cc30);
var delay5e1f258f9ccef = setTimeout(function () {
	$('[path="5e1f203643211"] #lay7').velocity({
		width: "339px"
	}, {
		duration: 500
	});
}, 1700);
ARGO.options.removeTimeouts.push(delay5e1f258f9ccef);
var delay5e1f258f9cbd4 = setTimeout(function () {
	$('[path="5e1f203643211"] #lay4, [path="5e1f203643211"] #lay6').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 2200);
ARGO.options.removeTimeouts.push(delay5e1f258f9cbd4);
var delay5e1f258f9caec = setTimeout(function () {
	$('[path="5e1f203643211"] #lay2_2').velocity({
		opacity: 1
	}, {
		duration: 500,
		display: "block"
	});
}, 3500);
ARGO.options.removeTimeouts.push(delay5e1f258f9caec);