<template>
    <div class="row p-0 m-0 d-flex border border-secondary-subtle rounded-3 shadow-sm " style="height: 100%; width: 100%;" @click="goTo()">
        
        <div class="col-4 me-2 p-0 rounded-start-3 bg-white overflow-hidden text-center" style="width: auto; height: 100%;">
            <img src="../assets/avatar_placeholder.png" alt="" style="width: 100%; height: 100%;">
        </div>

        <div class="col-8 p-2 d-flex flex-column justify-content-between flex-grow-1">
            <div class="d-flex justify-content-between w-100">
                <div class="text-title">
                    <span class="fw-bold text-capitalize fs-6">{{ job.jobName}}</span>
                </div>
                <div class="ms-2">
                    <div>
                        <i class="fa-regular fa-heart favorite-button"
                        v-if="!this.userStore.isLogged"
                        @click.stop="goToLogin"
                        ></i>
                        <i class="fa-solid fa-heart position-relative favorite-button"
                        v-else-if="isFavorite"
                        @click.stop="removeFavoriteJob(job._id)"
                        ></i>
                        <i class="fa-regular fa-heart favorite-button" 
                        v-else
                        @click.stop="addJobFavorite(job._id)"></i>
                        
                    </div>
                </div>
            </div>
            <div class="text-title">
                <span class="fw-light p-0 text-uppercase text-company" >{{ job.nameCompany }}</span>
            </div>
            <span class="text-company fw-light"><i class="fa-solid fa-location-dot"></i> {{ job.province }}</span>
            <div class="align-text-bottom mw-100 d-flex justify-content-between">
                <span class="text-primary text-bottom"><i class="fa-solid fa-coins"></i> {{ job.salary}}</span>
                <span class="text-bottom">{{ formatTime(job.dateTimeCreate) }}</span>
            </div>
            
        </div>

    </div>
</template>

<style scoped>
.favorite-button{
    color: #03abfd;
}
.favorite-button:hover{
    cursor: pointer;
}
.text-bottom  {
    font-size: 12px;
}
.text-company{
    font-size: 15px;
}
.text-title{
    white-space: nowrap;  
    overflow: hidden;
    text-overflow: ellipsis; /* Hiển thị dấu "..." khi quá dài */
    width: 100%;
}
</style>

<script>
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useUserStore } from "@/store/user.store";
import { useJobStore } from "@/store/job.store";
export default{
    created() {
        this.userStore = useUserStore();
        this.jobStore = useJobStore();
    },
    props:{
        job: { type: Object, default: {}},
    },
    emits: ["addFavoriteJob","removeFavoriteJob", "update:activeIndex","goToLogin"],
    computed:{
        isFavorite(){
            if(this.userStore.user.listUserFavoriteJob===undefined){
                return false;
            }
            return (this.userStore.user.listUserFavoriteJob.includes(this.job._id))
        } 
    },
    methods: {
        formatTime(time){
            return (formatDistanceToNow(new Date(time), { locale: vi, addSuffix: true }));
        },
        addJobFavorite(index){
            this.userStore.addJobFavorite({jobId: index})
            this.jobStore.getListFavorite();
        },
        async removeFavoriteJob(index){
            const result = await this.userStore.deleteJobFavorite(index)
            
        },
        goToLogin(){
            console.log("Add Favorite");
            this.$router.push({name: "login"});
        },
        goTo(){
            if(this.userStore.isLogged){
                this.$router.push({name: "jobDetail", params: {id: this.job._id}})
            }else{
                this.$router.push({name: "login"});
            }
        }
    },
}
</script>