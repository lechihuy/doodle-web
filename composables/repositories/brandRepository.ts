declare global {
  type BrandFilter = {
    keyword?: string,
    page?: number,
    per_page?: number,
    limit?: number,
  }

  type BrandSorter = {
    name?: string,
    created_at?: string
  }
}


export const useIndexBrandsApi = (filter?: BrandFilter, sorter?: BrandSorter, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.get(`public/brands`, {
    headers: {
      ...headers,
    },
    params: {
      ...filter,
      sort: sorter
    }
  })
}

export const useDetailBrandApi = (id: string|number, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.get(`public/brands/${id}`, {
    headers: {
      ...headers,
    },
  })
}