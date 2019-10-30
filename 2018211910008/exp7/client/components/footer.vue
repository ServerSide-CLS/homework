<template>
  <div class="footer">
    <p><el-button type="primary" icon="el-icon-share" style="background-color: darkcyan ;border: darkcyan" >叶志康的个人网站</el-button>
      博客 | 纪事 | 想法 | 记录<br>
      踏实、专注、天天积累</p>
  </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

  .footer{
    width: 100%;
    background-color: darkcyan;
    text-align: center;
    padding: 25px 0 25px 0;

  }

  .footer p{
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 25px;
    color: white;
  }


  body{
    margin: 0;
  }
</style>
