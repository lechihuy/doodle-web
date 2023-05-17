import _ from "lodash";
import { defineStore } from "pinia"

export const useCart = defineStore("cart", {
  state: () => {
    return {
      data: null,
      count: 0,
      wasChanged: false,
    }
  },

  actions: {
    async initFromResponse(res: any) {
      this.data = res
      this.count = _.sumBy(this.data?.items, 'qty')
    },
    
    async fetch() {
      const { data } = await useAsyncData('cart',
        async () => (await useIndexCartApi()).data.data
      )
      
      this.initFromResponse(data.value)
    },

    async add(productId: number) {

      return useAddToCartApi({ product_id: productId })
        .then(res => {
          this.initFromResponse(res.data.data)
          this.changed()
        })
    },

    async decrementItemQtyByProductId(productId: number) {
      const item = this.itemByProductId(productId)

      return useEditCartItemApi(item.id, { qty: item.qty - 1 })
        .then(res => {
          this.initFromResponse(res.data.data)
          this.changed()
        })
    },

    async removeItemByProductId(productId: number) {
      const item = this.itemByProductId(productId)

      return useDeleteCartItemApi(item.id)
        .then(res => {
          this.initFromResponse(res.data.data)
          this.changed()
        })
    },

    changed() {
      this.wasChanged = true
      setTimeout(() => this.wasChanged = false, 300)
    },

    itemByProductId(productId: number) {
      return this.data?.items.find((item: any) => item.product_id === productId)
    }
  },
});