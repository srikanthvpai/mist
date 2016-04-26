var ChatBoxHandler = function() {
	this.chatBoxes = [];
	this.total_chatBoxes = 0;
	this.initiate_chat = function(participantA,participantB) {
		var currentCount = chatBoxes.length;
    var bFullName = participantB.firstName+" "+participantB.lastName;
    var id = participantA.firebaseId+"-"+participantB.firebaseId;
		var newElm = this.getANewChatBox(bFullName,id);
		var chatDiv = $(newElm);
		var newChatBox = new ChatBox(participantA,participantB,id);
		newChatBox.intitalizeWebSocket();
		newChatBox.setUserIndex();
		for(var i = 0; i < this.chatBoxes.length; i++)
        {  
            if(participantB.firebaseId === this.chatBoxes[i]["otherUser"].firebaseId)
                {
                  Array.remove(this.chatBoxes,i);
                  this.chatBoxes.unshift(newChatBox);
                  this.calculate_chatBoxes();
                  return;
                }
        }   
        $("#chatBoxes").append(chatDiv);
        newChatBox.initializeChat(participantA);
        this.chatBoxes.unshift(newChatBox);
        this.calculate_chatBoxes();
 	};
	this.getANewChatBox = function(name,id){
			   var newChatBox = "<div id='"+id+"' class='chatBox'>";
                  newChatBox += "<div id='chatBoxHeader' class='chatBoxHeader'>";
                  newChatBox += "<div id='chatBoxTitle' class='chatBoxTitle'>"+name+"</div>";
                  newChatBox += "<div class='closeChatBox'>";
                  newChatBox += "<span onclick=close_chatBox('"+id+"')>X</span>";
                  newChatBox += "</div>";
                  newChatBox += "</div>";
                  newChatBox += "<div class='chatBoxMessage'>";
                  newChatBox += "<div id='chatMessagesPanel' class='chatMessagesLayer'>";
                  newChatBox += "<div id='canvasLayer'></div>";
                  newChatBox += "</div>";
                  newChatBox += "<div id='new_message' class='new_message'>";
                  newChatBox += "<div class='messageInput'>";
                  newChatBox += "<textarea id='messageArea' class='messageTextArea' placeholder='Enter Message' name='message[message_text]'></textarea>";
                  newChatBox += "</div>";
                  newChatBox += "<div class='messageLink' onclick=sendMessage('"+id+"')>Send</div>";
                  newChatBox += "</div>";
                  newChatBox += "</div>";
                  newChatBox += "</div>";
               return newChatBox;
	};
  this.close_chatBox = function(id)
            {
              console.log('Closing Chat Box : '+id);
              for(var i = 0; i < this.chatBoxes.length; i++)
              {
                  if(id === this.chatBoxes[i].chatId)
                  {
                    console.log('I am here 222222');
                    Array.remove(this.chatBoxes, i);
                    $("#"+id).remove();
                    this.calculate_chatBoxes();
                    return;
                  }
                }  
             }

	this.calculate_chatBoxes = function()
        {
              var width = $("#chatBoxes").width();
              console.log('Width of Chat layer : '+width);
              if(width < 540)
              {
                this.total_chatBoxes = 0;
              }
              else
              {
                width = width - 25;
                //300 is width of a single popup box
                this.total_chatBoxes = parseInt(width/282);
              }
              this.display_chatBoxes();
       	};
    this.display_chatBoxes = function()
       {
              var right = 25;
              var i = 0;
              for(i; i < this.total_chatBoxes; i++)
              {
                if(this.chatBoxes[i] != undefined)
                {
                  console.log(right+" chatBoxes[i] Changing Right : "+this.chatBoxes[i]["currentUser"]);
                  $('#'+this.chatBoxes[i].chatId).css({'right':right+'px'});
                  		right = right + 310;
                        //element.style.display = "block";
                }
              }
              for(var j = i; j < this.chatBoxes.length; j++)
              {
                 var element = document.getElementById(this.chatBoxes[j]["currentUser"]);
                 element.style.display = "none";
              }
      };

    this.sendMessage = function(id)
    {
    	var chatBox;
      for(var i=0;i<this.chatBoxes.length;i++)
      {
        if(this.chatBoxes[i].chatId == id)
        {
          chatBox = this.chatBoxes[i];
          break;
        }
      }
  		chatBox.sendMessage();  	
    } ; 

    this.getChatBox = function(id)
    {
    	for(var i=0,len=this.chatBoxes.length;i<len;i++)
    	{
    		if(this.chatBoxes[i]["currentUser"]===id)
    		{
    			return this.chatBoxes[i];
    		}
    	}
    };

    this.close_allchatBoxes = function()
    {
      var chatBoxIds = [];
      for(var i=0,len=this.chatBoxes.length;i<len;i++)
      {
        chatBoxIds[i] = this.chatBoxes[i].chatId;
      }
      for(var i=0,len=chatBoxIds.length;i<len;i++)
      {
        this.close_chatBox(chatBoxIds[i]);
      }
    }
};


Array.remove = function(array, from, to) {

      var rest = array.slice((to || from) + 1 || array.length);
      array.length = from < 0 ? array.length + from : from;
      return array.push.apply(array, rest);
  };

