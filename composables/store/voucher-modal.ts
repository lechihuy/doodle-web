export const useVoucherModal = defineStore("voucher-modal", {
  state: () => {
    return {
      shown: false,
      vouchers: []
    }
  },

  actions: {
    async open() {
      await this.fetch()
      this.shown = true
    },

    close() {
      this.shown = false
    },

    async fetch() {
      await useIndexVouchersApi()
        .then(res => {
          this.vouchers = res.data.data
        })
    }
  },
})