<script lang="ts" setup>
definePageMeta({
  layout: "personal",
  middleware: ["auth"],
});

useHead({ title: "Đơn hàng của tôi" });

const toast = useToast()
const { $moment, $lodash } = useNuxtApp();
const loading = ref(false);
const filter = ref<OrderFilter>({
  keyword: "",
  status: "executing",
  page: 1,
});

async function switchOrderStatusFilter(status: string) {
  filter.value.status = status;
  filter.value.page = 1;
  filter.value.keyword = "";
}

const { data: total } = await useAsyncData<any>(
  "total",
  async () =>
    (
      await useCountOrderMetricApi("total", filter.value)
    ).data.data.value
);

const { data: orders } = await useAsyncData(
  "orders",
  async () => (await useIndexOrdersApi(filter.value)).data
);

fetchRealtimeOrdersTracking((snapshot: any) => {
  refreshNuxtData("total");
  refreshNuxtData("orders");
});

async function resetFilter() {
  filter.value.keyword = ''
  filter.value.page = 1
  filter.value.status = "";
}

async function cancelOrder(order: any) {
  const modal = useActionConfirmationModal()
  modal.open({
    title: 'Xác nhận hủy đơn',
    body: 'Hành động này không thể hoàn tác, bạn có chắc chắn muốn thực hiện?'
  })
  modal.onAccepted = () => {
    useCancelOrderApi(order.id).then(() => {
      changeRealtimeOrderTracking(order.code, 'canceled')
      toast.success('Hủy đơn hàng thành công!')
    }).catch((err) => toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau.'))
  }
}

watch(
  filter,
  async () => {
    if (filter.value.keyword && filter.value.status != '') {
      filter.value.status = "";
      return
    }

    loading.value = true;
    await refreshNuxtData("total");
    await refreshNuxtData("orders");
    setTimeout(() => (loading.value = false), 200);
  },
  { deep: true }
);
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light mb-1">Đơn hàng của tôi</h1>
    <p class="text-default-500 text-light text-sm">
      Bao gồm tất cả các đơn hàng mà bạn đã đặt trên hệ thống.
    </p>

    <div class="relative mt-7">
      <Icon
        name="heroicons:magnifying-glass"
        class="text-default-500 w-5 h-5 absolute left-3 top-2"
      />
      <input
        type="text"
        class="form-input w-full sm:w-96 pl-10 text-sm"
        placeholder="Tìm kiếm với mã đơn hàng..."
        spellcheck="false"
        :value="filter.keyword"
        @input="
          $lodash.debounce(() => (filter.keyword = $event.target.value), 500)()
        "
      />
    </div>

    <div
      class="flex items-center mt-7 gap-6 flex-nowrap border-b border-default-500/10 text-sm font-semibold overflow-x-auto pb-0.5"
    >
      <button
        type="button"
        class="relative py-2 flex-none"
        :class="{
          'after:h-0.5 after:w-full after:absolute after:bg-primary-500 after:-bottom-0.5 after:left-0':
            filter.status === '',
        }"
        @click="switchOrderStatusFilter('')"
      >
        Tất cả
      </button>
      <button
        type="button"
        class="relative py-2 flex-none"
        :class="{
          'after:h-0.5 after:w-full after:absolute after:bg-primary-500 after:-bottom-0.5 after:left-0':
            filter.status === 'executing',
        }"
        @click="switchOrderStatusFilter('executing')"
      >
        Đang thực hiện
      </button>
      <button
        type="button"
        class="relative py-2 flex-none"
        :class="{
          'after:h-0.5 after:w-full after:absolute after:bg-primary-500 after:-bottom-0.5 after:left-0':
            filter.status === 'completed',
        }"
        @click="switchOrderStatusFilter('completed')"
      >
        Đã hoàn tất
      </button>
      <button
        type="button"
        class="relative py-2 flex-none"
        :class="{
          'after:h-0.5 after:w-full after:absolute after:bg-primary-500 after:-bottom-0.5 after:left-0':
            filter.status === 'canceled',
        }"
        @click="switchOrderStatusFilter('canceled')"
      >
        Đã hủy
      </button>
    </div>

    <div
      v-show="loading"
      class="py-10 text-default-500 gap-2 flex items-center justify-center"
    >
      <IconLoading /> Đang tải...
    </div>

    <div
      v-if="total > 0 && orders.data.length === 0 && !loading"
      class="flex justify-center p-10 bg-white gap-2 items-center text-default-500"
    >
      <div class="flex flex-col items-center gap-2">
        <div
          class="w-14 h-14 rounded-full bg-default-50 flex items-center justify-center"
        >
          <Icon name="ic:outline-search-off" class="w-8 h-8 text-default-400" />
        </div>
        <p class="font-semibold">Không tìm thấy kết quả nào.</p>
        <span class="text-sm"
          >Hãy kiểm tra lại bộ lọc để đảm bảo giá trị đúng với dự định.</span
        >
        <button
          type="button"
          class="btn btn-default mt-2"
          @click="resetFilter"
        >
          Làm mới
        </button>
      </div>
    </div>

    <div v-show="total > 0 && !loading && orders.data.length > 0">
      <div class="divide-y divide-default-500/10">
        <div
          v-for="order in orders.data"
          :key="order.id"
          class="py-7 flex items-center gap-7"
        >
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <NuxtLink class="link-primary font-bold" :to="{ name: 'orders-id', params: { id: order.id } }">
                {{ order.code }}
              </NuxtLink>
              <OrderStatusBadge :status="order.status" />
            </div>
            <p class="text-sm text-default-700 font-semibold">
              {{ $moment(order.created_at).format("DD/MM/YYYY HH:mm") }}
            </p>
            <span class="text-sm text-default-500 line-clamp-1">
              {{
                order.items
                  .map((item) => item.inventory.product.name)
                  .join(", ")
              }}
            </span>
            <div v-if="order.cancelable" class="mt-3">
              <button type="button" class="btn btn-transparent btn-sm" @click="cancelOrder(order)">
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
        <div class="text-default-700">
          {{ orders.meta.from }}-{{ orders.meta.to }} trên tổng
          {{ orders.meta.total }} bản ghi.
        </div>
        <Paginator class="ml-auto" :meta="orders.meta" :filter="filter" />
      </div>
    </div>

    <div class="py-10" v-show="total == 0 && !loading">
      <div
        class="rounded-full w-16 mb-5 h-16 mx-auto bg-transparent flex items-center justify-center border border-default-200"
      >
        <Icon
          name="heroicons:clipboard-document-list"
          v-if="filter.status === ''"
          class="w-9 h-9 text-default-200"
        />
        <Icon
          name="heroicons:arrow-path"
          v-else-if="filter.status === 'executing'"
          class="w-9 h-9 text-default-200"
        />
        <Icon
          name="heroicons:check"
          v-else-if="filter.status === 'completed'"
          class="w-9 h-9 text-default-200"
        />
        <Icon
          name="heroicons:x-mark"
          v-else-if="filter.status === 'canceled'"
          class="w-9 h-9 text-default-200"
        />
      </div>
      <div class="text-center w-96 mx-auto max-w-full">
        <p class="font-semibold text-default-700" v-if="filter.status === ''">
          Hãy tạo đơn hàng đầu tiên
        </p>
        <p
          class="font-semibold text-default-700"
          v-else-if="filter.status === 'executing'"
        >
          Chưa có đơn hàng nào đang thực hiện
        </p>
        <p
          class="font-semibold text-default-700"
          v-else-if="filter.status === 'completed'"
        >
          Chưa có đơn hàng nào đã hoàn thành
        </p>
        <p
          class="font-semibold text-default-700"
          v-else-if="filter.status === 'canceled'"
        >
          Chưa có đơn hàng nào đã hủy
        </p>

        <span v-if="filter.status === ''" class="text-sm text-default-500 block"
          >Trải nghiệm ngay dịch vụ mua sắm bách hóa trực tuyến của chúng
          tôi.</span
        >
        <NuxtLink
          :to="{ name: 'index' }"
          v-if="filter.status === ''"
          class="inline-block"
        >
          <button class="mx-auto mt-7 btn btn-transparent" type="button">
            <Icon name="tabler:telescope" /> Khám phá sản phẩm
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
