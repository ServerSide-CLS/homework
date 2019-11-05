<template>
  <div>
    <el-row v-for="i in 2" :key="i">
      <el-col :span="5" v-for="o in showNum/2" :key="o" >
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <span>{{(currentPage-1)*8+o+((i-1)*4)}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "mainbody",
        mounted(){
            this.$axios.get('/getinfo/').then( res => {
                console.log(res);
                this.pageNum = res.data.pageNum;
                this.showNum = res.data.showNum;
            } ).catch(error => {
                console.log(error)
            })
        },
        data(){
            return{
                currentDate: new Date(),
                currentPage: 1,
                pageNum:0,
                showNum: 0
            }
        },
        methods:{
            handleCurrentChange(val){
                this.currentPage = val;
            }
        }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 50%;
    display: block;
  }
  .el-row{
    margin: 30px auto 15px auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

  }
  .image{
    margin: 3px auto 0 auto;
  }
</style>
