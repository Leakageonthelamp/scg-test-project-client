<template>
  <div class="container" style="width: 100%">
    <template>
      <div>
        <div class="d-flex justify-end">
          <v-text-field
            v-model="search"
            class="col-4"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </div>
        <v-data-table
          :headers="headers"
          :items="product"
          :items-per-page="itemsPerPage"
          :search="search"
          sort-by="_id"
          :page.sync="page"
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.type`]="{ item }">
            <div class="text-capitalize">{{ item.type }}</div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              class="ma-1"
              x-small
              fab
              color="warning"
              @click="editItem(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              class="ma-1"
              x-small
              fab
              color="error"
              @click="deleteItem(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:[`item.productImgUrl`]="{ item }">
            <v-responsive
              width="50"
              height="50"
              class="rounded-circle d-flex align-center justify-center my-2"
            >
              <v-img
                width="50"
                height="50"
                :src="
                  item.productImgUrl
                    ? item.productImgUrl
                    : 'https://line-thai.com/icon/noimg.png'
                "
              />
            </v-responsive>
          </template>
          <template v-slot:no-data>
            <v-chip class="ma-2" medium color="red" text-color="white">
              <v-icon left> mdi-clipboard-outline </v-icon>No Data
            </v-chip>
          </template>
        </v-data-table>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    search: '',
    pageCount: 0,
    page: 1,
    itemsPerPage: 10,
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: true,
        value: '_id',
      },
      { text: 'Product Name', value: 'productName' },
      { text: 'Type', value: 'type' },
      { text: 'Price(฿)', value: 'price' },
      { text: 'Image', value: 'productImgUrl', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    rowperpage: [5, 10, 15, 50, 100],
  }),

  methods: {
    deleteItem(item) {
      this.$emit('onDelete', item);
    },
    editItem(item) {
      this.$emit('onEdit', item);
    },
  },
};
</script>
