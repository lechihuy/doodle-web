<script lang="ts" setup>
definePageMeta({
  layout: "personal",
  middleware: ["auth"],
});

useHead({ title: "Đơn hàng của tôi" });
useMapHead();

const toast = useToast();
const route = useRoute();
const { $moment } = useNuxtApp();
const id = route.params.id as string;

const { data: order } = await useAsyncData(
  "order",
  async () => (await useDetailOrderApi(id)).data.data
);

fetchRealtimeOrderTracking(order.value.code, async (snapshot: any) => {
  await refreshNuxtData("order");
});

watch (order, () => {
  if (order.value.ratable) {
    useRateOrderModal().open(order.value.id, () => {
      refreshNuxtData("order")
    })
  }
}, { deep: true })

async function cancelOrder() {
  const modal = useActionConfirmationModal();
  modal.open({
    title: "Xác nhận hủy đơn",
    body: "Hành động này không thể hoàn tác, bạn có chắc chắn muốn thực hiện?",
  });
  modal.onAccepted = () => {
    useCancelOrderApi(order.value.id)
      .then(() => {
        changeRealtimeOrderTracking(order.value.code, "canceled");
        toast.success("Hủy đơn hàng thành công!");
      })
      .catch((err) => toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau."));
  };
}

async function rateOrder(order: any) {
  const modal = useRateOrderModal()
  modal.open(order.id, () => {
    refreshNuxtData("order");
  })
}
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light flex items-center gap-2">
      <NuxtLink
        :to="{ name: 'orders' }"
        class="w-8 h-8 rounded-full border border-default-500 flex items-center justify-center"
      >
        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
      </NuxtLink>
      Đơn hàng {{ order.code }}
    </h1>

    <div class="divide-y divide-default-500/10 mt-7">
      <div class="py-7 flex flex-col gap-2">
        <label class="font-semibold">Theo dõi đơn hàng</label>
        <div class="order-tracking">
          <div class="item active">
            <div class="point">
              <span class="time">{{
                $moment(order.created_at).format("DD/MM/YYYY HH:mm")
              }}</span>
            </div>
            <span
              class="inline-block font-semibold text-xs px-1.5 py-0.5 rounded-full bg-default-100"
              >Đặt hàng</span
            >
          </div>
          <div
            v-for="item in order.order_tracking_timeline"
            class="item"
            :class="{ active: item?.id }"
            :key="item.status"
          >
            <div class="point">
              <span v-if="item.created_at" class="time">{{
                $moment(item.created_at).format("DD/MM/YYYY HH:mm")
              }}</span>
            </div>
            <OrderStatusBadge
              :class="{ 'opacity-30': !item?.id }"
              :status="item.status"
            />
          </div>
        </div>
        <button type="button" v-if="order.cancelable" class="btn btn-transparent bg-white mt-7" @click="cancelOrder">Hủy đơn hàng</button>
      </div>
      <div class="py-7 flex flex-col gap-2">
        <label class="font-semibold">Chi nhánh</label>
        {{ order.branch.name }}
      </div>
      <div class="py-7 flex flex-col gap-2">
        <label class="font-semibold">Nhân viên giao hàng</label>
        <div class="flex items-center gap-2" v-if="order.delivering_staff">
          <div v-if="order.delivering_staff.avatar" class="rounded-full border border-default-200 overflow-hidden inline-block w-14 h-14">
            <img :src="order.delivering_staff.avatar.url" :alt="`Ảnh đại diện của ${order.delivering_staff.full_name}`" class="w-full h-full rounded object-contain" />
          </div>
          <span>{{ order.delivering_staff.full_name }}</span>
        </div>
        <span v-else class="text-default-500">&mdash;</span>
      </div>
      <div class="py-7 flex flex-col gap-2">
        <label class="font-semibold">Người nhận hàng</label>
        {{ order.address_data.contact.full_name }} -
        {{ order.address_data.contact.phone_number }}
      </div>
      <div class="py-7 flex flex-col gap-2">
        <label class="font-semibold">Địa chỉ nhận hàng</label>
        <p>{{ order.address_data.full_address }}</p>
        <div class="relative w-full h-72 sm:h-96 z-[1] rounded-lg overflow-hidden" v-if="order.address_data.lat && order.address_data.lng">
          <Map :coordinates="{
            lat: order.address_data.lat,
            lng: order.address_data.lng
          }" class="h-full" />
        </div>  
      </div>
      <div class="py-7 flex flex-col gap-2">
        <label class="font-semibold">Đơn hàng</label>

        <div class="flex flex-col divide-y divide-default-50 -my-3">
          <div
            v-for="(item, index) in order.items"
            :key="index"
            class="flex items-center gap-3 py-3"
          >
            <div class="flex-none">
              <div
                class="border border-default-200 overflow-hidden w-14 h-14 lg:w-20 lg:h-20 rounded"
              >
                <img
                  v-if="item.product.thumbnail"
                  :src="item.product.thumbnail.url"
                  :alt="`Ảnh của ${item.product.name}`"
                  class="w-full h-full rounded object-contain"
                />
                <div
                  v-else
                  class="rounded bg-default-50 text-default-300 w-full h-full flex items-center justify-center select-none font-bold"
                >
                  &mdash;
                </div>
              </div>
            </div>
            <div class="grow flex flex-col gap-1">
              <NuxtLink class="link-primary font-semibold">
                {{ item.product.name }}
              </NuxtLink>
            </div>
            <div class="ml-auto flex flex-col gap-1 text-right text-sm">
              <p>
                {{ currency(item.product.sale_price) }} x
                {{ item.qty }}
              </p>
              <p class="font-semibold">
                = {{ currency(item.qty * item.product.sale_price) }}
              </p>
            </div>
          </div>
        </div>

        <div class="justify-end flex w-full mt-3 text-sm text-default-700">
          <div class="w-80 max-w-full flex flex-col gap-2 p-5 rounded-lg bg-default-50">
            <div class="flex items-center gap-5">
              <span>Tạm tính</span>
              <span class="ml-auto">{{ currency(order.sub_total) }}</span>
            </div>
            <div class="flex items-center gap-5">
              <span>Phí vận chuyển</span>
              <span class="ml-auto">{{ currency(order.shipping_fee) }}</span>
            </div>
            <div class="flex items-center gap-5">
              <span>Ưu đãi</span>
              <span class="ml-auto">-{{ currency(order.voucher_discount) }}</span>
            </div>
            <div class="flex items-center gap-5">
              <span>Tổng</span>
              <span class="ml-auto font-bold">{{ currency(order.total) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="py-7 flex flex-col gap-2">
        <label class="font-semibold">Ghi chú</label>
        <p v-if="order.note">{{ order.note }}</p>
        <p v-else class="text-default-500">&mdash;</p>
      </div>
      <div class="py-7 flex flex-col gap-2" v-if="order.ratable || order.rating">
        <label class="font-semibold">Đánh giá</label>
        <div v-if="order.rating" class="flex flex-col gap-2">
          <div class="flex items-center gap-1">
            <Icon v-for="i in 5" :key="i"
              class="w-5 h-5"
              :name="
                order.rating >= i
                  ? 'teenyicons:star-solid'
                  : 'teenyicons:star-outline'
              "
              :class="[
                order.rating >= i ? 'text-yellow-500' : 'text-default-200'
              ]"
            />
          </div>
          <p v-if="order.feedback" class="italic">"{{ order.feedback }}"</p>
        </div>

        <div v-else>
          <button type="button" class="btn btn-transparent btn-sm" @click="rateOrder(order)">
            <Icon name="heroicons:star-solid" class="w-5 h-5 text-yellow-500" /> Đánh giá
          </button>
        </div>
      </div>
    </div>
  </div>

  <RateOrderModal />
</template>

<style scoped lang="scss">
.order-tracking {
  @apply flex flex-col pl-16;
}

.order-tracking .item {
  @apply relative py-1.5 pl-16
  before:content-[''] before:h-full before:absolute before:w-0.5 before:bg-default-100 before:top-0 before:left-12
  before:rounded;
}

.order-tracking .item .point {
  @apply w-2.5 h-2.5 bg-default-100 rounded-full mt-2 absolute left-11 ring-2 ring-white;
}

.order-tracking .item:first-child {
  @apply before:top-5;
}

.order-tracking .item:last-child {
  @apply before:h-5;
}

.order-tracking .item.active .point {
  @apply bg-primary-500;
}

.order-tracking .item .point .time {
  @apply text-xs absolute right-5 w-28 -top-1 text-right;
}

.order-tracking .item .note {
  @apply text-xs mt-1 ml-1;
}
</style>