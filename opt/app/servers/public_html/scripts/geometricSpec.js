var textBoxHeights = [25,40,55,50,75,75,90,105,105,120,90];
var textBoxWidths = [50,80,90,100,100,110,115,115,120,120,180];
var msgDivHeights = [60,80,90,100,110,125,135,150,160,170,180];
var msgDivWidths = [125,150,175,190,195,200,210,210,220,230,240];
var scaleXs = [2,2,1.85,1.85,1.75,1.6,1.55,1.5,1.4,1.4,1.65];
var radiuses = [20,30,40,45,50,55,60,65,70,75,72];
var startPointXs = [0,10,10,10,20,20,20,20,20,20,20];
var startPointYs = [10,10,10,10,20,20,20,30,30,30,30];
var controlPoint1Xs = [10,10,10,10,20,20,20,20,20,20,20];
var controlPoint1Ys = [15,15,15,15,25,25,25,35,35,35,35]
var endPoint1Xs = [45,65,80,90,90,95,100,100,105,105,105];
var endPoint1Ys = [30,40,40,45,55,60,65,70,75,80,85];
var controlPoint2Xs = [20,40,70,85,80,90,90,90,90,90,90];
var controlPoint2Ys = [15,20,30,40,40,50,50,55,55,55,55];
var endPoint2Xs = [30,50,60,60,60,65,70,70,80,85,90];
var endPoint2Ys = [10,10,10,10,20,20,20,30,30,30,30];
/*console.log("Checking Length : "+textBoxHeights.length);
console.log("Checking Length : "+textBoxWidths.length);
console.log("Checking Length : "+msgDivHeights.length);
console.log("Checking Length : "+scaleXs.length);
console.log("Checking Length : "+radiuses.length);
console.log("Checking Length : "+startPointXs.length);
console.log("Checking Length : "+startPointYs.length);
console.log("Checking Length : "+controlPoint1Xs.length);
console.log("Checking Length : "+controlPoint1Ys.length);
console.log("Checking Length : "+endPoint1Xs.length);
console.log("Checking Length : "+endPoint1Ys.length);
console.log("Checking Length : "+controlPoint2Xs.length);
console.log("Checking Length : "+controlPoint2Ys.length);
console.log("Checking Length : "+endPoint2Xs.length);
console.log("Checking Length : "+endPoint2Ys.length);*/	
var GeometricSpecification = function () {
		
		this.getDimensionsForText =	function (text,userIndex)
		{
		var textLength = text.length-1;
		var lengthIndex = parseInt(textLength/10,10);
		console.log(textLength+" LENGTH INDEX: "+lengthIndex);
		var dimensions = {radius:0,scaleX:0,
						textBoxHeight:0,textBoxWidth:0,
						msgDivHeight:0,msgDivWidth:0,
						floatMessagesTo:'right', fillColor: 'rgb(75,84,255)'};
		if(lengthIndex<=10)	
		{			
		dimensions["radius"] = radiuses[lengthIndex];
		dimensions["scaleX"] = scaleXs[lengthIndex];
		dimensions["textBoxHeight"] = textBoxHeights[lengthIndex];
		dimensions["textBoxWidth"] = textBoxWidths[lengthIndex];
		dimensions["msgDivHeight"] = msgDivHeights[lengthIndex];
		dimensions["msgDivWidth"] = msgDivWidths[lengthIndex];
		dimensions["floatMessagesTo"] = userIndex > 0 ? 'right' : 'left';
		dimensions["fillColor"] = userIndex > 0 ? 'rgb(75,84,255)' : 'rgb(255,224,25)';
		}
		else
		{
		var residualLengthIndex = lengthIndex -10;
		console.log("Residual Length Index : "+residualLengthIndex);
		dimensions["textBoxHeight"] = 120+(residualLengthIndex*10);
		dimensions["textBoxWidth"] = 160;
		dimensions["msgDivHeight"] = 180+(residualLengthIndex*10);
		dimensions["msgDivWidth"] = 200;
		dimensions["floatMessagesTo"] = userIndex > 0 ? 'right' : 'left';
		dimensions["fillColor"] = userIndex > 0 ? 'rgb(75,84,255)' : 'rgb(255,224,25)';
		}
		return dimensions;
		};

		this.getTrailCoordinates = function(text,userIndex)
		{
		var trailCoordinates = {startPoint: {x: 0,y: 0},
								controlPoint1: {x: 0,y: 0},
								endPoint1: {x: 0,y: 0},
								controlPoint2: {x: 0,y: 0},
								endPoint2: {x: 0,y: 0}};
		var textLength = text.length-1;
		var lengthIndex = parseInt(textLength/10,10);
		trailCoordinates["startPoint"]["x"] = userIndex>0 ? startPointXs[lengthIndex] : startPointXs[lengthIndex]*(-1);
		trailCoordinates["startPoint"]["y"] = startPointYs[lengthIndex];
		trailCoordinates["controlPoint1"]["x"] = userIndex>0 ? controlPoint1Xs[lengthIndex] : controlPoint1Xs[lengthIndex]*(-1);
		trailCoordinates["controlPoint1"]["y"] = controlPoint1Ys[lengthIndex];
		trailCoordinates["endPoint1"]["x"] = userIndex>0 ? endPoint1Xs[lengthIndex] : endPoint1Xs[lengthIndex]*(-1);
		trailCoordinates["endPoint1"]["y"] = endPoint1Ys[lengthIndex];
		trailCoordinates["controlPoint2"]["x"] = userIndex>0 ? controlPoint2Xs[lengthIndex] : controlPoint2Xs[lengthIndex]*(-1);
		trailCoordinates["controlPoint2"]["y"] = controlPoint2Ys[lengthIndex];
		trailCoordinates["endPoint2"]["x"] = userIndex>0 ? endPoint2Xs[lengthIndex] : endPoint2Xs[lengthIndex]*(-1);
		console.log('TRAIL END POINT X :'+trailCoordinates["endPoint2"]["x"]);
		trailCoordinates["endPoint2"]["y"] = endPoint2Ys[lengthIndex];

		return trailCoordinates;
		}
	}