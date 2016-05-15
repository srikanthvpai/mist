var GroupChat = function() {
  this.canvasMessageBoxes = [];
}

var check = 1;
GroupChat.prototype.drawMessage = function(msgText) {

    msgCount = this.canvasMessageBoxes.length+1;
    console.log("msgCount : "+msgCount);
    check = check>0? -1 : 1;
   /* var tempUser = (sender.firstName ==='administrator')? recepient:sender;
    var tempUserIndex = (sender.firebaseId===this.currentUser.firebaseId)?this.userIndex:this.userIndex*(-1);
    console.log("TEMP USER INDEX IS "+tempUserIndex);*/
    var dimensions = geometricSpecification.getDimensionsForText(msgText,check);
    var element = this.getMsgDiv("SRIKANTH",msgCount,dimensions["msgDivWidth"],dimensions["msgDivHeight"]);
    
    count = this.canvasMessageBoxes.length;
    this.canvasMessageBoxes.unshift(count);
    canvasId = "srikanth"+"dispMsgCanvas"+count;
    
    $("#grpMsgPanel").find('#canvasLayer').append(element);
    this.startDrawing(msgText,msgCount,dimensions,check);
    console.log("DIMENSION : "+dimensions["textBoxHeight"]);
    $("#grpChat").find('#grpMsgArea').val("");
};

GroupChat.prototype.startDrawing = function (text,msgCount,dimensions,userIndex)
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

GroupChat.prototype.writeText = function(text,msgCount,dimensions)
  {
    var textElm = $("#grpMsgPanel").find("#msgBox"+msgCount).find('#textContent');
    textElm.text(text);
    var textBox = $("#grpMsgPanel").find("#msgBox"+msgCount).find('#textBox');
    var msgWrapDiv = $("#grpMsgPanel").find("#msgBox"+msgCount).find('.msgWrap');
    var senderPicMsg = $("#grpMsgPanel").find("#msgBox"+msgCount).find('.senderPicMsg');
    var textLength = text.length;
    textBox.css({height:dimensions["textBoxHeight"],width:dimensions["textBoxWidth"]});
    dimensions["floatMessagesTo"] = check > 0 ? 'left' : 'right';
    msgWrapDiv.css({height:dimensions["msgDivHeight"],width:dimensions["msgDivWidth"],float: dimensions["floatMessagesTo"]});
    if(check > 0)
    {
    senderPicMsg.css({left: dimensions["msgDivWidth"],float: dimensions["floatMessagesTo"]});
    }
    else
    {
    senderPicMsg.css({right: dimensions["msgDivWidth"],float: dimensions["floatMessagesTo"]});
    }
  };  
GroupChat.prototype.drawCanvas = function(text,msgCount,dimensions)
  {
    var canvasElement = $("#grpMsgPanel").find("#msgBox"+msgCount).find('.sbCanvas');
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
GroupChat.prototype.drawBigCanvas = function(text,msgCount,dimensions)
  {
    var canvasElement = $("#grpMsgPanel").find("#msgBox"+msgCount).find('.sbCanvas');
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
 GroupChat.prototype.drawTrail = function(text,msgCount,userIndex,dimensions)
  {
    var trailCoordinates = geometricSpecification.getTrailCoordinates(text,userIndex);
    var textLength = text.length;
    var canvasElement = $("#grpMsgPanel").find("#msgBox"+msgCount).find('.sbCanvas');
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
GroupChat.prototype.drawBigTrail = function(text,msgCount,userIndex,dimensions)
  {
    var canvasElement = $("#grpMsgPanel").find("#msgBox"+msgCount).find('.sbCanvas');
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

GroupChat.prototype.getMsgDiv = function(id,msgCount,msgDivWidth,msgDivHeight){
  var elm = "<div class='msgBox testBorder' id='msgBox"+msgCount+"'>";
  elm += "<div class='msgWrap testBorder'>";
  elm += "<canvas class='sbCanvas' id='sbCanvas' width="+msgDivWidth+" height="+msgDivHeight+"></canvas>";
  elm += "<div class='testBorder' id='textBox'>";
  elm += "<div class='testBorder' id='textContent'></div>";
  elm += "</div></div>";
  elm += "<div class='senderPicMsg'></div>";
  elm += "</div>";
  return elm;
  };