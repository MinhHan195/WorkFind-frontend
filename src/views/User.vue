<template>
<AppHeader />
<div class="bg-body-tertiary nav-bar-custom" >
    <div class="container px-5">
        <div class="mx-5">
            <ul class="nav d-flex justify-content-between text-secondary ">
                <li class="nav-item "
                v-for="(item, index) in menuNav"
                :key="index"
                >
                    <div 
                    :class="['nav-custom pt-3', {'nav-custom-active': activeIndex===index}]"
                    @click="updateIndex(index, item.action)"
                    >
                        <i :class="item.icon"></i> {{ item.lable }}
                    </div>
                </li>
            </ul>
        </div>
        
    </div>
</div>
<div style="height: 60px;"></div>
<div>
    <div class="container px-5">
        <div class="mx-3">
            <router-view/>
        </div>
    </div>
</div>
</template>
<style scoped>
.nav-custom{
    height:60px;
}
.nav-custom:hover{
    cursor: pointer;
    color: #0d6efd;
}
.nav-custom-active{
    height:60px;
    border-bottom: 3px solid #0d6efd;
    color: #0d6efd;
}
.nav-bar-custom{
    position: fixed;
    width: 100%;
    border-bottom: 1px solid rgb(234, 234, 234);
}
</style>
<script>
import AppHeader from '@/components/AppHeader.vue';
export default{
    components: {
        AppHeader,
    },
    data(){
        return {
            menuNav: [
                {lable: "Hồ sơ xin việc", icon: "fa-solid fa-address-card fa-xl", action: ""},
                {lable: "Việc đã lưu", icon: "fa-solid fa-heart fa-xl", action: "goToJobFavorite"},
                {lable: "Việc đã ứng tuyển", icon: "fa-solid fa-paper-plane fa-xl", action: ""},
                {lable: "Tài khoản", icon: "fa-solid fa-user fa-xl", action: "goToUserInfo"}
            ],
            activeIndex: this.$route.matched[this.$route.matched.length - 1].props.default.index ?? -1
        }
    },
    methods:{
        goToJobFavorite(){
            this.$router.push({name: "favorite"})
        },
        goToUserInfo(){
            this.$router.push({name: "information"})
        },
        updateIndex(index, action){
            this.activeIndex = index;
            if (action && typeof this[action] === "function") {
                this[action]();
            }
        }
    },
}
</script>