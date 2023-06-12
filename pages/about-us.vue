<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  middleware: ['optional-auth']
})

useHead({ title: 'Về chúng tôi' })
</script>

<template>
  <section>
    <div class="py-14 container mx-auto px-3">
      <Breadcrumb class="mb-7" :items="[
        {
          label: 'Về chúng tôi',
          to: { name: 'about-us' }
        }
      ]" />
      <nuxt-img src="./images/supermarket-branch-banner.jpeg" class="mb-7 rounded-lg" />
      <h1 class="text-4xl font-extrabold text-primary-500 mb-7">Doodle Việt Nam</h1>
      <p class="leading-7 tracking-wide mb-5 first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">Cửa hàng tiện lợi Doodle là một chuỗi cửa hàng tiện lợi được phát triển và điều hành bởi một công ty có tên Doodle. Cửa hàng tiện lợi Doodle cung cấp một loạt các sản phẩm và dịch vụ đa dạng để đáp ứng nhu cầu hàng ngày của khách hàng.</p>
      <p class="leading-7 tracking-wide mb-5">Cửa hàng tiện lợi Doodle được thiết kế nhằm mang đến sự tiện lợi và thoải mái cho khách hàng. Chúng thường có diện tích nhỏ và được đặt ở các vị trí thuận tiện, như khu dân cư, trung tâm thành phố, trạm xăng, hay trung tâm mua sắm. Điều này giúp người mua hàng dễ dàng tiếp cận với các sản phẩm cần thiết mà không cần phải đi xa.</p>
      <p class="leading-7 tracking-wide mb-5">Cửa hàng tiện lợi Doodle cung cấp một loạt các mặt hàng bao gồm thực phẩm, đồ uống, bánh kẹo, sản phẩm tắm rửa, đồ gia dụng, báo chí, sản phẩm điện tử nhỏ, đồ chơi và nhiều hơn nữa. Khách hàng có thể tìm thấy các mặt hàng cơ bản như thực phẩm tươi sống, gia vị, nước uống, bánh mì, sữa, đồ ăn nhanh và đồ uống đóng hộp.</p>
      <p class="leading-7 tracking-wide mb-5">Ngoài ra, cửa hàng tiện lợi Doodle cũng cung cấp các dịch vụ khác như nạp tiền điện thoại di động, thanh toán hóa đơn, bán vé xem phim, gửi hàng hóa và nhận hàng hóa, và dịch vụ ATM để tiện lợi cho khách hàng trong việc thực hiện các giao dịch hàng ngày.</p>
      <p class="leading-7 tracking-wide">Cửa hàng tiện lợi Doodle cam kết đáp ứng nhu cầu của khách hàng bằng cách cung cấp các sản phẩm và dịch vụ chất lượng, giá cả phải chăng và một môi trường mua sắm thuận tiện.</p>
    
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-7">
        <div class="flex flex-col gap-6 bg-default-50 shadow p-7 rounded-lg">
          <div
            class="rounded-lg mx-auto border-2 border-primary-500 flex-none w-12 shadow-sm shadow-primary-500/[0.12] h-12 bg-primary-50 relative flex items-center justify-center"
          >
            <Icon name="heroicons:banknotes" class="w-8 h-8 text-primary-500" />
          </div>
          <div class="flex flex-col gap-2 grow text-default-700 leading-6">
            <h3 class="font-bold text-center">Giá cả thị trường</h3>
            <p class="text-justify text-sm">
              Chúng tôi cam kết sản phẩm có giá bằng với giá thị trường, nếu không
              sẽ hoàn tiền và bù với số tiền chênh lệch.
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-6 bg-default-50 shadow p-7 rounded-lg">
          <div
            class="rounded-lg mx-auto border-2 border-primary-500 flex-none w-12 shadow-sm shadow-primary-500/[0.12] h-12 bg-primary-50 relative flex items-center justify-center"
          >
            <Icon name="heroicons:check-badge" class="w-8 h-8 text-primary-500" />
          </div>
          <div class="flex flex-col gap-2 grow text-default-700 leading-6">
            <h3 class="font-bold text-center">Chất lượng & đa dạng</h3>
            <p class="text-sm text-justify">
              Các sản phẩm chúng tôi cung cấp luôn đảm bảo chất lượng và đa dạng
              hóa mặt hàng để tăng sự lựa chọn cho quý khách hàng.
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-6 bg-default-50 shadow p-7 rounded-lg">
          <div
            class="rounded-lg border-2 mx-auto border-primary-500 flex-none w-12 shadow-sm shadow-primary-500/[0.12] h-12 bg-primary-50 relative flex items-center justify-center"
          >
            <Icon name="heroicons:truck" class="w-8 h-8 text-primary-500" />
          </div>
          <div class="flex flex-col gap-2 grow text-default-700 leading-6">
            <h3 class="font-bold text-center">Giao hàng tận nơi</h3>
            <p class="text-justify text-sm">
              Với địa chỉ cụ thể cung cấp, nhân viên giao hàng Doodle sẽ giao tận
              tay đến cho quý khách hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <MainFooter />
</template>
