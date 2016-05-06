var GroupChatHandler = function() {
  this.canvasMessageBoxes = [];
  this.groupChat = new GroupChat();
};

GroupChatHandler.prototype.sendGroupMessage = function()
{
      var text = $("#messageArea").val();
      console.log("Trying to send this text : "+text);
      var textDiv = $("#grpMsgPanel");
     // textDiv.text(text);
     this.sendMessage(text,"Srikanth","group");
      $("#messageArea").val("");
};
var check = 1;
GroupChatHandler.prototype.sendMessage = function(msgText,sender,recepient) {
      this.groupChat.sendMessage(msgText,sender,recepient);
};

