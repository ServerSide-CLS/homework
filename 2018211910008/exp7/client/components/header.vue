<template>
  <div>
    <header>
      <nav>
        <img src="../images/nav-logo-A.jpeg" >
        <img src="../images/nav-logo-B.jpeg" >
        <span>Made By <span style="color: darkcyan">Yekoko</span>.</span>
        <ul>
          <li class="active"><router-link to="/idea"><a >想法</a></router-link></li>
          <li ><router-link to="/blog"><a>我的博客</a></router-link></li>
          <li ><router-link to="/mess"><a>乱七八糟</a></router-link></li>
          <li > | </li>
          <li class="who" ><router-link to="/"><a style="color: darkcyan"> 叶志康</a></router-link></li>

        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped src="../style/navfootstyle.css">
  body{
    margin: 0;
  }
</style>
