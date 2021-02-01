<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list-item>
        <v-list-item-title class="title d-flex align-center">
          <img
            class="mr-4"
            style="max-width: 24px"
            src="../assets//img/app-logo.png"
          />
          Application</v-list-item-title
        >
      </v-list-item>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn v-if="drawer" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn color="red darken-1" @click="logout">Logout</v-btn>
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
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-alert-circle',
          title: 'Notification',
          to: '/admin/notification',
        },
        {
          icon: 'mdi-water',
          title: 'Machine',
          to: '/admin/machine',
        },
        {
          icon: 'mdi-cube',
          title: 'Product',
          to: '/admin/product',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Drinky Admin',
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/admin');
    },
  },
};
</script>
