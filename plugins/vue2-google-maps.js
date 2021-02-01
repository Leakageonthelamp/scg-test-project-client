import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDCt9H1FkwTLRgYbhaRbIYXZ_QPe_4qZrM',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
});
