<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

useMapHead()

useHead({
  title: 'Giỏ hàng'
})

const route = useRoute()
const currentCustomer = useCurrentCustomer()
const cart = useCart()

async function detachVoucher() {
  if (!cart.data.voucher) return

  await useDetachVoucherApi(cart.data.voucher_id)
    .then(() => {
      cart.fetch()
      cart.changed()
    })
}

async function checkout() {
  if (!cart.count) return

  await useCheckoutApi()
    .then((res) => {
      useToast().success('Đặt hàng thành công!')
      navigateTo({ name: 'orders-id', params: { id: res.data.data.id } })
    })
}
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div class="text-default-500 flex items-center justify-center gap-1 min-h-[calc(100vh_-_theme(space.32))]">
        <IconLoading class="w-5 h-5" /> Đang tải
      </div>
    </template>

    <div class="relative">
      <div v-if="cart.count > 0" class="flex mb-16 flex-col lg:flex-row container px-3 mx-auto min-h-[calc(100vh_-_theme(space.32))] lg:divide-x divide-default-900/10">
        <div class="grow py-7 lg:pr-7">
          <h3 class="text-2xl font-light">Giỏ hàng</h3>

          <div class="bg-warning-100 text-warning-900 px-5 py-3 my-5 rounded-lg" v-show="!cart.data.available">
            <p class="font-bold mb-2 text-sm"><Icon name="heroicons:exclamation-triangle-solid" class="w-5 h-5" /> Chi nhánh không đáp ứng được giỏ hàng của bạn</p>
            <p class="text-sm">Một số sản phẩm bên dưới có số lượng lớn hơn số lượng tồn kho mà chi nhánh gần địa chỉ giao hàng nhất có thể cung cấp. Bạn có thể giảm bớt số lượng sản phẩm hoặc chọn chi nhánh khác. Chúng tôi chân thành xin lỗi vì sự bất tiện này!</p>
          </div>

          <div class="my-3">
            <FormSwitchCartBranchInput />
          </div>

          <div class="flex flex-col divide-y divide-default-100">
            <div v-for="item in cart.data.items" :key="item" class="flex gap-5 py-5">
              <nuxt-img 
                @click="navigateTo({ name: 'products-product', params: { product: item.product.slug } })" 
                :src="item.product.thumbnail.url" 
                class="w-24 bg-default-50 h-24 rounded-lg cursor-pointer" 
              />
              <div class="grid grid-cols-1 content-between">
                <NuxtLink 
                  :to="{ name: 'products-product', params: { product: item.product.slug } }" 
                  class="font-semibold text-primary-950 line-clamp-2 hover:text-primary-500"
                >
                  {{ item.product.name }}
                </NuxtLink>
                <div class="inline-flex">
                  <AddToCartButton :product-id="item.product.id" size="small" />
                </div>
              </div>
              <div class="ml-auto text-right text-default-700">
                <div>{{ item.qty }} x {{ currency(item.product.sale_price) }}</div>
                <div class="font-bold">= {{ currency(item.product.sale_price * item.qty) }}</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-7 mt-7">
            <div>
              <p class="font-semibold text-default-700 mb-2">Ghi chú</p>
              <FormTextarea
                id="note"
                v-model="cart.data.note"
                placeholder="Thêm một vài ghi chú cho cửa hàng..."
              />
            </div>
            <div class="max-w-full flex divide-y divide-default-100 flex-col p-5 rounded-lg bg-default-50">
              <div class="flex items-center gap-5 py-3">
                <span>Tạm tính</span>
                <span class="ml-auto font-bold">{{ currency(cart.data.sub_total) }}</span>
              </div>
              <div class="flex items-start gap-5 py-3">
                <span>Phí vận chuyển</span>
                <div class="ml-auto text-right">
                  <div class="font-bold">{{ currency(cart.data.shipping_fee) }}</div>
                  <div class="text-sm text-default-500">({{ distance(cart.data.address.meta.branch_distances.find((distance) => distance.branch_id === cart.data.branch_id).distance) }})</div>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="flex items-start gap-5 py-3">
                  <span class="mt-1.5">Ưu đãi</span>
                  <div class="ml-auto flex flex-col">
                    <div v-if="cart.data.voucher" class="text-right border-b border-default-200 border-dashed mb-2 pb-2">
                      <div class="font-semibold text-primary-500">{{ cart.data.voucher.name }}</div>
                      <div class="font-bold">-{{ currency(cart.data.voucher_discount) }}</div>
                    </div>
                    <div class="flex justify-end gap-1">
                      <button type="button" class="btn btn-default text-primary-500 btn-sm" @click="useVoucherModal().open">
                        <Icon name="heroicons:ticket" class="w-5 h-5" />
                        {{ cart.data.voucher ? 'Đổi' : 'Chọn' }} phiếu ưu đãi
                      </button>
                      <button v-if="cart.data.voucher" type="button" class="btn btn-default btn-sm" @click="detachVoucher">
                        <Icon name="heroicons:x-mark" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-5 py-3">
                <span>Tổng</span>
                <span class="ml-auto font-bold text-danger-500">{{ currency(cart.data.total) }}</span>
              </div>
            </div>
          </div>

          <div class="mt-7">
            <p class="text-sm text-default-500">Hiện tại cửa hàng chúng tôi chỉ hỗ trợ thanh toán sau khi nhận hàng. Sau khi đã chọn được sản phẩm mong muốn và kiểm tra lại thông tin nhận hàng, quý khách có thể nhấn vào nút bên dưới để tiến hành đặt hàng.</p>
          </div>
        </div>
        <div class="bg-white w-full lg:max-w-md py-7 lg:pl-7">
          <h3 class="text-2xl font-light">Thông tin giao hàng</h3>
          <div class="divide-y divide-default-100">
            <div class="py-7 flex flex-col gap-2">
              <label class="font-semibold">Chọn địa chỉ</label>
              <FormSwitchAddressInput class="w-full" :full-size="true" />
            </div>
            <div class="py-7 flex flex-col gap-2">
              <label class="font-semibold">Người nhận hàng</label>
              {{ cart.data.address.contact.full_name }} -
              {{ cart.data.address.contact.phone_number }}
            </div>
            <div class="py-7 flex flex-col gap-2">
              <label class="font-semibold">Địa chỉ nhận hàng</label>
              <p>{{ cart.data.address.full_address }}</p>
              <div class="relative w-full h-64 sm:h-72 z-[1] rounded-lg overflow-hidden" v-if="cart.data.address.lat && cart.data.address.lng">
                <Map :coordinates="{
                  lat: cart.data.address.lat,
                  lng: cart.data.address.lng
                }" class="h-full" />
              </div>  
            </div>
          </div>
        </div>
      </div>

      <div v-if="cart.count == 0" class="flex container px-3 mx-auto justify-center min-h-[calc(100vh_-_theme(space.16))] items-center">
        <div class="w-full max-w-md text-center flex flex-col">
          <div class="w-full flex items-center justify-center relative">
            <div
              class="absolute inset-0 bg-grid-default-900 bg-[bottom_1px_center]"
              style="
                -webkit-mask-image: linear-gradient(to bottom, transparent, black, transparent);
              "
            ></div>
            <img src="/images/empty-cart.png" class="w-52" alt="">
          </div>
          <h3 class="text-xl font-semibold text-default-700 mt-10 mb-3">Hãy chọn sản phẩm đầu tiên vào giỏ hàng.</h3>
          <p class="text-default-500">Bạn hãy lựa chọn những sản phẩm mong muốn rồi quay lại giỏ hàng bất cứ khi nào bạn muốn thực hiện thanh toán.</p>
          <div class="flex flex-col xs:flex-row justify-center mt-10 items-center gap-3">
            <NuxtLink :to="{ name: 'index' }" class="block w-full order-2 xs:order-1">
              <button type="button" class="btn btn-block btn-transparent btn-large">
                Trở về trang chủ
              </button>
            </NuxtLink>
            <NuxtLink :to="{ name: 'products' }" class="block w-full order-1 xs:order-2">
              <button type="button" class="btn btn-block btn-large btn-primary">
                Khám phá sản phẩm
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cart.count > 0" class="fixed bottom-0 w-full h-16 border-t border-default-100 bg-default-50" :style="{ zIndex: zIndex.modal }">
      <div class="flex items-center h-full justify-end gap-5 container px-3 mx-auto">
        <div class="flex items-center gap-2">
          <p class="text-sm font-semibold text-default-700">Tổng:</p>
          <p class="font-bold text-danger-500" :class="{ 'animate-shake': cart.wasChanged }">{{ currency(cart.data.total) }}</p>
        </div>
        <button type="button" class="btn btn-primary" @click="checkout">
          <Icon name="heroicons:check-circle" class="w-5 h-5" />
          Đặt hàng ngay
        </button>
      </div>
    </div>

    <VoucherModal />
  </ClientOnly>
</template>