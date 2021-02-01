<template>
  <div class="machine-info-componenet">
    <v-card class="pa-8" elevation="5">
      <v-row>
        <v-col cols="12"
          ><v-text-field
            label="Machine ID"
            :value="machineInfo._id"
            prepend-inner-icon="mdi-matrix"
            rounded
            dense
            readonly
            outlined
            hide-details="auto"
          ></v-text-field
        ></v-col>
        <v-col cols="12"
          ><v-text-field
            label="Machine Name"
            :value="machineInfo.machineName"
            prepend-inner-icon="mdi-label"
            rounded
            dense
            readonly
            outlined
            hide-details="auto"
          ></v-text-field
        ></v-col>
        <v-col cols="12"
          ><v-text-field
            label="Status"
            :value="machineInfo.status"
            prepend-inner-icon="mdi-signal-variant"
            rounded
            dense
            readonly
            outlined
            hide-details="auto"
          ></v-text-field
        ></v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    machineInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
