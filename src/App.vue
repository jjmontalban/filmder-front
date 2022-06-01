<template>
  <v-app>
    <app-navbar></app-navbar>
    <v-main>
      <vue-page-transition name="fade" class="px-15">
        <router-view></router-view>
      </vue-page-transition>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  
  components: {
    'app-navbar': Navbar,
    'app-footer': Footer,
  },

  data: () => ({
    scrollPosition: null
  }),
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');

*{
    font-family: 'Jost', sans-serif;
    align-content: center;

}

a {
  text-decoration: none;
  color: rgb(210, 42, 42)  !important;
}

.escrol{
 overflow-y: auto;
 }

.quote {
  font-style: italic;
}
</style>
