<template>
<div class="row my-4">
    <div class="col-3">
        <div class="nav-bar-custom">
            <div
            v-for="(item, index) in menuBar"
            :key="index"
            :class="['nav-item-custom p-4 text-secondary', {'nav-item-active-custom': activeIndex===index}]"
            @click="updateIndex(index, item.action)"
            >
                <h5>{{item.lable1}}</h5>
                <p>{{item.lable2}}</p>
            </div>
        </div>
    </div>
    <div class="col-9 ps-4">
        <router-view/>
    </div>
</div>
</template>
<style scoped>
.nav-bar-custom{
    border-left: 1px solid grey;
}
.nav-item-custom{
    height: 98px;
    width: 100%;
}
.nav-item-custom:hover{
    cursor: pointer;
}
.nav-item-active-custom{
    box-shadow: inset 4px 0 0 0 #0d6efd;
    background-color: rgba(0, 105, 219, 0.04);
}
</style>
<script>
export default{
    data(){
        return{
            menuBar: [
                {lable1: "Tài khoản", lable2:"Tùy chỉnh thông tin cá nhân",action: "userForm"},
                {lable1: "Đổi mật khẩu", lable2:"Đổi mật khẩu đăng nhập",action:"changePassword"},
            ],
            activeIndex: 0,
        }
    },
    methods: {
        userForm(){
            this.$router.push({name:"information"})
        },
        changePassword(){
            this.$router.push({name:"changePassword"})
        },
        updateIndex(index, action){
            this.activeIndex= index;
            if (action && typeof this[action] === "function") {
                this[action]();
            }
        }
    }
}
</script>