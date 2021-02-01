<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-card class="mx-auto my-12" max-width="380" elevation="5">
          <v-card-title class="title">Admin Login</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form class="px-3">
              <v-text-field
                v-model="id"
                label="Account"
                prepend-inner-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="Password"
                prepend-inner-icon="mdi-key"
              ></v-text-field>
            </v-form>
            <v-btn class="mt-5" color="yellow darken-3" @click="login"
              >Login</v-btn
            >
          </v-card-text>
          <v-card-text v-if="message">
            {{ message }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as ApiService from '@/services/api.service';
export default {
  data: () => ({
    id: '',
    password: '',
    message: '',
  }),
  methods: {
    async login() {
      const payload = {
        account: this.id,
        password: this.password,
      };
      const res = await this.$auth.loginWith('local', { data: payload });
      if (res.data.error) {
        this.message = res.data.message;
        return;
      }
      if (!res.data.error) {
        this.message = 'Login Success';
        this.$router.push('/admin/main');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px !important;
  padding: 0.5rem 1rem !important;
}
</style>
