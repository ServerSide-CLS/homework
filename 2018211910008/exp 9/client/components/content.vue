<template>
  <div>
    <div class="formBlock">
    <el-form :model="formSubmit" :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="formSubmit.email"></el-input>{{warningText}}
          <el-button  type="primary" @click="checkEmail()" ref="checkButton" :disabled="isTrue" >获取验证邮箱有效性 &nbsp;&nbsp;{{leftTime}}</el-button>
        </el-form-item>
        <el-form-item label="验证码"  prop="check">
          <el-input  type="text" v-model="formSubmit.check"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input type="password" v-model="formSubmit.password"></el-input>
        </el-form-item>
      <el-form-item label="再次确认" prop="checkPassword">
        <el-input type="password"  v-model="formSubmit.checkPassword"></el-input>
      </el-form-item>

      <el-form-item label="注册" >
        <el-button type="warning" @click="logup()">注册</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "mainbody",
        data(){
            return {
                formSubmit:{
                    email:'',
                    check:'',
                    password:'',
                    checkPassword:''
                },
                leftTime:null,
                isTrue:false,
                warningText:'',
                rules:{
                    check:[
                        {required: true, message: '请输入验证码!', trigger: 'blur' }
                    ],
                    password:[
                        {required: true, message: '请输入密码!', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            checkEmail(){
              const email = this.formSubmit.email;
              console.log(email);
              const emailArray = email.split('@');
              if(emailArray == undefined){
                  this.warningText = "邮箱非法，请确认！";
                  return;
              }
              const userId = email.split('@')[0];
              const mailCom = email.split('@')[1];
              if(userId.length == 0 || mailCom.length == 0){
                  this.warningText = "邮箱非法，请确认！";
                  return;
              }
              this.warningText = ""
              var date = new Date();
              console.log(this.$refs.checkButton);
              this.isTrue = true;
              let a = setInterval(()=>{
                  var newDate = new Date();
                  this.leftTime = 180 - Math.floor((newDate-date)/1000);
                  if(this.leftTime <= 0){
                      clearInterval(a);
                      this.isTrue = false;
                  }
              },1000);
              this.$axios.post('/checkmail/',{body:this.formSubmit.email}).then(res => {
                  console.log(res)
              }).catch(error => {
                  console.log(error)
              });
            },
            logup(){
                this.$axios.post('/logup/',this.formSubmit).then(res => {
                  if(res.data.message == "succeed"){
                      alert("success!");
                      this.$router.push({
                          path:'/login'
                      })
                  }else{
                      alert("邮箱已经存在")
                  }
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

  .formBlock{
    width: 40%;
    margin: 50px auto;
  }
</style>
