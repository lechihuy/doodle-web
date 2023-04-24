export const useActionConfirmationModal = defineStore("action-confirmation-modal", {
  state: () => {
    return {
      title: '',
      body: '',
      shown: false,
      onAccepted: () => { },
      executing: false,
    }
  },

  actions: {
    open({ title, body }: { title: string, body: string }) {
      this.title = title
      this.body = body
      this.shown = true
    },

    async accept() {
      if (typeof this.onAccepted === 'function') {
        this.executing = true
        await this.onAccepted()
      }
      setTimeout(() => this.executing = false, 200)
      this.close()
    },

    close() {
      this.executing = false
      this.shown = false
    },
  },
})