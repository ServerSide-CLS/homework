<template>
  <div class="hello">
    <Nav></Nav>
    <mainbody></mainbody>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "./header";
import Footer from "./footer";
import mainbody from "./content";
export default {
  name: 'HelloWorld',
    components: { mainbody, Footer, Nav},
    data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body{
    margin: 0;
  }
</style>
