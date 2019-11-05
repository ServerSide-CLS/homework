<template>
  <div>
    <header>
      <nav>
        <img src="" >
        <img src="" >
        <span>Made By <span style="color: darkcyan">Yekoko</span>.</span>
        <ul>
          <li class="active"><router-link to="/idea"><a >～～</a></router-link></li>
          <li ><router-link to="/blog"><a>～～～～</a></router-link></li>
          <li ><router-link to="/mess"><a>～～～～</a></router-link></li>
          <li > | </li>
          <li class="who" ><router-link to="/"><a style="color: darkcyan"> ～～～</a></router-link></li>

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
