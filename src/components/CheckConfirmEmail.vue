<template>
    <div>
        <h1>Kiểm tra email của bạn</h1>
        <p>Chúng tôi vừa gửi cho bạn một link kích hoạt tài khoản vào địa chỉ email: <b>{{ email }}</b>.<br>Vui lòng mở mail sau đó bấm vào nút <b>Kích hoạt</b> để kích hoạt tài khoản.</p>
    </div>
    <hr class="my-4">
    <div>
        <h2>Bạn không nhận được email?</h2>
        <p>Bạn có thể không nhận được mail vì một trong những lý do sau:</p>
        <ul>
            <li>Thư nằm trong thư mục rác</li>
            <li>Địa chỉ email nhập bị sai chính tả</li>
            <li>Bạn đã vô tình cung cấp cho chúng tôi một địa chỉ email khác</li>
        </ul>
        <router-link :to="{name:'signin'}" style="text-decoration: none;">Quay lại trang đăng ký</router-link>
    </div>
</template>

<script>
export default{
    props: {
        email: {type: String, default: ""}
    }
}
</script>