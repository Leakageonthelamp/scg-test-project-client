<template>
  <div>
    <GmapMap :center="center" :zoom="15" style="width: 100%; height: 300px">
      <GmapMarker
        :position="marker"
        :draggable="isEdit || isAddNew"
        :title="title"
        :lable="title"
        @drag="updateCoordinates"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
      required: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    isAddNew: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    center: { lat: 13.739426577407672, lng: 100.53695678710938 },
    marker: { lat: 13.739426577407672, lng: 100.53695678710938 },
    title: 'Machine Location',
    machineLocation: {},
  }),
  mounted() {
    if (!this.isAddNew) {
      this.center = this.location;
      this.marker = this.location;
    }
  },
  methods: {
    updateCoordinates(location) {
      const coordinates = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
      this.$emit('currentLocation', coordinates);
    },
  },
};
</script>

<style lang="scss" scoped></style>
