var GroupChatHandler = function() {
  this.canvasMessageBoxes = [];
  this.groupChat = new GroupChat();
};

GroupChatHandler.prototype.sendGroupMessage = function()
{
      var text = $("#grpMsgArea").val();
      console.log("Trying to send this text : "+text);
      var textDiv = $("#grpMsgPanel");
     // textDiv.text(text);
     this.sendMessage(text,"Srikanth","group");
      $("#grpMsgArea").val("");
};
var check = 1;
GroupChatHandler.prototype.drawMessage = function(msgText) {
      this.groupChat.drawMessage(msgText);
};

