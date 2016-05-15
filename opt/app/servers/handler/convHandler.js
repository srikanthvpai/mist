module.exports= function ConvHandler() {
	
	var ConvObj = require('../mistBO/convObj.js');
	var ConvService = require('../service/convService.js');
	var DBService = require('../service/dbService.js');
	var convList = [];
	var roomList = [];
	var dbService = new DBService();
	var convService = new ConvService(dbService);
	
	var convId = 1000;
	return {
		addConv: function(participantA,participantB)
		{
			var conv = this.checkExists(participantA,participantB);
			if(conv)
			{
				return conv.id;
			}
			else
			{
				convId++;
				var convObj = new ConvObj(participantA,participantB,convId,convService);
				convList.push(convObj);
				return convId;
			}
		},
		addMsg: function(msgObject,callback,callbackerr)
		{
			var currentConvId= -1;
			console.log("INSIDE CONV HANDLER");
			var conv = this.checkExists(msgObject.sender,msgObject.recepient);
			if(conv)
			{
				conv.addMsgObj(msgObject,callback,callbackerr);
				return conv.id;
			}
		},
		checkExists: function(participantA,participantB)
		{
			var len = convList.length;
			var participantAId = participantA.firebaseId;
			var participantBId = participantB.firebaseId;
			for(var i=0;i<len;i++)
			{
				var conv = convList[i];
				if(conv.equals(participantAId,participantBId))
				{
					return conv;
				}
			}

		}
	}

}