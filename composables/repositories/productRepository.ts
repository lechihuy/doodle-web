declare global {
  type ProductFilter = {
    limit?: number,
  }

  type ProductSorter = {
    created_at?: string
  }
}

export const useIndexProductLensApi = (lens: string, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.get(`public/products/lenses/${lens}`, {
    headers: {
      ...headers,
    },
  })
}

export const useIndexProductsApi = (filter?: ProductFilter, sorter?: ProductSorter, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.get(`public/products`, {
    headers: {
      ...headers,
    },
    params: {
      ...filter,
      sort: sorter
    }
  })
}