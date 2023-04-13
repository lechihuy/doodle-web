import lodash from 'lodash'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      lodash: lodash
    }
  }
})