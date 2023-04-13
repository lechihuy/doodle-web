export const useCurrentCustomer = () => useState<{ [key: string]: any }|null>('current_customer')
export const useCurrentCustomerRefreshed = () => useState<Boolean>('current_customer_refreshed', () => true)
export const usePageLoading = () => useState<Boolean>('page_loading', () => true)