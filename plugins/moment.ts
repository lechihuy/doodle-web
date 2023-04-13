import moment from 'moment-timezone'

export default defineNuxtPlugin(() => {
  moment.tz.setDefault('Asia/Ho_Chi_Minh')

  return {
    provide: {
      moment: moment
    }
  }
})