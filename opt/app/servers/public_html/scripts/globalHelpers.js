var headerInclude = function() {
	console.log("Fetching header !!!!");	
	$("#header").load("/public_html",{"value":"header.html"});
};

var footerInclude = function() {
    console.log("Fetching Footer !!!!");
	$("#footer").load("/public_html",{"value":"footer.html"});;
};

var capitalize_Words = function(str)  
{  
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});  
} ;

$(function(){
	console.log("In Ready function !!!!");
	$(document).on("click", "#chatExpand", chatIconToggler);
});
