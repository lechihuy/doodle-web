export const useRateOrderModal = defineStore("rate-order-modal", {
    state: () => {
      return {
        shown: false,
        rating: 0,
        hoverRating: 0,
        feedback: '',
        id: '',
        submitCallback: () => {}
      }
    },
  
    actions: {
      open(id: string, submitCallback = () => {}) {
        this.id = id
        this.rating = 0
        this.hoverRating = 0
        this.feedback = ''
        this.shown = true
        this.submitCallback = submitCallback
      },
  
      close() {
        this.shown = false
      },

      mouseEnterStar(number: number) {
        this.hoverRating = number
      },

      mouseLeaveStar(number: number) {
        this.hoverRating = this.rating
      },

      focusStar(number: number) {
        this.hoverRating = number
        this.rating = number
      },

      async submit() {
        await useRateOrderApi(this.id, { rating: this.rating, feedback: this.feedback })
          .then(() => {
            this.submitCallback()
            useToast().success('Cảm ơn lời đánh giá của bạn!')
          })
          .catch(() => {
            useToast().error('Đã có lỗi xảy ra, vui lòng thử lại sau.')
          })
          .finally(() => {
            this.close()
          })
      }
    },
  })