<template>
  <div>
    <Nav>
    </Nav>
    <login-component></login-component>
  <Footer>
  </Footer>
  </div>
</template>

<script>
    import Nav from "./header";
    import Footer from "./footer";
    import LoginComponent from "./loginComponent";
    export default {
        name: "login",
        components: {LoginComponent, Footer, Nav}
    }
</script>

<style scoped>

</style>
