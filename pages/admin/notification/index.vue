<template>
  <v-container class="d-flex justify-center">
    <v-overlay v-if="isLoading" dark>
      <v-progress-circular indeterminate color="amber" size="64" />
    </v-overlay>
    <template v-if="!isLoading">
      <v-card elevation="5" width="960">
        <div class="mx-5 py-3 d-flex">
          <div class="page-title center">
            <v-icon x-large class="page-img h3"> mdi-alert-circle </v-icon>
            <span class="ml-2 font-weight-bold h3">| Notification Center</span>
          </div>
        </div>
        <v-divider></v-divider>
        <div v-if="notifyData.length > 0" class="notification-body my-8 px-10">
          <v-row class="px-5">
            <v-col
              v-for="notify in notifyData"
              :key="notify._id"
              cols="12"
              md="6"
            >
              <v-card outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div
                      class="notify-header ma-0 d-flex justify-space-between"
                    >
                      <div class="title d-flex align-center">
                        <v-icon color="amber darken-2" class="mr-1">
                          mdi-alert-circle
                        </v-icon>
                        <div class="overline">NOTIFICATION</div>
                      </div>
                      <v-btn
                        rounded
                        color="red"
                        @click="handleDeleteNotify(notify)"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </div>
                    <v-list-item-title class="headline mb-1">
                      Item Low Quantity
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >Product Name :
                      {{ notify.productName }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle
                      >Machine Name :
                      {{ notify.machineName }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle
                      >Current Qty : {{ notify.itemQty }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions class="justify-end">
                  <v-btn
                    outlined
                    rounded
                    color="blue"
                    @click="handleViewMachine(notify)"
                  >
                    View Machine
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else class="empty-notify-page pa-5 d-flex justify-center">
          Not have any notification.
        </div>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import * as ApiService from '@/services/api.service';
export default {
  middleware: 'auth',
  layout: 'admin',
  data: () => ({
    isLoading: false,
    notifyData: [],
  }),
  async mounted() {
    this.isLoading = true;
    await this.initialize();
    this.isLoading = false;
  },
  methods: {
    async initialize() {
      const res = await ApiService.getAllNotify();
      if (res.data) {
        this.notifyData = res.data;
      }
    },
    async handleDeleteNotify(value) {
      const notifyId = value._id;
      await ApiService.deleteNotify(notifyId);
      this.$router.go();
    },
    handleViewMachine(value) {
      const machineId = value.machineId;
      this.$router.push({
        path: `/admin/machine/${machineId}/`,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
