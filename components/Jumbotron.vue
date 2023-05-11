<script lang="ts" setup>
const { data: randomProducts } = await useAsyncData<any>(
  "randomProducts",
  async () => (await useIndexProductLensApi(PRODUCT_LENS.random)).data.data
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
      class="grid grid-cols-1 lg:grid-cols-2 container mx-auto px-3 relative gap-10 content-center mb-20"
    >
      <div
        class="flex flex-col gap-7 place-content-center text-center lg:text-left"
      >
        <h1
          class="text-default-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight"
        >
          Mở rộng thế giới mua sắm của bạn
        </h1>
        <p class="text-lg text-default-700">
          Mua sắm tạp hóa trực tuyến dễ dàng và tiện lợi hơn bao giờ hết, chúng
          tôi tin tưởng rằng sự tiện lợi và chất lượng sẽ làm hài lòng các bạn.
        </p>
        <div class="flex items-center justify-center lg:justify-start gap-2">
          <NuxtLink class="btn btn-primary btn-large flex-none">
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

      <!-- <div class="flex-col flex relative self-center overflow-hidden">
        <div class="relative py-2.5">
          <div
            class="absolute inset-x-0 top-0 h-px bg-default-500/20 [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
          ></div>
          <div
            class="absolute inset-x-0 bottom-0 h-px bg-default-500/20 [mask-image:linear-gradient(to_left,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
          ></div>
          <div
            class="absolute bottom-full left-32 -mb-[2px] flex h-8 items-end overflow-hidden"
          >
            <div class="flex -mb-px h-[2px] w-56">
              <div
                class="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"
              ></div>
              <div
                class="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"
              ></div>
            </div>
          </div>

          <Marquee
            class="transform"
            item-height="36"
            item-width="36"
            :item-length="randomProducts.length"
            item-gap="2"
          >
            <div
              v-for="product in randomProducts"
              :key="product.id"
              class="item w-36 h-36 flex-none"
            >
              <nuxt-img
                :src="product.thumbnail.url"
                class="rounded-lg border border-default-300/30 bg-white/80"
              />
            </div>
          </Marquee>
        </div>
      </div> -->
    </div>

    <!-- <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 container mx-auto px-3">
      <div class="flex items-start gap-6">
        <div
          class="rounded-lg border-2 border-primary-500 flex-none w-12 shadow-sm shadow-primary-500/[0.12] h-12 bg-primary-50 relative flex items-center justify-center"
        >
          <Icon name="heroicons:banknotes" class="w-8 h-8 text-primary-500" />
        </div>
        <div class="flex flex-col gap-2 grow text-default-700 leading-6">
          <h3 class="font-bold">Giá cả thị trường</h3>
          <p>
            Chúng tôi cam kết sản phẩm có giá bằng với giá thị trường, nếu không
            sẽ hoàn tiền và bù với số tiền chênh lệch.
          </p>
        </div>
      </div>

      <div class="flex items-start gap-6">
        <div
          class="rounded-lg border-2 border-primary-500 flex-none w-12 shadow-sm shadow-primary-500/[0.12] h-12 bg-primary-50 relative flex items-center justify-center"
        >
          <Icon name="heroicons:check-badge" class="w-8 h-8 text-primary-500" />
        </div>
        <div class="flex flex-col gap-2 grow text-default-700 leading-6">
          <h3 class="font-bold">Sản phẩm chất lượng & đa dạng</h3>
          <p>
            Các sản phẩm chúng tôi cung cấp luôn đảm bảo chất lượng và đa dạng
            hóa mặt hàng để tăng sự lựa chọn cho quý khách hàng.
          </p>
        </div>
      </div>

      <div class="flex items-start gap-6">
        <div
          class="rounded-lg border-2 border-primary-500 flex-none w-12 shadow-sm shadow-primary-500/[0.12] h-12 bg-primary-50 relative flex items-center justify-center"
        >
          <Icon name="heroicons:truck" class="w-8 h-8 text-primary-500" />
        </div>
        <div class="flex flex-col gap-2 grow text-default-700 leading-6">
          <h3 class="font-bold">Giao hàng tận nơi</h3>
          <p>
            Với địa chỉ cụ thể cung cấp, nhân viên giao hàng Doodle sẽ giao tận
            tay đến cho quý khách hàng.
          </p>
        </div>
      </div>
    </div> -->
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