<template>
    <div>
        <div class="d-flex align-items-center justify-content-center border border-secondary rounded-pill p-1 column-gap-2 custom-button" 
        @click="toggleDropdown"
        style="height: 40px;">
            <div class="rounded-circle " style="height: 30px; width: 30px; overflow: hidden;">
                <img src="../assets/avatar_placeholder.png" alt="avatar placeholder" class="img-fluid">
            </div>
            <span v-if="!userStore.isLogged" class="fw-medium">Đăng nhập</span>
            <span v-else class="fw-medium">{{ userStore.user.name }}</span>
            <i class="fa-duotone fa-solid fa-caret-down me-1"></i>
    </div>
    <div v-if="isOpen && !userStore.isLogged" class="border border-secondary rounded-2 position-absolute mt-2 z-3 bg-white" style="right: 150px; z-index: 100;">
        <div class="d-flex ">
            <div class="m-2">
                <router-link :to="{name: 'login'}">
                    <button type="button " class="btn btn-primary rounded-pill">Đăng nhập</button>
                </router-link>
            </div>
            <div class="m-2">
                <button type="button" class="btn btn-outline-primary rounded-pill" @click="login">Đăng ký</button>
            </div>
        </div>
        
    </div>
    <div v-if="isOpen && userStore.isLogged" class="border border-secondary rounded-2 position-absolute mt-2 z-3 bg-white" style="right: 185px;  z-index: 100;">
        <div class="p-3">
            <div class="d-flex column-gap-4 custom-button">
                <div class="rounded-circle " style="height: 50px; width: 50px; overflow: hidden;">
                    <img src="../assets/avatar_placeholder.png" alt="avatar placeholder" class="img-fluid">
                </div>
                <div>
                    <b v-if="!userStore.isLogged" class="text-primary">Tên người dùng</b>
                    <b v-else class="text-primary">{{ userStore.user.name }}</b>
                    <p>Tài khoản</p>
                </div>
            </div>
            <hr class="p-0 m-0">
            <div>
                <table class="table table-borderless">
                    <tbody>
                        <tr class="custom-button">
                            <td><i class="fa-solid fa-briefcase fa-xl" style="color: #03abfd;"></i></td>
                            <td><span class="ms-1 fw-medium">Tổng quan</span></td>
                        </tr>
                        <tr class="custom-button">
                            <td><i class="fa-solid fa-file fa-xl"style="color: #03abfd;"></i></td>
                            <td><span class="ms-1 fw-medium">Hồ sơ xin việc</span></td>
                        </tr>
                        <tr class="custom-button">
                            <td><i class="fa-solid fa-heart fa-xl" style="color: #03abfd;"></i></td>
                            <td><span class="ms-1 fw-medium">Việc đã lưu</span></td>
                        </tr>
                        <tr class="custom-button">
                            <td><i class="fa-solid fa-paper-plane fa-xl" style="color: #03abfd;"></i></td>
                            <td><span class="ms-1 fw-medium">Việc đã ứng tuyển</span></td>
                        </tr>
                        <tr class="custom-button">
                            <td><i class="fa-solid fa-bell fa-xl" style="color: #03abfd;"></i></td>
                            <td><span class="ms-1 fw-medium">Thông báo việc làm</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr>
            <div>
                <div class="custom-button" @click="logout">
                    <i class="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal fa-xl"></i>
                    <span class="ms-2">Đăng xuất</span>
                </div>
            </div>
        </div>
        
    </div>
    
    </div>
</template>

<style scoped>
  .custom-button:hover {
    /* outline: 1px solid #03abfd; */
    box-shadow: 0 0 5px rgba(3, 171, 253, 1);
    cursor: pointer;
  }
</style>

<script>
import { useUserStore } from '@/store/user.store';
export default{
    created(){
        this.userStore = useUserStore();
    },
    data(){
        return {
            isOpen: false
        };
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        logout(){
            this.userStore.$reset();
            this.$router.push({name:"home"});
        },
    },
}
</script>