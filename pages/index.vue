<template>
  <v-container class="d-flex justify-center">
    <v-card elevation="5" width="680" height="820">
      <div class="mx-5 py-3 d-flex">
        <div class="page-title center">
          <div class="ml-2 font-weight-bold h5">Select Vending Machine</div>
        </div>
      </div>
      <v-divider></v-divider>
      <v-row class="pa-5">
        <v-col
          v-for="machine in machinesData"
          :key="machine._id"
          cols="12"
          md="6"
          class="machine-card d-flex justify-center"
          @click="handleClickMachine(machine)"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 5"
     
              :color="machine.status === 'online' ? 'amber darken-2' : 'grey'"
              class="d-flex flex-column" 
            >
              <v-img
              max-height="120"
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/vending-machine-2488204-2088394.png"
              ></v-img>
              <v-card-text
                class="my-4 align-center justify-center title machine-name"
              >
                {{ machine.machineName }}
                <div class="status d-flex align-center" :class="machine.status">
                  <v-icon class="mr-2">mdi-signal-variant</v-icon>
                  {{ machine.status }}
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import * as ApiService from '@/services/api.service';
export default {
  data: () => ({
    machinesData: [],
  }),
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      const res = await ApiService.getAllMachines();
      if (res.data) {
        this.machinesData = res.data;
      }
    },
    handleClickMachine(value) {
      if (value.status === 'offline') return;
      this.$router.push(`/machine/${value._id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.machine-card {
  cursor: pointer;
}

.machine-name {
  color: black;
  .status {
    text-transform: capitalize;
    &.online {
      color: green;
    }
    &.offline {
      color: red;
    }
  }
}
</style>
