var count=24;
var pagecount = 10;
var nowpage;
function pageclick(){
    $(".img").remove();
    $(".text").remove();
    $(".page").css("color","black");
    $(this).css("color","blue");
    nowpage = $(this).attr('value');
    console.log(nowpage);
    var pageS = ($(this).attr('value')-1)*pagecount;
    var pageE = $(this).attr('value')*pagecount-1>count?count:$(this).attr('value')*pagecount-1;
    for($i=pageS;$i<=pageE;$i++){
    	$(".container").append("<img class='img' src=''>");
    }
    $(".container").append("<p class='text'>页面"+nowpage+"</p>");
}
$("#page1").click(pageclick);
$("#page2").click(pageclick);
$("#page3").click(pageclick);
$(".spage").click(function(){
	if($(this).attr('value')=="pre"){
		nowpage = parseInt(nowpage)-1<1?1:parseInt(nowpage)-1;
		nowpage += ' ';
		console.log(nowpage);
	}
	if($(this).attr('value')=="next"){
		nowpage = parseInt(nowpage)+1>3?3:parseInt(nowpage)+1;
		nowpage += ' ';
		console.log(nowpage);
	}
	if($(this).attr('value')=="first"){
		nowpage = 1;
		nowpage += ' ';
		console.log(nowpage);
	}
	if($(this).attr('value')=="last"){
		nowpage = parseInt(count/pagecount)+1;
		nowpage += ' ';
	}
	$("#page"+nowpage).click();
	console.log("#page"+nowpage);
});
$("#page1").click();
