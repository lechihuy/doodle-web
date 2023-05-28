<script lang="ts" setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const { $axios } = useNuxtApp()

const { data: meta } = await useAsyncData<any>(
  "meta",
  async () => (await $axios.get(`public/meta`)).data.data
);

const currentCustomer = useCurrentCustomer();
</script>

<template>
  <div
    class="jumbotron relative bg-bottom bg-no-repeat bg-default-50 -mt-16 pt-36 pb-20"
  >
    <div
      class="absolute inset-0 bg-grid-default-900 bg-[bottom_1px_center]"
      style="
        mask-image: linear-gradient(to bottom, transparent, black);
        -webkit-mask-image: linear-gradient(to bottom, transparent, black);
      "
    ></div>

    <div
      class="flex flex-col lg:flex-row container mx-auto px-3 relative gap-10 items-center"
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
        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
          <NuxtLink :to="{ name: 'products' }" class="btn btn-primary btn-large block w-full sm:inline-block sm:w-auto">
            Khám phá sản phẩm
            <Icon name="heroicons:arrow-right" class="w-4 h-4" />
          </NuxtLink>

          <MagicButton v-if="currentCustomer" class="block w-full sm:inline-block sm:w-auto">
            <NuxtLink
              :to="{ name: 'profile' }"
              class="btn btn-transparent btn-large"
            >
              <span class="">Đi tới hồ sơ</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </MagicButton>
          <MagicButton v-else class="block w-full sm:inline-block sm:w-auto">
            <NuxtLink
              class="btn btn-transparent btn-large"
              :to="{ name: 'login' }"
            >
              <span class="">Trở thành khách hàng</span>
              <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </MagicButton>
        </div>
      </div>
      
      <Carousel class="w-full rounded-lg overflow-hidden shadow-xl" :pauseAutoplayOnHover="true" :autoplay="2000" :wrap-around="true" :mouse-drag="false" :touch-drag="false">
        <Slide v-for="voucher in meta.available_vouchers" :key="voucher.id">
          <NuxtLink :to="{ name: 'products' }" class="block h-full w-full">
            <nuxt-img :src="voucher.thumbnail.url" class="h-full w-full object-contain" />
          </NuxtLink>
        </Slide>
        <template #addons="{ slidesCount }">
          <Pagination />
          <Navigation v-if="slidesCount > 1" />
        </template>
      </Carousel>
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