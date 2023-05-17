declare global {
  type BranchFilter = {
    keyword?: string,
    page?: number,
    per_page?: number,
    limit?: number,
  }

  type BranchSorter = {
    name?: string,
    created_at?: string
  }
}

export const useIndexBranchsApi = (filter?: BranchFilter, sorter?: BranchSorter, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.get(`public/branches`, {
    headers: {
      ...headers,
    },
    params: {
      ...filter,
      sort: sorter
    }
  })
}

export const useCountBranchMetricApi = (metric: string, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.get(`public/branches/metrics/${metric}`, {
    headers: {
      ...headers,
    },
  })
}