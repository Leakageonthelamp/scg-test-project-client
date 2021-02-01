<template>
  <v-container class="d-flex justify-center">
    <v-overlay v-if="isLoading" dark>
      <v-progress-circular indeterminate color="amber" size="64" />
    </v-overlay>
    <template>
      <v-card elevation="5" width="960">
        <div class="mx-5 py-3 d-flex">
          <div class="page-title center">
            <v-icon x-large class="page-img h3">
              mdi-dots-horizontal-circle
            </v-icon>
            <span class="ml-2 font-weight-bold h3">| Machine Infomation</span>
          </div>
          <v-spacer />
          <div class="d-flex align-center">
            <v-btn
              rounded
              color="amber darken-2 mr-3"
              class="elevation-3"
              dark
              @click="handleOpenEdit"
            >
              <v-icon left> mdi-pencil-circle </v-icon>Edit Machine
            </v-btn>
            <v-btn
              rounded
              color="red darken-2"
              class="elevation-3"
              dark
              @click="handleDeleteMachine"
            >
              <v-icon left> mdi-minus-circle </v-icon>Delete Machine
            </v-btn>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="info-body my-8 px-10">
          <v-row>
            <v-col cols="12" md="5">
              <machine-info :machine-info="machineData"></machine-info>
            </v-col>
            <v-col cols="12" md="7">
              <v-card v-if="machineData.location" class="pa-2">
                <google-map-comp :location="machineData.location" />
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card elevation="5">
                <div class="mx-5 py-3 d-flex">
                  <div class="page-title center">
                    <v-icon x-large class="page-img h3">
                      mdi-cube-unfolded
                    </v-icon>
                    <span class="ml-2 font-weight-bold h3"
                      >| Item Management</span
                    >
                  </div>
                  <v-spacer />
                  <div class="d-flex align-center">
                    <v-btn
                      rounded
                      color="green darken-2"
                      class="elevation-3"
                      dark
                      @click="dialogAddItem = true"
                    >
                      <v-icon left> mdi-plus-circle </v-icon>Add item to machine
                    </v-btn>
                  </div>
                </div>
                <v-divider></v-divider>
                <machine-item-table
                  :items="machineItemsData"
                  @onDeleteItem="handleDeleteItem"
                  @onAddItem="handleOpenAddQtyItem"
                ></machine-item-table>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </template>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit machine</span>
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
                <google-map-comp
                  :location="location"
                  :isEdit="true"
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
          <v-btn color="amber darken-1" text @click="handleEditMachine">
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAddItemQty" width="400">
      <v-card>
        <v-card-title class="blue dark"> Add product quantity </v-card-title>
        <v-col cols="12" class="px-10">
          <v-text-field
            v-model="addQty"
            label="Amount of product"
            type="number"
            :error-messages="addQtyErrors"
            @input="$v.addQty.$touch()"
            @blur="$v.addQty.$touch()"
            required
          ></v-text-field>
        </v-col>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="handleAddQtyItem"> Add </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAddItem" persistent max-width="480px">
      <v-card>
        <v-card-title>
          <span class="headline">Add product item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0">
                <v-select
                  v-model="currentAddProductId"
                  :items="productFilterd"
                  item-text="productName"
                  item-value="_id"
                  label="Select Product"
                  :error-messages="currentAddProductIdErrors"
                  @input="$v.currentAddProductId.$touch()"
                  @blur="$v.currentAddProductId.$touch()"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="addQty"
                  label="Amount of product"
                  type="number"
                  :error-messages="addQtyErrors"
                  @input="$v.addQty.$touch()"
                  @blur="$v.addQty.$touch()"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialogAddItem = false">
            Close
          </v-btn>
          <v-btn color="green darken-1" text @click="handleAddItem">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, numeric } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import MachineInfo from '~/components/Machine/MachineInfo';
import MachineItemTable from '~/components/Machine/MachineItemTable';
import GoogleMapComp from '~/components/GoogleMap';
import * as ApiService from '@/services/api.service';
export default {
  mixins: [validationMixin],
  components: { MachineInfo, MachineItemTable, GoogleMapComp },
  middleware: 'auth',
  layout: 'admin',
  validations: {
    machineName: { required },
    status: { required },
    addQty: { required, numeric },
    currentAddProductId: { required },
  },
  data: () => ({
    dialog: false,
    dialogAddItem: false,
    dialogAddItemQty: false,
    isLoading: false,
    machineId: '',
    machineData: {},
    machineItemsData: [],
    productData: [],
    currentAddItemId: '',
    currentAddProductId: '',
    statusItems: ['online', 'offline'],
    machineName: '',
    status: '',
    location: '',
    addQty: null,
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
    currentAddProductIdErrors() {
      const errors = [];
      if (!this.$v.currentAddProductId.$dirty) return errors;
      !this.$v.currentAddProductId.required &&
        errors.push('Please select one product from product list');
      return errors;
    },
    addQtyErrors() {
      const errors = [];
      if (!this.$v.addQty.$dirty) return errors;
      !this.$v.addQty.required &&
        errors.push('Please add amount that you want to fill up');
      !this.$v.addQty.numeric &&
        errors.push('Amount of product must be positive number!');
      return errors;
    },
    productFilterd() {
      const productIdFilter = this.machineItemsData.map(
        (y) => y.productDetail._id
      );
      const array = this.productData.filter(
        (x) => !productIdFilter.includes(x._id)
      );
      return array;
    },
  },
  async mounted() {
    this.isLoading = true;
    this.machineId = this.$route.params.id;
    await this.getMachineData();
    await this.getMachineItemsData();
    await this.getAllProductData();
    this.isLoading = false;
  },
  methods: {
    async getMachineData() {
      const res = await ApiService.getMachineById(this.machineId);
      if (res.data) {
        this.machineData = res.data;
      }
    },
    async getMachineItemsData() {
      const res = await ApiService.getMachineItems(this.machineId);
      if (res.data) {
        console.log(res.data);
        this.machineItemsData = res.data;
      }
    },
    async getAllProductData() {
      const res = await ApiService.getAllProducts();
      if (res.data) {
        console.log(res.data);
        this.productData = res.data;
      }
    },
    async handleEditMachine() {
      this.$v.$touch();
      if (this.$v.machineName.$invalid && this.$v.status.$invalid) return;

      const payload = {
        machineName: this.machineName,
        status: this.status,
        location: this.location,
      };
      const con = confirm(
        `Are you sure you want to Edit this machine "${this.machineName}"`
      );
      if (con) {
        await ApiService.editMachine(this.machineId, payload);
        Swal.fire({
          title: 'Edit machine success!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.$router.go();
        });
      }
    },
    async handleDeleteMachine() {
      const con = confirm(
        `Are you sure you want to delete this machine "${this.machineData.machineName}"`
      );
      if (con) {
        await ApiService.deleteMachine(this.machineId);
        Swal.fire({
          title: 'Delete machine success!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.$router.push('/admin/machine');
        });
      }
    },
    async handleAddItem() {
      this.$v.$touch();
      if (this.$v.addQty.$invalid && this.$v.currentAddProductId.$invalid)
        return;

      const int = Math.floor(this.addQty);
      const payload = {
        itemQty: int,
      };
      const con = confirm(`Are you sure you want to add item product`);
      if (con) {
        await ApiService.addNewItem(
          this.machineId,
          this.currentAddProductId,
          payload
        );
        Swal.fire({
          title: 'Add Item product success!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.$router.go();
        });
      }
    },
    async handleAddQtyItem() {
      this.$v.$touch();
      if (this.$v.addQty.$invalid) return;

      const int = Math.floor(this.addQty);
      const payload = {
        itemQty: int,
      };
      const con = confirm(
        `Are you sure you want to add item qty. for "${this.addQty}"`
      );
      if (con) {
        await ApiService.addItemQty(
          this.machineId,
          this.currentAddItemId,
          payload
        );
        Swal.fire({
          title: 'Add Item Quantity success!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.dialogAddItemQty = false
          this.$router.go();
        });
      }
    },
    async handleDeleteItem(value) {
      const con = confirm(
        `Are you sure you want to delete this item "${value.productDetail.productName}"`
      );
      if (con) {
        await ApiService.deleteMachineItem(this.machineId, value._id);
        Swal.fire({
          title: 'Delete item success!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.$router.go();
        });
      }
    },
    handleOpenEdit() {
      this.machineName = this.machineData.machineName;
      this.status = this.machineData.status;
      this.location = this.machineData.location;
      this.dialog = true;
    },
    handleOpenAddQtyItem(value) {
      this.currentAddItemId = value._id;
      this.dialogAddItemQty = true;
    },
    locationChange(value) {
      this.location = value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
