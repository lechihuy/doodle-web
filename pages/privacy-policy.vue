<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  middleware: ['optional-auth']
})

useHead({ title: 'Chính sách bảo mật' })
</script>

<template>
  <section>
    <div class="py-14 container mx-auto px-3">
      <Breadcrumb class="mb-7" :items="[
        {
          label: 'Chính sách bảo mật',
          to: { name: 'privacy-policy' }
        }
      ]" />
      <h1 class="text-4xl font-extrabold text-primary-500 mb-7">Chính sách bảo mật</h1>
      
      <div class="mb-7">
        <h3 class="font-bold text-primary-600">1. MỤC ĐÍCH VÀ PHẠM VI THU THẬP THÔNG TIN</h3>
        <p>Nhằm mục đích giới thiệu sản phẩm/dịch vụ và tuyển dụng nhân sự của Doodle Việt Nam, các thông tin cá nhân cần thiết của bạn như họ và tên, địa chỉ thư điện tử, số điện thoại, địa chỉ sẽ được Doodle Việt Nam thu thập.</p>
        <p>Chúng tôi chỉ thu thập thông tin cá nhân khi bạn đồng ý cung cấp. Nếu bạn không đồng ý với việc cung cấp thông tin cá nhân, bạn sẽ không được phép tham gia vào các hoạt động hay sử dụng các chức năng cần cung cấp thông tin trên trang web của chúng tôi.</p>
        <p>Ngoài ra, Doodle Việt Nam sẽ thu thập thông tin về số lần viếng thăm, số trang bạn xem, số links (liên kết) bạn truy cập và những thông tin khác liên quan đến việc kết nối của bạn đến trang web của chúng tôi.</p>
      </div>
      
      <div class="mb-7">
        <h3 class="font-bold text-primary-600">2. CAM KẾT VÀ PHẠM VI SỬ DỤNG THÔNG TIN</h3>
        <p>Doodle Việt Nam xác nhận trách nhiệm bảo mật thông tin cá nhân cũng như tầm quan trọng của việc duy trì sự an toàn và quyền riêng tư cho bạn. Bằng việc cung cấp thông tin, bạn đã đồng ý tuân thủ các điều khoản được mô tả trong Chính Sách Bảo Mật này.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">3. NHỮNG NGƯỜI HOẶC TỔ CHỨC CÓ THỂ ĐƯỢC TIẾP CẬN VỚI THÔNG TIN</h3>
        <p>Doodle Việt Nam có thể sử dụng và chia sẻ thông tin với các công ty con, công ty chi nhánh thuộc sở hữu của Doodle Việt Nam. Việc sử dụng thông tin này cũng đều tuân thủ và ràng buộc theo chính sách của Doodle Việt Nam nêu trên. Chúng tôi không bán, chuyển nhượng hoặc tiết lộ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào khác.</p>
        <p>Tuy nhiên, với sự cho phép của bạn, Doodle Việt Nam có thể sẽ thay mặt các đối tác kinh doanh của chúng tôi gửi thông tin về sản phẩm/dịch vụ hoặc quảng cáo của đơn vị đó đến bạn. Chúng tôi đảm bảo không chia sẻ cho họ thông tin cá nhân của bạn.</p>
        <p>Doodle Việt Nam bảo lưu quyền sử dụng hoặc có thể tiết lộ bất kỳ thông tin nào nếu cần thiết để hỗ trợ yêu cầu từ phía bạn, hoặc trong bất kỳ cuộc điều tra khi có liên quan đến pháp luật.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">4. THỜI GIAN LƯU TRỮ THÔNG TIN</h3>
        <p>Thông tin cá nhân của bạn sẽ được lưu trữ kể từ lúc bạn hoàn tất điền thông tin trên các trang đòi hỏi bạn cung cấp thông tin này cho đến khi bạn yêu cầu huỷ bỏ.</p>
        <p>Bạn cần lưu ý rằng việc truyền tải thông tin qua Internet không hoàn toàn là an toàn. Khi chúng tôi nhận được thông tin của bạn, chúng tôi sẽ áp dụng các tính năng bảo mật nghiêm ngặt để ngăn chặn truy cập trái phép từ các tác nhân bên ngoài. Tuy nhiên chúng tôi không thể đảm bảo tính bảo mật của dữ liệu được truyền đến trang của chúng tôi; bất cứ sự truyền tải nào cũng có thể có rủi ro cho thông tin của bạn.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">5. TRÁCH NHIỆM CỦA NGƯỜI DÙNG</h3>
        <p>Bạn có trách nhiệm cung cấp thông tin đầy đủ và chính xác theo biểu mẫu có sẵn. Bạn sẽ tự chịu trách nhiệm về sự chính xác và trung thực của thông tin mà mình cung cấp. Ngoài ra, bạn có trách nhiệm thông báo kịp thời cho chúng tôi qua các kênh liên lạc được cung cấp khi nhận thấy dấu hiệu của hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, tên đăng ký và mật khẩu của mình để có biện pháp giải quyết phù hợp.</p>
        <p>Trang web của chúng tôi có thể chứa các liên kết đến các đối tác của chúng tôi. Nếu bạn theo liên kết đến bất kỳ trang web nào trong số những trang web này, xin lưu ý rằng các trang web này có chính sách bảo mật riêng và chúng tôi không chấp nhận bất kỳ trách nhiệm hoặc nghĩa vụ nào đối với các chính sách này. Vui lòng kiểm tra các chính sách này trước khi bạn gửi bất kỳ dữ liệu cá nhân nào đến các trang web này.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">6. CƠ CHẾ TIẾP NHẬN VÀ GIẢI QUYẾT KHIẾU NẠI CỦA NGƯỜI TIÊU DÙNG LIÊN QUAN ĐẾN VIỆC THÔNG TIN CÁ NHÂN BỊ SỬ DỤNG SAI MỤC ĐÍCH, PHẠM VI ĐÃ THÔNG BÁO</h3>
        <p>Chúng tôi cam kết sẽ đảm bảo an toàn cho thông tin cá nhân của quý khách hàng, tuyệt đối không mua bán, trao đổi thông tin khách hàng với bên thứ 3 vì mục đích thương mại. Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân khách hàng, chúng tôi sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho khách hàng được biết.</p>
        <p>Khi phát hiện thông tin cá nhân của mình bị sử dụng sai mục đích hoặc phạm vi, bạn có thể yêu cầu giải quyết khiếu nại liên quan đến thông tin cá nhân và cung cấp chứng cứ liên quan tới vụ việc của mình thông qua tổng đài hỗ trợ 1900 3110 (giờ hoạt động: 07:00 – 22:00, Thứ 2 đến Chủ Nhật). Chúng tôi cam kết sẽ phản hồi ngay lập tức hoặc muộn nhất là trong vòng 3 ngày làm việc (trừ thứ 7 và chủ nhật) kể từ thời điểm nhận được khiếu nại.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">7. THAY ĐỔI VỀ CHÍNH SÁCH</h3>
        <p>Doodle Việt Nam có thể thay đổi một số thông tin trong chính sách bảo mật này trong trường hợp cần thiết, tuy nhiên chúng tôi đảm bảo bất kỳ sửa đổi nào cũng sẽ không đi ngược lại cam kết của Doodle Việt Nam về việc thu thập và bảo vệ quyền riêng tư của bạn. Bản sửa đổi sẽ được cập nhật tại đây.</p>
      </div>
    </div>
  </section>

  <MainFooter />
</template>
