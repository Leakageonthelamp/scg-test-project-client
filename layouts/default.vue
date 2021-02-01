<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app class="d-flex justify-center">
      <v-container class="title d-flex align-center">
        <img
          style="max-width: 30px"
          src="../assets//img/app-logo.png"
        />
      </v-container>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span
        >Copyright &copy; {{ new Date().getFullYear() }} Kittitat
        Chainonthi</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
    };
  },
};
</script>
