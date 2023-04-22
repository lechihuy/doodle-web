<script lang="ts" setup>
definePageMeta({
  layout: 'personal',
  middleware: ['auth'],
})

useHead({ title: 'Đơn hàng của tôi' })

const currentCustomer = useCurrentCustomer()
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light mb-1">Đơn hàng của tôi</h1>
    <p class="text-default-500 text-light text-sm">
      Bao gồm các thông tin cơ bản của khách hàng
    </p>
    <div class="divide-y divide-default-500/10 mt-7 border-t border-default-500/10">
      <div class="py-7 flex flex-col gap-2">
        <label for="full_name" class="w-36 font-semibold">Họ tên</label>
        
      </div>
      <div class="py-7 flex flex-col gap-2">
        <label for="gender" class="w-36 font-semibold">Giới tính</label>
       
      </div>
    </div>
  </div>
</template>