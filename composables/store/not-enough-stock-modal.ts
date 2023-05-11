export const useNotEnoughStockModal = defineStore("not-enough-stock-modal", {
  state: () => {
    return {
      shown: false,
    }
  },

  actions: {
    open() {
      this.shown = true
    },

    close() {
      this.shown = false
    },
  },
})