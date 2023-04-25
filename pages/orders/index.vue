<script lang="ts" setup>
definePageMeta({
  layout: "personal",
  middleware: ["auth"],
});

useHead({ title: "Đơn hàng của tôi" });

const { $moment } = useNuxtApp()

const filter = ref<OrderFilter>({
  status: 'executing',
  page: 1,
});

async function switchOrderStatusFilter(status: string) {
  filter.value.status = status;
  refreshNuxtData('orders')
}

const { data: total } = await useAsyncData<any>('total',
  async () => (await useCountOrderMetricApi('total')).data.data.value
)

const { data: orders } = await useAsyncData('orders',
  async () => (await useIndexOrdersApi(filter.value)).data
)
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light mb-1">Đơn hàng của tôi</h1>
    <p class="text-default-500 text-light text-sm">
      Bao gồm tất cả các đơn hàng mà bạn đã đặt trên hệ thống.
    </p>

    <div
      class="flex items-center mt-7 gap-6 flex-nowrap border-b border-default-500/10 text-sm font-semibold overflow-x-auto pb-0.5"
    >
      <button
        type="button"
        class="relative py-2 flex-none"
        :class="{
          'after:h-0.5 after:w-full after:absolute after:bg-primary-500 after:-bottom-0.5 after:left-0': filter.status === 'executing',
        }"
        @click="switchOrderStatusFilter('executing')"
      >
        Đang thực hiện
      </button>
      <button
        type="button"
        class="relative py-2 flex-none"
        :class="{
          'after:h-0.5 after:w-full after:absolute after:bg-primary-500 after:-bottom-0.5 after:left-0': filter.status === 'completed',
        }"
        @click="switchOrderStatusFilter('completed')"
      >
        Đã hoàn tất
      </button>
      <button
        type="button"
        class="relative py-2 flex-none"
        :class="{
          'after:h-0.5 after:w-full after:absolute after:bg-primary-500 after:-bottom-0.5 after:left-0': filter.status === 'canceled',
        }"
        @click="switchOrderStatusFilter('canceled')"
      >
        Đã hủy
      </button>
    </div>

    <div class="divide-y divide-default-500/10">
      <div v-for="order in orders.data" :key="order.id" class="py-7 flex items-center gap-7">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <NuxtLink class="link-primary font-bold">
              #{{ order.code }}
            </NuxtLink>
            <OrderStatusBadge :status="order.status" />
          </div>
          <p class="text-sm text-default-700 font-semibold">{{ $moment(order.created_at).format('DD/MM/YYYY HH:mm') }}</p>
          <span class="text-sm text-default-500 line-clamp-1">
            {{ order.items.map(item => item.inventory.product.name).join(', ') }}
          </span>
          <div v-if="order.status === 'pending'" class="mt-3">
            <button type="button" class="btn btn-transparent btn-sm">
              Hủy đơn
            </button>
          </div>
        </div>
        <div class="ml-auto font-semibold">
          {{ currency(order.total) }}
        </div>
      </div>
    </div>

    <div class="flex items-center text-sm">
      <div class="text-default-700">{{ orders.meta.from }}-{{ orders.meta.to }} trên tổng {{ orders.meta.total }} bản ghi.</div>
      <Paginator class="ml-auto" :meta="orders.meta" :filter="filter" />
    </div>

</div>
</template>
