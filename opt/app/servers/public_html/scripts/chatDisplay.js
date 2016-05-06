function initiateChatBar() {
    $('#chatIndicator').addClass("chatIconCurvy");
}

function chatIconToggler(){
	// var effect = 'slide';
	// var options = { direction: 'right' };
	// var duration = 500;
	// $('#thinkArea').toggle(effect, options, duration);
	// $('#chatListContainer').toggle(effect, options, duration);
	// $('#chatArrow').toggleClass("glyphicon-menu-right");
	// $('#chatIndicator').toggleClass("chatIconCurvy",1000);
    var thinkAreaWidth = parseInt($('#thinkArea').css('width'));
    var chatBtnWidth = parseInt($('#chatIndicator').css('width'));
    var chatListWidth = parseInt($('#chatListContainer').css('width'));
    var rightIcon = parseInt($('#thinkArea').css('right'));
    var rightList = parseInt($('#chatListContainer').css('right'));
    var currentRight = parseInt($('#chatIndicator').css('right'));
    var rightIconAbs = Math.abs(rightIcon);
    var rightListAbs = Math.abs(rightList);
    console.log(parseInt(rightIcon)+"list-right : "+rightList);
    if(currentRight>0)
    {
    	$('#thinkArea').animate({"right": '-='+thinkAreaWidth});
        $('#chatListContainer').animate({"right": '-='+chatListWidth});
        $('#chatIndicator').animate({"right": '-='+thinkAreaWidth});
    }
    else
    {
    	$('#thinkArea').animate({"right": '+='+thinkAreaWidth});
        $('#chatListContainer').animate({"right": '+='+chatListWidth});
        $('#chatIndicator').animate({"right": '+='+thinkAreaWidth});
        var chatScope = angular.element("#chatContainer").scope();
        console.log("CHAT SCOPE CONTROLLER "+chatScope);
        chatScope.fillChatBar();
    }
    $('#chatArrow').toggleClass("glyphicon-menu-right");
    $('#chatIndicator').toggleClass("chatIconCurvy");
    console.log("I am here inside click button");
}