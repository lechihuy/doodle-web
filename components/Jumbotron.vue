<script lang="ts" setup>
const { data: randomProducts } = await useAsyncData<any>(
  "randomProducts",
  async () => (await useIndexProductLensApi(PRODUCT_LENS.random)).data.data
);

const currentCustomer = useCurrentCustomer();
</script>

<template>
  <div
    class="jumbotron relative bg-bottom bg-no-repeat bg-default-50 -mt-24 pt-44 pb-20"
  >
    <div
      class="absolute inset-0 bg-grid-default-900 bg-[bottom_1px_center]"
      style="
        mask-image: linear-gradient(to bottom, transparent, black);
        -webkit-mask-image: linear-gradient(to bottom, transparent, black);
      "
    ></div>

    <div
      class="grid grid-cols-1 lg:grid-cols-2 container mx-auto px-3 relative gap-10 content-center mb-20"
    >
      <div
        class="flex flex-col gap-7 place-content-center text-center lg:text-left"
      >
        <h1
          class="text-default-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight"
        >
          Mở rộng thế giới <br> mua sắm của bạn
        </h1>
        <p class="text-lg text-default-700">
          Mua sắm tạp hóa trực tuyến dễ dàng và tiện lợi hơn bao giờ hết, chúng
          tôi tin tưởng rằng sự tiện lợi và chất lượng sẽ làm hài lòng các bạn.
        </p>
        <div class="flex items-center justify-center lg:justify-start gap-2">
          <NuxtLink :to="{ name: 'products' }" class="btn btn-primary btn-large flex-none">
            Khám phá <span class="hidden xs:inline-block">sản phẩm</span>
            <Icon name="heroicons:arrow-right" class="w-4 h-4" />
          </NuxtLink>

          <MagicButton v-if="currentCustomer">
            <NuxtLink
              :to="{ name: 'profile' }"
              class="btn btn-transparent btn-large flex-none"
            >
              <span class="hidden xs:inline-block">Đi tới hồ sơ</span>
              <span class="xs:hidden">Hồ sơ</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </MagicButton>
          <MagicButton v-else>
            <NuxtLink
              class="btn btn-transparent btn-large flex-none"
              :to="{ name: 'login' }"
            >
              <span class="hidden xs:inline-block">Trở thành khách hàng</span>
              <span class="xs:hidden">Khách hàng</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </MagicButton>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.jumbotron {
  @apply bg-[url(https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg)] 
    bg-[length:140rem]
    sm:bg-[length:135rem]
    md:bg-[length:94rem]
    lg:bg-[length:90rem];
}
</style>