<script lang="ts" setup>
definePageMeta({
  layout: 'personal',
  middleware: ['auth'],
})

useHead({ title: 'Sổ địa chỉ' })

const { data: total } = await useAsyncData<any>('total',
  async () => (await useCountAddressMetricApi('total')).data.data.value
)

const { data: addresses } = await useAsyncData<any>('addresses',
  async () => (await useIndexAddressApi({ limit: 5 })).data.data 
)
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light mb-1">Sổ địa chỉ</h1>
    <p class="text-default-500 text-light text-sm">
      Giúp bạn có thể chọn địa chỉ giao hàng một cách nhanh chóng. Mỗi tài khoản được tạo tối đa 5 địa chỉ.
    </p>

    <template v-if="total > 0">
      <div class="divide-y divide-default-500/10 mt-7">
        <div 
          v-for="address in addresses" 
          :key="address.id"
          class="py-7 flex items-center gap-5"
        >
          <div class="flex flex-col gap-1">
            <div>
              <NuxtLink :to="{ name: 'addresses-id', params: { id: address.id } }" class="link-primary font-bold">
                {{ address.name }}
              </NuxtLink>
            </div>
            <p class="text-sm text-default-700">{{ address.shortcut_full_address }}</p>
          </div>
          <div class="flex items-center gap-5 ml-auto">
            <Icon name="heroicons:star" class="w-6 h-6 text-default-500 hover:text-default-900" />

            <NuxtLink :to="{ name: 'addresses-id-edit', params: { id: address.id } }">
              <Icon name="heroicons:pencil-square" class="w-6 h-6 text-default-500 hover:text-default-900" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-if="total < 5" class="flex items-center justify-center">
        <NuxtLink :to="{ name: 'addresses-create' }" class="mx-auto mt-7 btn btn-transparent">
          <Icon name="heroicons:plus" /> Thêm địa chỉ
        </NuxtLink>
      </div>
    </template>

    <div class="py-10" v-else>
      <div class="rounded-full w-16 mb-5 h-16 mx-auto bg-transparent flex items-center justify-center border border-default-200">
        <Icon name="heroicons:map-pin" class="w-9 h-9 text-default-200" />
      </div>
      <div class="text-center w-96 mx-auto max-w-full">
        <p class="font-semibold text-default-700">Hãy tạo địa chỉ đầu tiên</p>
        <span class="text-sm text-default-500 block">Việc này giúp bạn có thể đặt đơn hàng tới nơi mà bạn muốn nhận.</span>
        <NuxtLink :to="{ name: 'addresses-create' }" class="inline-block">
          <button class="mx-auto mt-7 btn btn-primary" type="button">
            <Icon name="heroicons:plus" /> Tạo ngay
          </button>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>