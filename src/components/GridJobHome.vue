<script>
import JobCardItem from './JobCardItem.vue';
import { useUserStore } from "@/store/user.store";
import { useJobStore } from "@/store/job.store";
export default {
    created() {
        this.userStore = useUserStore();
        this.jobStore = useJobStore();
        this.jobStore.getListJob();
    },
    components: {
        JobCardItem,
    },
    data() {
        return {
            loop: 0,
        }
    },
    emits: ["update:activeIndex"],
    computed: {
        listJobCount () {
            return this.jobStore.list.length;
        },
        
        loopCount() {
            return Math.ceil(this.listJobCount/15);
        },
    },
    methods: {
        updateActiveIndex(id) {
            this.$emit("update:activeIndex", id)
        },
        
        limitedUsers(idx) {
            const count = idx*15;
            return this.jobStore.list.slice(count, count+15);
        }
    },
}
</script>

<template>
    <div id="carouselExampleIndicators1" class="carousel slide" style="min-height: 750px;">
        <div class="carousel-inner">
            <div class="carousel-item"
            v-for="i in loopCount" :key="i"
            :class="{'active': i===1}"
            >
                <div class="container ">
                    <div class="row ">
                        <div class="col-4 px-3 py-3" style="height: 150px;"
                        v-for="(job,index) in limitedUsers(i-1)"
                        :key="job._id"
                        @click="updateActiveIndex(job._id)"
                        >
                            <JobCardItem :job="job" :listUserFavoriteJob="userStore.user.listFavoriteJobs" :isLogin="userStore.user.isLogged"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    
    
</template>