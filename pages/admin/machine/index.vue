<template>
  <v-container class="d-flex justify-center">
    <v-overlay v-if="isLoading" dark>
      <v-progress-circular indeterminate color="amber" size="64" />
    </v-overlay>
    <template v-if="!isLoading">
      <v-card elevation="5" width="960">
        <div class="mx-5 py-3 d-flex">
          <div class="page-title center">
            <v-icon x-large class="page-img h3"> mdi-water </v-icon>
            <span class="ml-2 font-weight-bold h3">| Machine Management</span>
          </div>
          <v-spacer />
          <div class="d-flex align-center">
            <v-btn
              rounded
              color="amber darken-2"
              class="elevation-3 text-decoration-none"
              dark
              @click="(dialog = !dialog), (isEditProduct = false)"
            >
              <v-icon left> mdi-plus-circle </v-icon>Add Machine
            </v-btn>
          </div>
        </div>
        <v-divider></v-divider>
        <div v-if="machinesData.length > 0" class="machine-body my-8 px-10">
          <v-row class="px-5">
            <v-col v-for="machine in machinesData" :key="machine._id" cols="12">
              <machine-card
                :machine-data="machine"
                @onViewMachine="handleViewMachine"
              ></machine-card>
            </v-col>
          </v-row>
        </div>
        <div v-else class="machine-empty pa-5 d-flex justify-center">
          Not register any machine now.
        </div>
      </v-card>
    </template>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add new machine</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="machineName"
                  label="Machine Name"
                  :error-messages="machineNameErrors"
                  @input="$v.machineName.$touch()"
                  @blur="$v.machineName.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-select
                  v-model="status"
                  :items="statusItems"
                  label="Status"
                  :error-messages="statusErrors"
                  @input="$v.status.$touch()"
                  @blur="$v.status.$touch()"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" class="py-0">
                <label>Select Machine Location</label>
                <google-map-comp
                  :isAddNew="true"
                  @currentLocation="locationChange"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="amber darken-1" text @click="handleAddMachine">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import * as ApiService from '@/services/api.service';
import MachineCard from '~/components/Machine/MachineCard';
import GoogleMapComp from '~/components/GoogleMap';
export default {
  mixins: [validationMixin],
  middleware: 'auth',
  layout: 'admin',
  components: { MachineCard, GoogleMapComp },
  validations: {
    machineName: { required },
    status: { required },
  },
  data: () => ({
    dialog: false,
    isLoading: false,
    machinesData: [],
    statusItems: ['Online', 'Offline'],
    machineName: '',
    status: '',
    location: null,
  }),
  computed: {
    machineNameErrors() {
      const errors = [];
      if (!this.$v.machineName.$dirty) return errors;
      !this.$v.machineName.required && errors.push('Machine name is required');
      return errors;
    },
    statusErrors() {
      const errors = [];
      if (!this.$v.status.$dirty) return errors;
      !this.$v.status.required &&
        errors.push('Please define your initialize status');
      return errors;
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.initialize();
    this.isLoading = false;
  },
  methods: {
    async initialize() {
      const res = await ApiService.getAllMachines();
      if (res.data) {
        this.machinesData = res.data;
      }
    },
    async handleAddMachine() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      if (!this.location) {
        this.location = {
          lat: 13.739426577407672,
          lng: 100.53695678710938,
        };
      }
      const payload = {
        machineName: this.machineName,
        status: this.status.toLowerCase(),
        location: this.location,
      };
        await ApiService.addNewMachines(payload);
        Swal.fire({
          title: 'Add new machine success!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.$router.go();
        });
    },
    handleViewMachine(value) {
      this.$router.push({
        path: `/admin/machine/${value._id}/`,
      });
    },
    locationChange(value) {
      this.location = value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
