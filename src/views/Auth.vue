<template>
<AppHeader/>
<div class="container-fluid m-0 p-0" style="height: 88.5vh;">
    <div class="row m-0" style="height: 100%;">
        <div class="col-6">
            <div class="row d-flex justify-content-center pt-5" style="height: 100%;">
                <div class="col-8 d-flex flex-column justify-content-between">
                    <h1>Xây dựng <b class="fw-bold">Sự nghiệp</b> <b style="color: #03abfd;">thành công</b> cùng WorkFind.vn</h1>
                    <div class="d-flex justify-content-center" style="position: relative;">
                        <div class="bg-img-custom"></div>
                        <img src="../assets/banner/auth-banner.svg" alt="">
                    </div>
                </div>
            
            </div>
        </div>
        <div class="col-6 d-flex flex-column justify-content-center align-items-center" style="background-color: #03abfd;">
            <router-view/>
        </div>
    </div>
</div>
</template>

<style scoped>
.bg-img-custom{
    position: absolute;
    height: 200px;
    width: 120%;
    background-color: #f7b500;
    z-index: -1;
    bottom: 0;
    border-top-left-radius: 550px;
    border-top-right-radius: 550px
}
</style>

<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';

export default{
    components:{
        AppFooter,
        AppHeader,
    }
}
</script>