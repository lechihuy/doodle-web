import { Ref } from "@vue/reactivity"
import _ from 'lodash'

interface Errors {
  [key: string]: any
}

export class ErrorBag
{
  public errors: Ref<null|undefined|Errors> = ref({})

  constructor(errors?: null) {
    this.errors.value = errors
  }

  clear(key: string) {
    return _.find(this.errors.value, (errors, errorKey) => {
      if (errorKey.match(new RegExp('^' + key))) {
        delete this.errors?.value?.[errorKey]
      }
    })
  }

  get(key: string) {
    return _.flatten(_.filter(this.errors.value, (errors, errorKey) => {
      return errorKey.match(new RegExp('^' + key));
    }))
  }

  set(key: string, errors: string[]) {
    this.errors.value = Object.assign({}, this.errors.value, { [key]: errors} )
  }
}

export const useErrorBag = (errors?: null) => {
  return new ErrorBag(errors)
}