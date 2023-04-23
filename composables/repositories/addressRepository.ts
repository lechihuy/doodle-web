declare global {
    type ProvinceFilter = {
      keyword?: string,
      limit?: Number,
    }
  
    type DistrictFilter = {
      province_id?: string|Number,
      keyword?: string,
      limit?: Number,
    }
  
    type WardFilter = {
      district_id?: string|Number,
      keyword?: string,
      limit?: Number,
    }
  
    type GeocodeFilter = {
      country_subdivision?: string|Number,
      municipality_subdivision?: string|Number,
      street_name?: string|Number,
      street_number?: string|Number,
    }
  
    type DistanceCalculationData = {
      from: {
        lat?: string|number,
        lng?: string|number
      },
      to: {
        lat?: string|number,
        lng?: string|number
      }
    }
  }
  
  export const useIndexProvinceApi = (filter?: ProvinceFilter, headers?: object) => {
    const { $axios } = useNuxtApp()
    const accessToken = useCookie<string>('access_token')
  
    return $axios.get('public/addresses/provinces', {
      headers: {
        ...headers,
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken.value
      },
      params: {
        ...filter
      }
    })
  }
  
  export const useIndexDistrictApi = (filter?: DistrictFilter, headers?: object) => {
    const { $axios } = useNuxtApp()
    const accessToken = useCookie<string>('access_token')
  
    return $axios.get('public/addresses/districts', {
      headers: {
        ...headers,
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken.value
      },
      params: {
        ...filter,
      }
    })
  }
  
  export const useIndexWardApi = (filter?: WardFilter, headers?: object) => {
    const { $axios } = useNuxtApp()
    const accessToken = useCookie<string>('access_token')
  
    return $axios.get('public/addresses/wards', {
      headers: {
        ...headers,
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken.value
      },
      params: {
        ...filter,
      }
    })
  }
  
  export const useIndexGeocodesApi = (filter?: GeocodeFilter, headers?: object) => {
    const { $axios } = useNuxtApp()
    const accessToken = useCookie<string>('access_token')
  
    return $axios.get('public/addresses/geocodes', {
      headers: {
        ...headers,
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken.value
      },
      params: {
        ...filter,
      }
    })
  }
  
  export const useCalculateDistanceApi = (data: DistanceCalculationData, headers?: object) => {
    const { $axios } = useNuxtApp()
    const accessToken = useCookie<string>('access_token')
  
    return $axios.post('public/addresses/distance/calculate', data, {
      headers: {
        ...headers,
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken.value
      },
    })
  }