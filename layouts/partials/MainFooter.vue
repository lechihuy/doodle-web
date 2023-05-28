<template>
  <footer class="bg-default-800 py-20">
    <div class="container mx-auto p-3">
      <div class="grid grid-cols-3 gap-20">
        <div class="flex flex-col gap-5 text-default-100">
          <NuxtLink
            :to="{ name: 'index' }"
            class="inline-flex items-center gap-2"
          >
            <Logo />
            <span class="text-xl hidden sm:inline-block font-mono font-semibold text-default-100">Doodle</span>
          </NuxtLink>
          <div class="flex flex-col gap-1 text-xs">
            <p>Công ty cổ phần thương mại dịch vụ Doodle</p>
            <p>Địa chỉ: 86-88 Cao Thắng, phường 04, quận 3, tp. Hồ Chí Minh</p>
            <p>Điện thoại: (028) 7107 8079</p>
            <p>Email: doodle.bot.2023@gmail.com</p>
          </div>
        </div>

        <div class="flex flex-col text-default-100 gap-5 text-sm">
          <h3 class="font-extrabold">Giới thiệu</h3>
          <nav class="flex flex-col gap-2">
            <NuxtLink class="hover:underline">
              Về chúng tôi
            </NuxtLink>
            <NuxtLink class="hover:underline" :to="{ name: 'products' }">
              Sản phẩm
            </NuxtLink>
            <NuxtLink class="hover:underline" :to="{ name: 'branches' }">
              Cửa hàng
            </NuxtLink>
            <a href="/#!" class="hover:underline" >
              Ưu đãi
            </a>
          </nav>
        </div>

        
      </div>
    </div>   
  </footer>
</template>