<template>
  <div class="machine-card-component">
    <v-card
      color="#eeeeee"
      class="px-8 py-3 d-flex justify-between align-center"
      elevation="3"
    >
      <div class="machine-info d-flex">
        <div class="machine-img mr-5">
          <v-responsive
            width="80"
            height="80"
            class="rounded-circle elevation-5"
          >
            <v-img
              width="80"
              height="80"
              src="https://image.flaticon.com/icons/png/512/1020/1020421.png"
            />
          </v-responsive>
        </div>
        <div class="machine-text">
          <h4 class="mb-1">Machine ID : {{ machineData._id }}</h4>
          <h4 class="mb-1">Machine Name : {{ machineData.machineName }}</h4>
          <h4 class="mb-1" :class="machineData.status">
            Status : <span>{{ machineData.status }}</span>
          </h4>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="machine-view">
        <v-btn rounded color="success" @click="viewMachine()">
          <v-icon left> mdi-eye </v-icon>
          View Machine
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    machineData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewMachine() {
      this.$emit('onViewMachine', this.machineData);
    },
  },
};
</script>

<style lang="scss" scoped>
.machine-text {
  .online {
    span {
      text-transform: uppercase;
      color: green;
    }
  }
  .offline {
    span {
      text-transform: uppercase;
      color: red;
    }
  }
}
</style>
