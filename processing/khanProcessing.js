//http://stackoverflow.com/questions/25341597/how-can-khan-academy-computer-programs-be-run-offline-or-on-my-own-website
//http://stackoverflow.com/a/25341598/1154693
//http://stackoverflow.com/questions/25341597/how-can-khan-academy-computer-programs-be-run-offline-or-on-my-own-website
//http://stackoverflow.com/a/25341598/1154693
function khanProcessing( )
{
	var canvas = document.getElementById("canvas");
	var processing = new Processing(canvas, function(processing) {
		processing.size(400, 400);
		processing.background(0xFFF);
		processing.frameRate(60);
		var mouseIsPressed = false;
		processing.mouseIsPressed = mouseIsPressed;
		
		processing.mousePressed = function () { mouseIsPressed = true; processing.mouseIsPressed = mouseIsPressed; };
		processing.mouseReleased = function () { mouseIsPressed = false; processing.mouseIsPressed = mouseIsPressed; };

		var keyIsPressed = false;
		processing.keyPressed = function () { keyIsPressed = true; };
		processing.keyReleased = function () { keyIsPressed = false; };

		function getImage(s) {
			var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
			processing.externals.sketch.imageCache.add(url);
			return processing.loadImage(url);
		}
		processing.getImage = getImage;
		
		processing.getWebImage = function( url ) {
			processing.externals.sketch.imageCache.add(url);
			return processing.loadImage(url);
		}
		
		var rotateFn = processing.rotate; // backup original
    processing.rotate = function(angle) {
        rotateFn(processing.radians(angle));
    }
		
		var cosFn = processing.cos; // backup original
    processing.cos = function(angle) {
        return cosFn(processing.radians(angle));
    }
		
    var sinFn = processing.sin; // backup original
    processing.sin = function(angle) {
        return sinFn(processing.radians(angle));
    }
		
		var arcFn = processing.arc;
		processing.arc = function(x, y, w, h, startAng, stopAng) {
				return arcFn(x, y, w, h, processing.radians(startAng), processing.radians(stopAng) );
		}
		
		processing.draw = function(){ 'override "draw" in your own code' };
		
	});
	return processing;
};

var KP = new khanProcessing();