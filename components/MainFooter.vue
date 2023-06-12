<template>  
  <footer class="bg-default-800 py-10 sticky top-[100vh]">
    <div class="container mx-auto p-3">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-20">
        <div class="flex flex-col gap-5 text-default-100">
          <NuxtLink
            :to="{ name: 'index' }"
            class="inline-flex items-center gap-2"
          >
            <Logo />
            <span class="text-xl font-mono font-semibold text-default-100">Doodle</span>
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
            <NuxtLink class="hover:underline" :to="{ name: 'about-us' }">
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

        <div class="flex flex-col text-default-100 gap-5 text-sm">
          <h3 class="font-extrabold">Điều khoản</h3>
          <nav class="flex flex-col gap-2">
            <NuxtLink class="hover:underline" :to="{ name: 'terms-of-use' }">
              Điều khoản sử dụng
            </NuxtLink>
            <NuxtLink class="hover:underline" :to="{ name: 'privacy-policy' }">
              Chính sách bảo mật
            </NuxtLink>
          </nav>
        </div>

        <div class="flex xl:justify-end">
          <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdoodlevn.xyz&tabs&small_header=false&hide_cover=false&show_facepile=false&appId&hide_cta=true&lazy=true&width=300" style="border:none;" scrolling="no" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
      </div>
    </div>   
    <div class="container mx-auto px-3 mt-10 text-default-100 text-xs">
      <div class="border-t border-default-900/30 py-3">
        Bản quyền thuộc Doodlevn &copy; 2023.
      </div>
    </div>
  </footer>
</template>