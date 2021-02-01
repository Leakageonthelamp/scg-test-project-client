<template>
  <div
    v-if="itemData"
    class="product-card"
    :class="{ soldout: itemData.itemQty === 0 }"
    @click="checkItem"
  >
    <div class="product-content">
      <div class="img-box">
        <img
          :src="
            itemData.productDetail.productImgUrl
              ? itemData.productDetail.productImgUrl
              : 'https://line-thai.com/icon/noimg.png'
          "
        />
      </div>
      <div class="product-detail">
        <div class="product-name">{{ itemData.productDetail.productName }}</div>
        <div v-if="itemData.itemQty != 0" class="product-price">
          {{ itemData.productDetail.price }}฿
        </div>
        <div
          v-if="itemData.itemQty === 0"
          class="product-price"
          style="color: black"
        >
          Sold Out!
        </div>
      </div>
    </div>

    <v-dialog v-model="confirmDialog" max-width="420" class="rounded-xl">
      <v-card class="d-flex align-center flex-column rounded-xl">
        <v-card-title class="text-h4">{{
          itemData.productDetail.productName
        }}</v-card-title>
        <v-img
          :src="itemData.productDetail.productImgUrl"
          max-width="200"
          max-height="250"
        ></v-img>
        <v-card-title class="pa-2 text-h4 amber--text"
          >{{ itemData.productDetail.price }}฿</v-card-title
        >
        <v-card-subtitle class="text-center mt-1"
          ><span>{{
            itemData.productDetail.description
          }}</span></v-card-subtitle
        >
        <v-card-actions class="my-2">
          <v-btn
            color="grey lighten-2"
            class="rounded-lg"
            x-large
            @click="confirmDialog = false"
          >
            Pick other
          </v-btn>
          <v-btn
            color="amber darken-2"
            class="rounded-lg white--text"
            x-large
            @click="handleBuyItem"
          >
            Buy
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    confirmDialog: false,
  }),
  methods: {
    checkItem() {
      if (this.itemData.itemQty === 0) return;
      this.confirmDialog = true;
    },
    handleBuyItem() {
      this.$emit('onBuyItem', this.itemData._id);
      this.confirmDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0px 3px 16px #bcbcbc;
  display: flex;
  justify-content: center;
  .product-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .img-box {
      display: flex;
      justify-content: center;
      width: 150px;
      height: 150px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .product-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    .product-name {
      font-size: 20px;
      font-weight: 500;
    }
    .product-price {
      font-size: 24px;
      font-weight: 500;
      color: #ff9922;
    }
  }

  &.soldout {
    background-color: lightgray;
  }
}
</style>
