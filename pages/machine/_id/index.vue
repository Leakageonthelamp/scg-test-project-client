<template>
  <v-container class="d-flex justify-center">
    <v-overlay v-if="isLoading">
      <v-progress-circular indeterminate color="amber darken-2" size="64" />
    </v-overlay>
    <template v-if="!isLoading">
      <v-card elevation="5" width="680" height="860" class="rounded-xl">
        <div class="mx-5 py-3 d-flex">
          <div class="page-machine d-flex align-center">
            <img style="max-width: 24px" src="~@/assets/img/app-logo.png" />
            <div class="ml-2 font-weight-bold h3">
              | {{ machineData.machineName }}
            </div>
          </div>
        </div>
        <v-container class="d-flex justify-center">
          <v-card
            color="grey lighten-3"
            elevation="1"
            width="660"
            height="740"
            class="rounded-xl pa-5"
            style="overflow: auto"
          >
            <v-row>
              <v-col v-for="item in items" :key="item._id" cols="12" sm="6">
                <product-card
                  :item-data="item"
                  @onBuyItem="handleBuyItem"
                ></product-card>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-card>
    </template>

    <v-dialog v-model="successDialog" max-width="320" class="rounded-xl">
      <v-card class="pa-10 d-flex align-center flex-column rounded-xl">
        <v-img
          src="https://icons-for-free.com/iconfiles/png/512/complete+done+green+success+valid+icon-1320183462969251652.png"
          max-width="150"
          max-height="250"
        ></v-img>
        <v-card-title class="text-h5 text-center"
          >Buying Success! Thank you</v-card-title
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ProductCard from '~/components/ProductCard';
import * as ApiService from '@/services/api.service';
export default {
  components: { ProductCard },
  data: () => ({
    isLoading: false,
    successDialog: false,
    machineId: '',
    items: [],
    machineData: {},
  }),
  async mounted() {
    this.isLoading = true;
    this.machineId = this.$route.params.id;
    await this.initPullData();
    this.isLoading = false;
  },
  methods: {
    async initPullData() {
      const res1 = await ApiService.getMachineItems(this.machineId);
      if (res1.data) {
        this.items = res1.data;
      }
      const res2 = await ApiService.getMachineById(this.machineId);
      if (res2.data) {
        this.machineData = res2.data;
      }
    },
    async handleBuyItem(value) {
      const itemId = value;
      this.successDialog = true;
      setTimeout(() => ((this.successDialog = false), this.$router.go()), 2000);
      const res = await ApiService.buyItem(this.machineId, itemId);
      console.log(res.data);
    },
  },
};
</script>

<style></style>
