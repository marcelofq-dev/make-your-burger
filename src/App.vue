<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>
<template>
  <Navbar :logo="logo_src" :alt="alt"></Navbar>
  <main>
    <RouterView></RouterView>
  </main>
  <Footer />
</template>
<script>
export default {
  data() {
    return {
      logo_src: '/img/logo.png',
      alt: 'Make Your Burger',
    }
  }
}
</script>