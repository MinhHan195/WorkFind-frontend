<template>
<h4 class="mt-4">Việc làm nổi bậc</h4>
<div>
    <div style="height: 100px;" class="mb-3"
    v-for="i in 10"
    :key="i"
    >
        <JobCardItem  :listUserFavoriteJob="userStore.user.listFavoriteJobs" :job="jobStore.list[i]" :isLogin="userStore.isLogged"/>
    </div>
    
</div>  
</template>

<script>
import JobCardItem from '@/components/JobCardItem.vue';
import { useJobStore } from '@/store/job.store';
import { useUserStore } from '@/store/user.store';
export default{
    created(){
        this.jobStore = useJobStore();
        this.userStore = useUserStore();
        // for(let i in 10){
        //     console.log(this.jobStore.list[i]);
        // }
    },
    components: {
        JobCardItem,
    }
}
</script>   