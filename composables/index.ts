export { useToast } from '~/composables/store/toast'
export { useActionConfirmationModal } from '~/composables/store/action-confirmation-modal'

export {
  useLoginCustomerApi,
  useSendEmailVerificationApi,
  useVerifyEmailApi,
  useResetCustomerPasswordApi,
  useGetCustomerProfileApi,
  useLogoutCustomerApi,
  useRegisterCustomerApi,
  useEditProfileApi,
  useChangeCustomerPasswordApi,
  useCountAddressMetricApi,
  useIndexAddressApi,
  useCreateAddressApi,
  useEditAddressApi,
  useDetailAddressApi,
  useDestroyAddressApi
} from '~/composables/repositories/authRepository'

export {
  useIndexProvinceApi,
  useIndexDistrictApi,
  useIndexWardApi,
  useIndexGeocodesApi,
  useCalculateDistanceApi
} from '~/composables/repositories/addressRepository'

export {
  useIndexProductLensApi,
  useIndexProductsApi
} from '~/composables/repositories/productRepository'