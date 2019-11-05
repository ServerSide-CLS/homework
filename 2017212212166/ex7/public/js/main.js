$(function(){
  
var page = window.location.search.split('=')[1];
console.log(page);

var now = page;
if(page <=1 ){
  page = 2;
}else if(page>=5){
  page = 4;
}
console.log(now);
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

});