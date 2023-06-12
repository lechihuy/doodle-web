<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  middleware: ['optional-auth']
})

useHead({ title: 'Điều khoản sử dụng' })
</script>

<template>
  <section>
    <div class="py-14 container mx-auto px-3">
      <Breadcrumb class="mb-7" :items="[
        {
          label: 'Điều khoản sử dụng',
          to: { name: 'terms-of-use' }
        }
      ]" />
      <h1 class="text-4xl font-extrabold text-primary-500 mb-7">Điều khoản sử dụng</h1>

      <p>Việc sử dụng trang web https://doodlevn.xyz và việc kinh doanh những sản phẩm hoặc dịch vụ được quản lý bởi các điều khoản, điều kiện và quy định như bên dưới (“Thỏa thuận” hoặc “Điều khoản sử dụng”). Vui lòng đọc kĩ điều khoản sử dụng này trước khi truy cập và tuân thủ các chính sách cũng như quy trình của trang web. Việc sử dụng website có nghĩa rằng bạn đã đồng ý với các điều khoản, điều kiện và quy định như bên dưới của chúng tôi.</p>
      <p>Nếu bạn không đồng ý với các điều khoản, điều kiện của Thỏa thuận này, chúng tôi khuyên bạn nên ngừng sử dụng website. Ngược lại, bạn được xem như đã chấp thuận với các điều khoản, điều kiện của Thỏa thuận này. Ngoài ra, nếu bạn vẫn tiếp tục sử dụng website sau khi Thỏa thuận trên được thay đổi (bao gồm thay đổi về chính sách và quy trình), đồng nghĩa với việc bạn đã đồng ý với những sự thay đổi trên.</p>
      
      <div class="mb-7 mt-7">
        <h3 class="font-bold text-primary-600">1. ĐIỀU KHOẢN CHUNG</h3>
        <p>Công ty CP Doodle Việt Nam có quyền thay đổi Điều khoản sử dụng này cũng như các chính sách, quy trình của website vào bất cứ lúc nào. Bạn phải đảm bảo rằng mục đích bạn sử dụng website là hợp pháp. Các thông tin sau đây sẽ không được phép đăng hoặc truyền tải nếu: 1) vi phạm dưới bất cứ hình thức nào liên quan đến quyền sở hữu trí tuệ và tài sản của người khác; 2) vi phạm pháp luật, đe dọa, lạm dụng, bôi nhọ hoặc xâm hại đến quyền riêng tư của người khác, mang tính chất thô tục, khiêu dâm, không đứng đắn hoặc gây khó chịu cho người khác; và 3) kích động dẫn đến phạm tội, bị truy cứu trách nhiệm dân sự hoặc các hành vi vi phạm pháp luật khác.</p>
        <p>Ngoài ra, bạn đã đồng ý rằng bạn không thực hiện, hoặc gián tiếp thực hiện bất cứ hành vi nào, mà dưới đánh giá của Doodle Việt Nam, là hạn chế hoặc cản trở người khác sử dụng website, cũng như sản phẩm và dịch vụ của chúng tôi. Doodle Việt Nam có thể tiết lộ thông tin của bạn trong trường hợp pháp luật yêu cầu. Chỉ có Doodle Việt Nam mới có quyền đăng tải nội dung quảng cáo hoặc thương mại.</p>
      </div>
      
      <div class="mb-7">
        <h3 class="font-bold text-primary-600">2. NGHIÊM CẤM VÀ QUYỀN SỞ HỮU</h3>
        <p>Website này được sở hữu và điều hành bởi Doodle Việt Nam. Tất cả nội dung trên trang web này, bao gồm, nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng, hình ảnh và phần mềm, đều thuộc quyền sở hữu độc quyền của Doodle Việt Nam hoặc chủ sở hữu nội dung trên và được bảo vệ theo luật bản quyền của Việt Nam. Việc soạn thảo tất cả các nội dung, bao gồm giao diện của trang web, đều thuộc quyền sở hữu của Doodle Việt Nam và được bảo vệ bởi luật bản quyền của Việt Nam. Tất cả phần mềm được sử dụng trên website thuộc sở hữu của Doodle Việt Nam hoặc của các nhà cung cấp phần mềm đó và cũng được bảo vệ bởi luật bản quyền Việt Nam. Bạn chỉ được phép sử dụng nội dung và phần mềm trên trang web này cho mục đích duyệt web hoặc đặt hàng trên trang web. Bất kỳ việc sử dụng cho mục đích khác bao gồm sửa đổi, phân phối, truyền tải, tái bản, trưng bày, loại bỏ hoặc xóa nội dung trên trang web này, toàn bộ hoặc một phần, đều bị nghiêm cấm.</p>
        <p>doodlevn.xyz” là một kênh thông tin dịch vụ của Doodle Việt Nam. Việc sử dụng bất kỳ nhãn hiệu hoặc thương hiệu Doodle Việt Nam mà không có sự đồng ý bằng văn bản của Doodle Việt Nam đều bị nghiêm cấm. Tất cả các nhãn hiệu khác hoặc thương hiệu khác đều thuộc quyền của chủ sở hữu tương ứng.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">3. MIỄN TRỪ TRÁCH NHIỆM BẢO HÀNH; HẠN CHẾ VỀ TRÁCH NHIỆM PHÁP LÍ</h3>
        <p>Doodle Việt Nam không bảo đảm dưới bất kì hình thức nào, một cách rõ ràng hay hàm ý, bao gồm nhưng không giới hạn, về tính thương mại của bất kì hàng hóa hoặc sản phẩm nào. Doodle Việt Nam không chịu trách nhiệm về tổn thất hoặc thiệt hại cho người hoặc tài sản phát sinh ngoài Thỏa thuận này, trừ khi tổn thất hoặc thiệt hại đó là do sơ suất hoặc là hành vi có chủ ý của Doodle Việt Nam. Doodle Việt Nam không chịu trách nhiệm (trong hợp đồng, khế ước) cho trường hợp đặc biệt, gián tiếp hoặc ngẫu nhiên hoặc do hậu quả liên quan đến Thỏa thuận này hoặc phát sinh ngoài trách nhiệm đó. Bạn cũng phải xác nhận rằng sự thiếu trách nhiệm này bao gồm thiếu trách nhiệm đối với bất kỳ tổn thất hoặc thiệt hại cho người hoặc tài sản hoặc thiệt hại thật sự hoặc dự phỏng về lợi nhuận. Doodle Việt Nam không cho phép bất kỳ đại diện hoặc cá nhân nào thay mặt Doodle Việt Nam thực hiện bất kỳ thỏa thuận, tuyên bố hay bảo đảm đối với bất kỳ hàng hóa hoặc sản phẩm.</p>
        <p>Doodle Việt Nam cố gắng để đảm bảo rằng các thông tin và tài liệu trên trang Web này là hiện hành và chính xác. Doodle Việt Nam không đưa ra tuyên bố hoặc bảo đảm về tính chính xác, độ tin cậy và đầy đủ của thông tin, văn bản, đồ họa, liên kết hoặc các mặt hàng khác có trên trang web. Doodle Việt Nam được miễn trừ trách nhiệm cho bất kỳ sai sót hoặc thiếu sót trong thông tin và tài liệu trên trang web. Doodle Việt Nam được bảo lưu quyền thực hiện các thay đổi trong các chương trình, chính sách, các sản phẩm và dịch vụ được mô tả trên trang web này bất cứ lúc nào mà không cần thông báo trước hoặc được sự đồng ý.</p>
        <p>Thông tin và tài liệu trên trang web này bao gồm văn bản, hình ảnh, liên kết hay các hình thức khác được thể hiện là “như hiện trạng” “với tất cả các lỗi” và “như sẵn có” và không bảo đảm bất kì hình thức nào, cho dù một cách rõ ràng hay hàm ý hay theo luật định, bao gồm việc bảo đảm hiển nhiên tính thương mại, tính phù hợp cho một mục đích cụ thể hoặc không vi phạm quyền của bên thứ ba, hoặc máy tính không nhiễm virus.</p>
        <p>Doodle Việt Nam không bảo đảm rằng các chức năng trên trang web sẽ không bị gián đoạn hoặc không bị lỗi, các lỗi sẽ được sửa chữa, hay việc trang web này hoặc hệ thống máy chủ không chứa virus hay các tác nhân gây hại khác. Doodle Việt Nam không bảo đảm hoặc tuyên bố về việc sử dụng hay kết quả của việc sử dụng tài liệu trên trang web này về mặt chỉnh sửa, độ chính xác, độ tin cậy… Doodle Việt Nam được miễn trừ tất cả trách nhiệm về việc sử dụng hay phiên dịch bởi người khác về các thông tin trên trang web này. Bạn sử dụng, hoặc ra quyết định dựa vào thông tin trên trang web này có thể bị rủi ro. Bằng việc sử dụng trang web này, bạn đã đồng ý miễn trừ trách nhiệm cho Doodle Việt Nam khỏi các thiệt hại phát sinh từ bất cứ quyết định của bạn dựa vào những thông tin này.</p>
        <p>Doodle Việt Nam không chịu trách nhiệm cho bất cứ tổn hại bao gồm, trực tiếp hoặc gián tiếp, đặc biệt, ngẫu nhiên hoặc thiệt hại, mất mát hoặc chi phí phát sinh liên quan đến chương trình hoặc các trang web liên quan, việc sử dụng hoặc không sử dụng của một bên, hoặc liên quan đến bất kỳ lỗi, gián đoạn, chậm trễ trong hoạt động hoặc truyền tải, virut máy tính, đường dây hoặc lỗi hệ thống, ngay cả nếu Doodle Việt Nam hoặc người đại diện được thông báo về khả năng xảy ra những thiệt hại, mất mát hoặc chi phí này. Siêu liên kết đến nguồn internet khác là rủi ro của chính bạn; nội dung, sự chính xác, ý kiến được nêu ra và liên kết khác cung cấp bởi những nguồn này không được kiểm duyệt, xác minh, hoặc xác nhận của Doodle Việt Nam. Ngoài ra, Doodle Việt Nam không chịu trách nhiệm cho bất cứ tổn hại, bao gồm trực tiếp hoặc gián tiếp, đặc biệt, ngẫu nhiên hoặc thiệt hại, mất mát, chi phí phát sinh liên quan đến bất cứ việc mua hàng hay việc yêu thích của người truy cập trên trang web này. Một số quyền hạn sẽ bị hạn chế trừ khi được bảo đảm hoặc được miễn trừ trách nhiệm cho các thiệt hại ngẫu nhiên. Theo đó, một số các hạn chế của mục này có thể sẽ không áp dụng với bạn.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">4. TRANG WEB, NỘI DUNG, SẢN PHẨM VÀ DỊCH VỤ CỦA BÊN THỨ BA</h3>
        <p>Trang web này có thể bao gồm các liên kết dẫn đến hoặc từ các trang web khác trên Internet được sở hữu và điều hành bởi các bên thứ ba . Doodle Việt Nam không chịu trách nhiệm bất kỳ nội dung nào trên trang web của bên thứ ba , hoặc bất kỳ trang web dẫn đến trang web này, trừ khi trang web liên kết đó được sở hữu hoặc điều hành bởi Doodle Việt Nam. Việc một trang web khác được dẫn đến trang web này không hàm ý rằng : ( a) các nhà tài trợ, giấy phép, xác nhận của Doodle Việt Nam liên kết với trang web này, hoặc các sản phẩm, dịch vụ được mô tả bởi công ty này ; hoặc ( b ) Doodle Việt Nam cho phép các trang web liên kết sử dụng nhãn hiệu hàng hoá , tên thương mại , logo hoặc các tài liệu được đăng ký nhãn hiệu hoặc xác nhận bản quyền khác của Doodle Việt Nam. Trừ khi được thông qua bằng văn bản của Doodle Việt Nam trước, nếu không bạn đã đồng ý việc không cung cấp hoặc tạo ra một liên kết đến trang web này, hoặc bất kỳ khuôn thức ở trang web khác liên quan đến bất kỳ nội dung nằm trên trang Web này.</p>
        <p>Doodle Việt Nam không chịu trách nhiệm về tính chính xác, nội dung, hoặc các thông tin sẵn có trên các trang web dẫn tới hoặc từ bên thứ ba mà không có liên quan đến Doodle Việt Nam. Khi truy cập internet, chúng tôi khuyến cáo bạn nên bảo mật cẩn thận. Bởi vì một số các trang web của bên thứ ba có thể tự động tìm kiếm kết quả hoặc dẫn bạn đến các trang web có chứa thông tin được xem là không phù hợp, Doodle Việt Nam không chịu trách nhiệm về tính chính xác, bản quyền, tính pháp lý, hoặc tính phù hợp của tài liệu trên trang web của bên thứ ba, và bạn không được phép có bất kỳ khiếu nại gì đối với Doodle Việt Nam về các trang web đó.</p>
        <p>Ngoài ra, Doodle Việt Nam không thể đảm bảo rằng bạn sẽ hài lòng với bất kỳ sản phẩm hoặc dịch vụ mà bạn mua từ trang web của bên thứ ba, vì kênh bán hàng này được sở hữu và điều hành bởi các nhà bán lẻ độc lập. Doodle Việt Nam không xác nhận bất kỳ của hàng hóa, cũng không công nhận tính chính xác hay độ tin cậy của bất kỳ thông tin chứa trong trang web của bên thứ ba đó. Doodle Việt Nam không tuyên bố hoặc bảo đảm về độ an toàn của bất kỳ thông tin (bao gồm thẻ tín dụng và thông tin cá nhân khác) mà bạn được yêu cầu cung cấp cho bất kỳ bên thứ ba, và bạn cũng không được phép có bất kỳ khiếu nại nào đối với Doodle Việt Nam về các trang web đó. Cá nhân bạn phải kiểm duyệt hoặc tìm hiểu thêm thông tin cho đến khi bạn nghĩ là cần thiết hoặc thích hợp trước khi tiến hành bất kỳ giao dịch trực tuyến hoặc ngoại tuyến với bên thứ ba đó.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">5. CẬP NHẬT VÀ THAY ĐỔI KHÁC</h3>
        <p>Việc thay đổi nội dung của trang web này được thực hiện định kỳ bởi Doodle Việt Nam mà không cần phải thông báo trước. Bằng việc sử dụng trang web này, bạn đồng ý chịu sự ràng buộc bởi bất kỳ thay đổi nào, do đó, chúng tôi khuyến khích bạn truy cập trang web này định kỳ và xem lại bảng Thỏa thuận để biết được các điều khoản hiện tại mà bạn đang bị ràng buộc.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">6. QUYỀN TỪ BỎ</h3>
        <p>Việc bạn không tuân thủ các điều khoản, điều kiện của bảng Thỏa thuận này hoặc chính sách của trang web sẽ được hiểu là Doodle có quyền khước từ trách nhiệm liên quan phát sinh ngay lập tức và triệt để. Nếu bất kỳ điều khoản trong Thỏa thuận này không thể thực hiện toàn bộ hoặc một phần thì điều khoản đó được xem như vô hiệu và phần còn lại của điều khoản này vẫn sẽ còn hiệu lực.</p>
      </div>

      <div class="mb-7">
        <h3 class="font-bold text-primary-600">7. THÔNG BÁO NHÃN HIỆU</h3>
        <p>Thiết kế của Doodle Việt Nam là các nhãn hiệu của Doodle Việt Nam. Tất cả các nhãn hiệu khác xuất hiện trên trang web này thuộc quyền sở hữu của chủ nhân chính những nhãn hiệu đó.</p>
      </div>
    </div>
  </section>

  <MainFooter />
</template>
