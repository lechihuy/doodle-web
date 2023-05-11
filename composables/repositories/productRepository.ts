declare global {
  type ProductFilter = {
    keyword?: string,
    page?: number,
    per_page?: number,
    limit?: number,
    product_group_id?: number,
    brand_id?: number,
  }

  type ProductSorter = {
    created_at?: string,
    sale_price?: string|null
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