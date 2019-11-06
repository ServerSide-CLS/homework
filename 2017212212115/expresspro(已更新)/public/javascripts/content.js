$(function(){
    var page = window.location.search.split('=')[1];
    
    var now = page;
    page = 2;

    $("#page1").children("a").html(String(parseInt(page)-1));
    $("#page2").children("a").html(String(parseInt(page)));
    
    if(now == 1){
        $("#page1").addClass("active");
        $("#page2").removeClass("active");
    }
    else if (now == 2) {
        $("#page2").addClass("active");
        $("#page1").removeClass("active");
    }
});

