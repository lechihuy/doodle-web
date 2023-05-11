declare global {
  type ProductGroupFilter = {
    keyword?: string,
    page?: number,
    per_page?: number,
    limit?: number,
  }

  type ProductGroupSorter = {
    name?: string,
    created_at?: string
  }
}


export const useIndexProductGroupsApi = (filter?: ProductGroupFilter, sorter?: ProductGroupSorter, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.get(`public/product-groups`, {
    headers: {
      ...headers,
    },
    params: {
      ...filter,
      sort: sorter
    }
  })
}

export const useDetailProductGroupApi = (id: string|number, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.get(`public/product-groups/${id}`, {
    headers: {
      ...headers,
    },
  })
}