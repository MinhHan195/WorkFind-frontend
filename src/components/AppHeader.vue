<template>
    <nav class="navbar navbar-expand-lg navbar-custom bg-white shadow-sm row vw-100">
        <div class="col-1 ps-5">
            <a href="/" class="navbar-brand">
                <img src="../assets/logo.svg" alt="WorkFind" height="70">
            </a>
        </div>
        <!-- Logo -->
        
        <div class="col-8 d-flex justify-content-end align-items-center">
            <div class="w-auto d-flex align-items-center" style="height: 50px;">
                <slot>
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item me-2">
                            <router-link :to="{name: 'job'}" class="nav-link">
                                <i class="fa-solid fa-magnifying-glass fa-2xl" style="color: #03abfd;"></i> Ngành nghề/ Địa điểm
                            </router-link> 
                        </li>
                        <li class="nav-item me-2">
                            <router-link :to="{name: 'company'}" class="nav-link">
                                <i class="fa-solid fa-building fa-2xl" style="color: #03abfd;"></i> Công ty
                            </router-link>
                        </li>
                        <li class="nav-item me-2">
                            <router-link :to="{name: 'profile'}" class="nav-link">
                                <i class="fa-solid fa-file fa-2xl" style="color: #03abfd;"></i> Mẫu CV Xin Việc
                            </router-link>
                        </li>
                    </ul>
                </slot>
            </div>
        </div>

        <!-- Menu chính -->
        <div class="collapse navbar-collapse col-3 d-flex justify-content-end">
            <div class="navbar-nav">

                <!-- Hồ sơ người dùng -->
                <div class="pe-3 border-secondary border-end">
                    <UserDropdown :user-data="userData"/>
                </div>
                <!-- Nhà tuyển dụng -->
                <div class="ps-2 me-3">
                    <router-link :to="{name: 'company'}" class="nav-link ">
                        Nhà tuyển dụng
                    </router-link>
                </div>
                
            </div>
        </div>
    </nav>
    <div style="height: 86px;"></div>
</template>

<style scoped>
.navbar-custom{
    position: fixed !important;
    z-index: 100;
}
</style>

<script>
import UserDropdown from '@/components/UserDropdown.vue';
import AuthService from '@/services/auth.service'
export default {
    components: {
        UserDropdown,
    },
    data() {
        return {
            userData: {},
        }
    },
    methods: {
        async getUser() {
            try {
                this.userData = await AuthService.getUser();
            } catch (error) {
                console.log(error);
            }
        }
    },
    async mounted(){
        await this.getUser();
    }
}
</script>