$('[path="5e1f203512949"] #lay2').velocity({
	zIndex: 298,
	translateX: 0,
	scale: 1
}, {
	duration: 1
});
$('[path="5e1f203512949"] #lay4').velocity({
	zIndex: 296,
	translateX: 275,
	scale: 0.75
}, {
	duration: 1
});
$("[path='5e1f203512949'] #lay2").off("touchstart").on("touchstart", function () {
	if($(this).hasClass('small')) {
		$('[path="5e1f203512949"] #lay2').removeClass('small');
		$('[path="5e1f203512949"] #lay2').velocity({
			zIndex: 298,
			translateX: 0,
			scale: 1
		}, {
			duration: 300
		});
		$('[path="5e1f203512949"] #lay4').addClass('small');
		$('[path="5e1f203512949"] #lay4').velocity({
			zIndex: 296,
			translateX: 275,
			scale: 0.75
		}, {
			duration: 300
		});
	}
});
$("[path='5e1f203512949'] #lay4").off("touchstart").on("touchstart", function () {
	if($(this).hasClass('small')) {
		$('[path="5e1f203512949"] #lay2').addClass('small');
		$('[path="5e1f203512949"] #lay2').velocity({
			zIndex: 296,
			translateX: 275,
			scale: 0.75
		}, {
			duration: 300
		});
		$('[path="5e1f203512949"] #lay4').removeClass('small');
		$('[path="5e1f203512949"] #lay4').velocity({
			zIndex: 298,
			translateX: 0,
			scale: 1
		}, {
			duration: 300
		});
	}
});