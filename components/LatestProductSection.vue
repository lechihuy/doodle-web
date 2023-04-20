<script lang="ts" setup>
const { data: latestProducts } = await useAsyncData<any>('latestProducts', 
  async () => (await useIndexProductsApi(
    { limit: 5 }, 
    { created_at: 'desc' }
  )).data.data
)
</script>

<template>
  <section class="mx-auto px-3 py-20 relative border-t border-slate-900/[0.07] mt-10">
    <img src="/images/beams-login.jpg" class="absolute inset-0 w-full max-w-none" />

    <div class="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom,white,transparent)]">
      <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-bg"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
            x="100%"
            patternTransform="translate(0 -1)"
          >
            <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
      </svg>
    </div>

    <div class="container mx-auto flex flex-col lg:flex-row gap-10 items-start">
      <div class="order-last grow max-h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-10 relative xl:translate xl:-translate-y-[calc(theme(space.32)_-_theme(space.2))] xl:pt-32">
        <div class="md:col-span-2 lg:col-span-1 xl:col-span-2 flex flex-col gap-3 xl:gap-6">
          <h3 class="font-extrabold text-3xl xl:text-4xl">Lorem ipsum dolor sit amet.</h3>
          <p class="text-default-700 leading-7 text-md xl:text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates in id recusandae omnis officiis laborum odit soluta aut et voluptatibus veniam at veritatis repudiandae provident, facilis sit rem velit facere!</p>
        </div>
        
        <div class="flex xl:flex-col items-start gap-6">
          <div class="rounded-lg border-2 border-primary-500 flex-none w-16 h-16 shadow-sm shadow-primary-500/[0.12] bg-primary-50 relative flex items-center justify-center">
            <Icon name="heroicons:archive-box" class="w-10 h-10 text-primary-500" />
          </div>
          <div class="flex flex-col gap-2 grow text-default-700 leading-6">
            <h3 class="font-extrabold text-xl xl:text-2xl">+1000 sản phẩm</h3>
            <p class="text-default-700 leading-7">Cập nhật liên tục những mặt hàng mới theo thị trường cùng với số lượng nhập hoàng khổng lồ.</p>
          </div>
        </div>

        <div class="flex xl:flex-col items-start gap-6">
          <div class="rounded-lg border-2 border-primary-500 flex-none w-16 h-16 shadow-sm shadow-primary-500/[0.12] bg-primary-50 relative flex items-center justify-center">
            <Icon name="heroicons:tag" class="w-10 h-10 text-primary-500" />
          </div>
          <div class="flex flex-col gap-2 grow text-default-700 leading-6">
            <h3 class="font-extrabold text-xl xl:text-2xl">+100 loại hàng hóa</h3>
            <p class="text-default-700 leading-7">Đa dạng hóa những mặt hàng nhằm đáp ứng yêu cầu của khách hàng.</p>
          </div>
        </div>

        <div class="flex xl:flex-col items-start gap-6">
          <div class="rounded-lg border-2 border-primary-500 flex-none w-16 h-16 shadow-sm shadow-primary-500/[0.12] bg-primary-50 relative flex items-center justify-center">
            <Icon name="heroicons:banknotes" class="w-10 h-10 text-primary-500" />
          </div>
          <div class="flex flex-col gap-2 grow text-default-700 leading-6">
            <h3 class="font-extrabold text-xl xl:text-2xl">Giá cả cạnh tranh</h3>
            <p class="text-default-700 leading-7">Giá sản phẩm cạnh tranh thị trường, cam kết hoàn tiền và bù với số tiền chênh lệch.</p>
          </div>
        </div>

        <div class="flex xl:flex-col items-start gap-6">
          <div class="rounded-lg border-2 border-primary-500 flex-none w-16 h-16 shadow-sm shadow-primary-500/[0.12] bg-primary-50 relative flex items-center justify-center">
            <Icon name="heroicons:check-badge" class="w-10 h-10 text-primary-500" />
          </div>
          <div class="flex flex-col gap-2 grow text-default-700 leading-6">
            <h3 class="font-extrabold text-xl xl:text-2xl">Nguồn gốc chất lượng</h3>
            <p class="text-default-700 leading-7">Sản phẩm được nhập từ các nhà cung cấp uy tín hàng đầu Việt Nam.</p>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-[36rem] flex-none relative order-first lg:order-last -mb-[calc(theme(space.32)_-_theme(space.2))] translate -translate-y-[calc(theme(space.32)_-_theme(space.2))] bg-[radial-gradient(164.75%_100%_at_50%_0%,#334155_0%,#0F172A_48.73%)] p-5 sm:p-10 shadow-lg rounded-3xl">
       
        <div class="flex items-center">
          <div class="rounded-full w-14 h-14 flex-none flex items-center justify-center border-2 border-primary-500">
            <Icon name="heroicons:beaker" class="w-8 h-8 text-primary-500" />
          </div>
          <div class="ml-4">
            <h2 class="text-2xl font-semibold leading-7 text-white">
              Sản phẩm mới nhất
            </h2>
            <p class="text-sm text-slate-400">
              Luôn được cập nhật liên tục theo thị trường
            </p>
          </div>
        </div>
        
        <div class="flex flex-col gap-3 mt-7">
          <div v-for="product in latestProducts" :key="product.id" class="bg-slate-700/25 ring-1 ring-slate-700/50 rounded-2xl flex items-center">
            <nuxt-img :src="product.thumbnail.url" class="w-28 h-28" />
            
            <div class="flex flex-col gap-3 px-7">
              <NuxtLink class="text-white/90 line-clamp-2">
                {{ product.name }}
              </NuxtLink>
              <p class="font-bold text-primary-500">{{ currency(product.sale_price) }}</p>
            </div>
          </div>

          <div class="inset-x-0 bottom-0 flex justify-center rounded-b-2xl bg-gradient-to-t from-black pt-32 pb-8 pointer-events-none absolute">
            <MagicButton>
              <button type="button" class="relative btn btn-transparent backdrop-blur-lg border-none bg-white/80 pointer-events-auto">
                Xem thêm
              </button>
            </MagicButton>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>