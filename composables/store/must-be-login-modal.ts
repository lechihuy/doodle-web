export const useMustBeLoginModal = defineStore("must-be-login-modal", {
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