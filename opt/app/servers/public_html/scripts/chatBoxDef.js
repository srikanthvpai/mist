var ChatBox = function(participantA,participantB,chatId) {
	
	this.currentUser = participantA;
	this.otherUser = participantB;
	this.chatId = chatId;
	this.canvasMessageBoxes = [];
	this.scrollPaneApis = {};
	this.messages = [];
	this.msgCount = 0;
	this.socket = null;
	this.userIndex = 0;
	this.initializeChat = function(currentUser)
	{
		var element = $("#"+this.chatId).find('#chatMessagesPanel').jScrollPane({autoReinitialise: true,
    	stickToBottom:true,
    	maintainPosition:true,
  			});
  		var api = element.data('jsp');
  		this.scrollPaneApis[this.chatId] = api;
		this.scrollPaneApis[this.chatId].scrollToBottom(true);
	};

	this.transmitMessageToCanvas = function(msgText,sender,recepient)
	{
		msgCount = this.messages.push(msgText);
  		this.displayMessage(msgText,sender,recepient);
  		this.scrollPaneApis[this.chatId].scrollToBottom(true);
  		this.scrollPaneApis[this.chatId].reinitialise();
	};

	this.displayMessage = function(msgText,sender,recepient) {

		console.log("sender "+sender+" recepient "+recepient+ " message :"+msgText);

		var tempUser = (sender.firstName ==='administrator')? recepient:sender;
		var tempUserIndex = (sender.firebaseId===this.currentUser.firebaseId)?this.userIndex:this.userIndex*(-1);
		console.log("TEMP USER INDEX IS "+tempUserIndex);
		var dimensions = geometricSpecification.getDimensionsForText(msgText,tempUserIndex);
		var element = this.getMsgDiv(tempUser,msgCount,dimensions["msgDivWidth"],dimensions["msgDivHeight"]);
		
		count = this.canvasMessageBoxes.length;
		this.canvasMessageBoxes.unshift(count);
		canvasId = this.currentUser+"dispMsgCanvas"+count;
		
		$("#"+this.chatId).find('#canvasLayer').append(element);
		this.startDrawing(msgText,msgCount,dimensions,tempUserIndex);
		$("#"+this.chatId).find('#messageArea').val("");
		};

	this.startDrawing = function (text,msgCount,dimensions,userIndex)
	{
		if(text.length <=110)
		{
		this.writeText(text,msgCount,dimensions);
		this.drawCanvas(text,msgCount,dimensions);
		this.drawTrail(text,msgCount,userIndex,dimensions);
		}
		else
		{
		console.log(text+": Trying to write big Text !!!!"+text.length);
		this.writeText(text,msgCount,dimensions);
		this.drawBigCanvas(text,msgCount,dimensions);
		this.drawBigTrail(text,msgCount,userIndex,dimensions);
		}
	};

	this.writeText = function(text,msgCount,dimensions)
	{
		var textElm = $("#"+this.chatId).find("#msgBox"+msgCount).find('#textContent');
		textElm.text(text);
		var textBox = $("#"+this.chatId).find("#msgBox"+msgCount).find('#textBox');
		var msgWrapDiv = $("#"+this.chatId).find("#msgBox"+msgCount).find('.msgWrap');
		var textLength = text.length;
		textBox.css({height:dimensions["textBoxHeight"],width:dimensions["textBoxWidth"]});
		msgWrapDiv.css({height:dimensions["msgDivHeight"],width:dimensions["msgDivWidth"],float: dimensions["floatMessagesTo"]});
	};	
	this.drawCanvas = function(text,msgCount,dimensions)
	{
		var canvasElement = $("#"+this.chatId).find("#msgBox"+msgCount).find('.sbCanvas');
		var canvas = canvasElement[0];
		var ctx = canvas.getContext('2d');
		ctx.save();
		ctx.translate(canvas.width/2,canvas.height/2);
		ctx.scale(dimensions["scaleX"],1);
		ctx.beginPath();
		ctx.arc(0,0,dimensions["radius"],0,2*Math.PI,false);
		ctx.fillStyle = dimensions["fillColor"];
		ctx.fill();
		ctx.restore();
	};
	this.drawBigCanvas = function(text,msgCount,dimensions)
	{
		var canvasElement = $("#"+this.chatId).find("#msgBox"+msgCount).find('.sbCanvas');
		var canvas = canvasElement[0];
		var ctx = canvas.getContext('2d');
		var posX =15;
		var posY= 25;
		var height= dimensions.textBoxHeight;
		var width= 170;
		var radius =15;
		ctx.beginPath();
		ctx.moveTo(posX+radius,posY);
		ctx.quadraticCurveTo(posX,posY,posX,posY+radius);
		ctx.lineTo(posX,posY+height-radius);
		ctx.quadraticCurveTo(posX,posY+height,posX+radius,posY+height);
		ctx.lineTo(posX+width-radius,posY+height);
		ctx.quadraticCurveTo(posX+width,posY+height,posX+width,posY+height-radius);
		ctx.lineTo(posX+width,posY+radius);
		ctx.quadraticCurveTo(posX+width,posY,posX+width-radius,posY);
		ctx.lineTo(posX+radius,posY);
		ctx.fillStyle = dimensions["fillColor"];
		ctx.fill();
		ctx.restore();
	}
	this.drawTrail = function(text,msgCount,userIndex,dimensions)
	{
		var trailCoordinates = geometricSpecification.getTrailCoordinates(text,userIndex);
		var textLength = text.length;
		var canvasElement = $("#"+this.chatId).find("#msgBox"+msgCount).find('.sbCanvas');
		var canvas = canvasElement[0];
		var ctx = canvas.getContext('2d');
		ctx.save();
		ctx.translate(canvas.width/2,canvas.height/2);
		ctx.beginPath();
		ctx.moveTo(trailCoordinates["startPoint"]["x"],trailCoordinates["startPoint"]["y"]);
		ctx.quadraticCurveTo(trailCoordinates["controlPoint1"]["x"],trailCoordinates["controlPoint1"]["y"],trailCoordinates["endPoint1"]["x"],trailCoordinates["endPoint1"]["y"]);
		ctx.quadraticCurveTo(trailCoordinates["controlPoint2"]["x"],trailCoordinates["controlPoint2"]["y"],trailCoordinates["endPoint2"]["x"],trailCoordinates["endPoint2"]["y"]);
		ctx.fillStyle = dimensions["fillColor"];
		ctx.fill();
		ctx.restore();
	};
	this.drawBigTrail = function(text,msgCount,userIndex,dimensions)
	{
		var canvasElement = $("#"+this.chatId).find("#msgBox"+msgCount).find('.sbCanvas');
		var canvas = canvasElement[0];
		var ctx = canvas.getContext('2d');
		var posX = userIndex>0 ? 125 : 45;	
		var posY = 20+dimensions.textBoxHeight;
		ctx.save();
		ctx.moveTo(posX,posY);
		if(userIndex > 0)
		{
		ctx.quadraticCurveTo(posX,posY+20,posX+(50*userIndex),posY+40);
		ctx.quadraticCurveTo(posX+20,posY+22,posX+35,posY);
		}
		else
		{
		ctx.quadraticCurveTo(posX,posY+20,posX+(35*userIndex),posY+40);
		ctx.quadraticCurveTo(posX+30,posY+22,posX+35,posY);
		}
		ctx.fill();
	};
	this.intitalizeWebSocket = function(id) {
		this.socket = io(CURRENT_URL+'/defaultChat');	
		var userData = {"sender": this.currentUser,"recepient": this.otherUser};
		var that = this;
		if(typeof adminMode==='undefined')
		{
		 	this.socket.emit("initialize",JSON.stringify(userData));
		} 
		this.socket.on("message",function(message){
			that.drawMessage(message);
		});
	};

	this.setUserIndex = function(id) {
			var that = this;
			console.log("Current URL FROM CHAT "+CURRENT_URL);
			$.ajax({url : CURRENT_URL+'/positionIndex',	type: 'GET',data: {userId: id}}).done(
				function(data){
					//userIndex = data["userIndex"];
					var posIndex = JSON.parse(data);
					console.log("USER INDEX DATA IS : "+posIndex.positionIndex);
					that.userIndex = 1;
					console.log("SET USERINDEX !!");
				});
	};

	this.sendMessage = function(){
		var inputMsg = $('#'+this.chatId).find('#messageArea').val();
		var transmitObject = {msgText: inputMsg, sender: this.currentUser,recepient: this.otherUser};
		if(typeof this.socket != 'undefined'){
			this.socket.emit("message",JSON.stringify(transmitObject));
		}
	};

	this.drawMessage = function(message)
	{
		var transmitObject = JSON.parse(message);
		console.log("Recieved message and drawing it back !!!"+message);
		this.transmitMessageToCanvas(transmitObject["msgText"],transmitObject["sender"],transmitObject["recepient"]);
	};

	this.getMsgDiv = function(id,msgCount,msgDivWidth,msgDivHeight){
	var elm = "<div class='msgBox' id='msgBox"+msgCount+"'><div class='msgWrap'>";
	elm += "<canvas class='sbCanvas' id='sbCanvas' width="+msgDivWidth+" height="+msgDivHeight+"></canvas>";
	elm += "<div id='textBox'>";
	elm += "<div id='textContent'></div>";
	elm += "</div></div></div>";
	return elm;
	}
}