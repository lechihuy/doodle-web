export const useNotEnoughStockModal = defineStore("not-enough-stock-modal", {
  state: () => {
    return {
      shown: false,
      type: ''
    }
  },

  actions: {
    open(type: string = '') {
      this.shown = true
      this.type = type
    },

    close() {
      this.shown = false
    },
  },
})