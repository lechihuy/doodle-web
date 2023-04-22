export const useCurrentCustomer = () => useState<{ [key: string]: any }|null>('current_customer')
export const usePageLoading = () => useState<Boolean>('page_loading', () => true)
export const useIsMac = () => useState<Boolean>('is_mac', () => false)
export const useRefreshCustomer = () => useState<{ [key: string]: any }|null>('refresh_customer')
