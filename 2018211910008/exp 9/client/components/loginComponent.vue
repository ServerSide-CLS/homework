<template>
    <div>
      <el-form v-model="loginForm">
          <el-form-item label="邮箱">
            <el-input type="input" v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginForm.password">
            </el-input>
          </el-form-item>
        <el-form-item>
          <el-button @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "loginComponent",
        data(){
            return{
                loginForm:{
                    email:'',
                    password:''
                }
            }
        },
        methods:{
            login(){
                this.$axios.post('/logincheck/',this.loginForm).then(res => {
                    let message = res.data.message;
                    if(message == "登陆成功！"){
                        console.log(message);
                        this.$router.push({
                          path:'/index'
                      })
                    }else{
                        alert("邮箱或密码错误！")
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>
