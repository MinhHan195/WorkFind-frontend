<template>
    <div class="row mt-4 d-flex justify-content-center"  style="min-height: 200px;">
        <div class="col-8">
            <h4>Công việc đã lưu ({{ countJob() }})</h4>
            <div class="mt-5">
                <div class="border border-secondary-subtle rounded-2 d-flex align-items-center px-4 mb-4" style="height: 100px;"
                v-for="(job, index) in jobStore.listFavorite"
                :key="job._id"
                >
                    <i class="fa-solid fa-heart fa-xl" style="color: #0d6efd;" @click="removeFavoriteJob(job._id)" ></i>
                    <div class="ms-4 border rounded-2" style="height: 80px; width: 80px; overflow: hidden;">
                        <img src="../assets/avatar_placeholder.png" class="img-fluid" alt="">
                    </div>
                    <div class="row align-items-center" style="width: 80%;">
                        <div class="col-8 ms-3">
                            <h4 class="fw-semibold">{{ job.jobName }}</h4>
                            <h6 class="fw-light text-uppercase">{{ job.nameCompany }}</h6>
                        </div>
                        <div class="col-3">
                            <p class="text-success fw-bold m-0">Hết hạn: {{ deadline(job.dateTimeCreate) }} ngày tới</p>
                        </div>
                    </div>
                    <div class="text-end">
                        <div class="rounded-circle d-flex align-items-center justify-content-center" style="height: 50px; width: 50px; background-color: #0d6efd;">
                            <i class="fa-regular fa-paper-plane fa-xl" style="color: white;"></i>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="col-4">
            <JobSideBar/>
        </div>
    </div>
</template>

<style scoped>
.fa-heart:hover{
    cursor: pointer;
}
</style>

<script>
import { parseISO, addMonths, differenceInDays} from 'date-fns';
import { useJobStore } from '@/store/job.store';
import { useUserStore } from '@/store/user.store';
import JobSideBar from '@/components/JobSideBar.vue';
export default{
    created(){
        this.jobStore = useJobStore();
        this.userStore = useUserStore();
        this.jobStore.getListFavorite();
    },
    components:{
        JobSideBar,
    },
    methods: {
        deadline(date){
            const day = parseISO(date);
            const dl = addMonths(day, 2);
            const today = new Date();
            return differenceInDays(dl, today, );
        },
        countJob(){
            if(this.userStore.user.listUserFavoriteJob===undefined){
                return 0
            }
            return this.userStore.user.listUserFavoriteJob.length
        },
        async removeFavoriteJob(index){
            const result = await this.userStore.deleteJobFavorite(index)
            this.jobStore.getListFavorite();
            
        },
    }
}
</script>