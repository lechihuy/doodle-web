import { defineStore } from "pinia"

let timer: NodeJS.Timeout
const DEFAULT_CONTEXT = "error"
const DEFAULT_SECONDS = 2000

export const useToast = defineStore("toast", {
  state: () => {
    return {
      message: '',
      context: DEFAULT_CONTEXT,
      shown: false,
      seconds: DEFAULT_SECONDS,
    }
  },

  actions: {
    show({ message, context, timeout }: { message: string, context: string, timeout?: number }) {
      this.message = message
      this.context = context
      this.shown = true
      timeout = timeout ?? DEFAULT_SECONDS

      clearTimeout(timer)
      if (timeout > 0) {
        timer = setTimeout(() => {
          this.hide()
        }, timeout)
      }
    },

    success(message: string, timeout?: number) {
      this.show({ message, context: "success", timeout })
    },

    error(message: string, timeout?: number) {
      this.show({ message, context: "error", timeout })
    },

    loading(message: string, timeout?: number) {
      this.show({ message, context: "loading", timeout })
    },

    hide() {
      this.shown = false
    },
  },
});