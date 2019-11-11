$(function(){
  
var page = window.location.search.split('=')[1];
console.log(page);

var now = page;
if(page <=1 ){
  page = 2;
}else if(page>=5){
  page = 4;
}
  $("#page1").children("a").html(String(parseInt(page)-1));
  $("#page2").children("a").html(String(parseInt(page)))
  $("#page3").children("a").html(String(parseInt(page)+1));

  if(now == 1){
    $("#page1").addClass("active");
    $("#page2").removeClass("active");
    $("#page3").removeClass("active");
  }else if(now == 5){
    $("#page3").addClass("active");
  $("#page1").removeClass("active");
  $("#page2").removeClass("active");
  }else{
  $("#page2").addClass("active");
  $("#page3").removeClass("active");
  $("#page1").removeClass("active");
  }

/*else if(page==2){
  $("#page2").addClass("active");
$("#page1").removeClass("active");
$("#page3").removeClass("active");
$("#pre").children("a").attr("href","http://localhost:3000/?page=1");
$("#next").children("a").attr("href","http://localhost:3000/?page=3");
}else if(page==3){

  $("#page1").children("a").html(2);
  $("#page2").children("a").html(3)
  $("#page3").children("a").html(4);

  $("#page2").addClass("active");
  $("#page1").removeClass("active");
  $("#page3").removeClass("active");

  $("#pre").children("a").attr("href","http://localhost:3000/?page=2");
  $("#next").children("a").attr("href","http://localhost:3000/?page=4");
}else if(page==4){
  $("#page2").addClass("active");
$("#page1").removeClass("active");
$("#page3").removeClass("active");
  $("#page1").children("a").html(3);
  $("#page2").children("a").html(4)
  $("#page3").children("a").html(5);
$("#pre").children("a").attr("href","http://localhost:3000/?page=3");
$("#next").children("a").attr("href","http://localhost:3000/?page=5");
}
else if(page==5){
$("#page1").children("a").html(3);
  $("#page2").children("a").html(4)
  $("#page3").children("a").html(5);
  $("#page3").addClass("active");
$("#page2").removeClass("active");
$("#page1").removeClass("active");
$("#pre").children("a").attr("href","http://localhost:3000/?page=4");
$("#next").children("a").attr("href","#");
}
*/
});