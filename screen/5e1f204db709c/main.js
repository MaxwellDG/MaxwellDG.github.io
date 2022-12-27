$("[path='5e1f204db709c'] [popup='popup01'] #_content .tap").off("touchstart").on("touchstart", function () {
	$("[path='5e1f204db709c'] [popup='popup01'] #_content2").show();
	$("[path='5e1f204db709c'] [popup='popup01'] #_content").hide();
});

$("[path='5e1f204db709c'] [popup='popup01'] #_content2 .tap").off("touchstart").on("touchstart", function () {
	$("[path='5e1f204db709c'] [popup='popup01'] #_content").show();
	$("[path='5e1f204db709c'] [popup='popup01'] #_content2").hide();
});