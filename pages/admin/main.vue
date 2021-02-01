<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center mt-15">
        <img src="../../assets/img/app-logo.png" /> 
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'admin',
};
</script>
