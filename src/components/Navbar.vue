<script setup>
</script>

<template>
  <nav id="nav">
    <RouterLink to="/" :title="alt" id="logo">
      <img :src="logo" :alt="alt">
    </RouterLink>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/pedidos">Pedidos</RouterLink>
  </nav>
</template>
<script>
export default {
  props: ['logo', 'alt']
}
</script>
<style scoped>
  #nav{
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #nav a {
    color: #FCBA03;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
  }
  #nav a:hover {
    color: #fff;
  }
  #nav #logo{
    margin: auto;
    margin-left: 0;
  }
  #logo img{
    width: 40px;
    height: 40px;
  }

</style>
