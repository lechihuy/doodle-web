import _ from "lodash";
import { defineStore } from "pinia"

export const useCart = defineStore("cart", {
  state: () => {
    return {
      data: null,
      count: 0,
      wasChanged: false,
      loading: false,
    }
  },

  actions: {
    async initFromResponse(res: any) {
      this.data = res.data.data
      this.count = _.sumBy(this.data?.items, 'qty')
    },
    
    async fetch() {
      await useIndexCartApi()
        .then(res => {
          this.initFromResponse(res)
        })
    },

    async add(productId: number) {

      return useAddToCartApi({ product_id: productId })
        .then(res => {
          this.initFromResponse(res)
          this.wasChanged = true
          setTimeout(() => this.wasChanged = false, 200)
        })
    },

    async decrementItemQtyByProductId(productId: number) {
      const item = this.itemByProductId(productId)

      return useEditCartItemApi(item.id, { qty: item.qty - 1 })
        .then(res => {
          this.initFromResponse(res)
          this.wasChanged = true
          setTimeout(() => this.wasChanged = false, 200)
        })
    },

    async removeItemByProductId(productId: number) {
      const item = this.itemByProductId(productId)

      return useDeleteCartItemApi(item.id)
        .then(res => {
          this.initFromResponse(res)
          this.wasChanged = true
          setTimeout(() => this.wasChanged = false, 200)
        })
    },

    itemByProductId(productId: number) {
      return this.data?.items.find((item: any) => item.product_id === productId)
    }
  },
});