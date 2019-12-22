function login(){
　　var username = $('#user').val();
　　var password = $('#pwd').val();
　　var data = { "user": username, "pwd":password};
　　$.ajax({
　　　　url:'login',
　　　　type:'POST',
　　　　data:data,
　　　　success:function(data,status){
　　　　　　if(status == 'success'){
　　　　　　　　location.href='home';
　　　　　　}
　　　　},　　
　　　　error:function(data,status,e){
　　　　　　if(status == "error"){
　　　　　　　　location.href='login';
　　　　　　}
　　　　}
　　});
}