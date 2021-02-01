<template>
  <v-container class="d-flex justify-center">
    <v-overlay v-if="isLoading" dark>
      <v-progress-circular indeterminate color="amber" size="64" />
    </v-overlay>
    <template v-if="!isLoading">
      <v-card elevation="5" width="960">
        <div class="mx-5 py-3 d-flex">
          <div class="page-title center">
            <v-icon x-large class="page-img h3"> mdi-cube </v-icon>
            <span class="ml-2 font-weight-bold h3">| Products Management</span>
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
              <v-icon left> mdi-plus-circle </v-icon>Add product
            </v-btn>
          </div>
        </div>
        <v-divider></v-divider>
        <div>
          <product-table
            :product="productData"
            @onDelete="handleDelete"
            @onEdit="handleSetEdit"
          />
        </div>
      </v-card>
    </template>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title v-if="isEditProduct">
          <span class="headline">Edit Product</span>
        </v-card-title>
        <v-card-title v-else>
          <span class="headline">Add new product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-if="isEditProduct"
                cols="12"
                class="d-flex flex-column justify-space-between align-center"
              >
                <v-responsive width="150" height="150" class="rounded-circle">
                  <v-img
                    width="150"
                    height="150"
                    :src="
                      productImgUrl
                        ? productImgUrl
                        : 'https://line-thai.com/icon/noimg.png'
                    "
                  />
                </v-responsive>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="productName"
                  label="Product Name"
                  :error-messages="productNameErrors"
                  @input="$v.productName.$touch()"
                  @blur="$v.productName.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-select
                  v-model="type"
                  :items="typeItems"
                  label="Type"
                  :error-messages="typeErrors"
                  @input="$v.type.$touch()"
                  @blur="$v.type.$touch()"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="price"
                  label="Product Price"
                  type="number"
                  prefix="฿"
                  :error-messages="priceErrors"
                  @input="$v.price.$touch()"
                  @blur="$v.price.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="description"
                  label="Product Description"
                  hint="Describe your product info to customer"
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="productImgUrl"
                  label="Product Image URL"
                  prepend-inner-icon="mdi-link-variant"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="gray darken-1"
            text
            @click="(dialog = false), clearData()"
          >
            Close
          </v-btn>
          <v-btn
            v-if="isEditProduct"
            color="amber darken-1"
            text
            @click="handleEditProduct"
          >
            Edit
          </v-btn>
          <v-btn v-else color="amber darken-1" text @click="handleAddProduct">
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
import ProductTable from '~/components/Product/ProductTable';
import * as ApiService from '@/services/api.service';
export default {
  mixins: [validationMixin],
  middleware: 'auth',
  layout: 'admin',
  component: { ProductTable },
  validations: {
    productName: { required },
    type: { required },
    price: { required, numeric },
  },
  data: () => ({
    dialog: false,
    isEditProduct: false,
    isLoading: false,
    typeItems: ['Drinking Water', 'Soft Drink', 'Coffee - Tea'],
    productData: [],
    currentEditId: '',
    productName: '',
    type: '',
    price: null,
    description: '',
    productImgUrl: '',
  }),
  computed: {
    productNameErrors() {
      const errors = [];
      if (!this.$v.productName.$dirty) return errors;
      !this.$v.productName.required && errors.push('Product name is required');
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.type.$dirty) return errors;
      !this.$v.type.required &&
        errors.push('Please select type of this product');
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.required &&
        errors.push('Please select type of this product');
      !this.$v.price.numeric &&
        errors.push('Product Price must be a positive number');
      return errors;
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.initPullData();
    this.isLoading = false;
  },
  methods: {
    async initPullData() {
      const res = await ApiService.getAllProducts();
      if (res.data) {
        this.productData = res.data;
      }
    },
    async handleAddProduct() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      const payload = {
        productName: this.productName,
        type: this.type,
        price: this.price,
        description: this.description,
        productImgUrl: this.productImgUrl,
      };
      await ApiService.addNewProduct(payload);
      Swal.fire({
        title: 'Add new product success!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        this.$router.go();
      });
    },
    async handleDelete(value) {
      const productId = value._id;
      const con = confirm(
        `Are you sure you want to delete this product "${value.productName}"`
      );
      if (con) {
        await ApiService.deleteProduct(productId);
        Swal.fire({
          title: 'Delete product success!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.$router.go();
        });
      }
    },
    async handleEditProduct() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      const payload = {
        productName: this.productName,
        type: this.type,
        price: this.price,
        description: this.description,
        productImgUrl: this.productImgUrl,
      };
      const con = confirm(
        `Are you sure you want to Edit this product "${this.productName}"`
      );
      if (con) {
        await ApiService.editProduct(this.currentEditId, payload);
        Swal.fire({
          title: 'Edit product success!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.$router.go();
        });
      }
    },
    handleSetEdit(value) {
      this.currentEditId = value._id;
      this.productName = value.productName;
      this.type = value.type;
      this.price = value.price;
      this.description = value.description;
      this.productImgUrl = value.productImgUrl;

      this.dialog = true;
      this.isEditProduct = true;
    },
    clearData() {
      this.productName = '';
      this.type = '';
      this.price = null;
      this.description = '';
      this.productImgUrl = '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
