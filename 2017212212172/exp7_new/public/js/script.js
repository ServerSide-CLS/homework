$(document).ready(function() {
    $(".page").click(function(){
        var id=parseInt($(this).attr("id"));
        var totnum=parseInt($('#pagenum').attr("name"));
        var nowpage=parseInt($('#page').attr('name'));
        var str=$(this).attr("class");
        console.log(str);
        console.log(str.indexOf('xl-disabled'));
        if(str.indexOf('xl-disabled')!=-1){
            return ;
        }
        if(id==totnum+1){
            nowpage++;
            location.href="/index?pagenum="+nowpage;
        }
        else if(id==0){
            nowpage--;
            location.href="/index?pagenum="+nowpage;
        }
        else {
            location.href="/index?pagenum="+id;
        }
    });
});