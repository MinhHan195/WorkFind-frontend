<template>
    <div class="container">
        <h1 class="ps-5">Kết quả tìm kiếm</h1>
        <div class="px-5 d-flex justify-content-between">
            <h5 ><span class="fw-bold fs-4" style="color: #03abfd;">{{ this.jobStore.listJobResult.length }}</span> việc làm</h5>
            <div class="dropdown">
                <a class="btn btn-sort dropdown-toggle" href="#" id="title-sort" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sắp xếp theo
                </a>

                <ul class="dropdown-menu" style="z-index: 10;">
                    <li><a class="dropdown-item" href="#" @click="sortNewToOld">Từ mới đến cũ</a></li>
                    <li><a class="dropdown-item" href="#" @click="sortOldToNew">Từ cũ đến mới</a></li>
                </ul>
            </div>
        </div>
        <div class="d-flex flex-column align-items-center">
            <div class="row bg-body-tertiary my-3" style="height: 140px; width: 90%;"
            v-for="(job, index) in jobStore.listJobResult.slice(count, count+10)"
            :key=job._id
            >
                <JobCardItem 
                    :listUserFavoriteJob="userStore.user.listFavoriteJobs"
                    :job="job"
                    :isLogin="userStore.isLogged"
                />
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"
                    v-for="i in pageCount"
                    :key="i"
                    >
                        <span class="page-link" @click="paginatedData(i-1)">{{ i }}</span>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped>
.btn-sort{
    position: relative;
    border-radius: 0;
    border: 1px solid black;
    height: 30px;
    padding: 0;
    padding-left: 5px;
    padding-right: 5px;
    margin: 0;
}
</style>

<script>
import JobCardItem from '@/components/JobCardItem.vue';
import { useJobStore } from '@/store/job.store';
import { useUserStore } from '@/store/user.store';
export default {
    created(){
        this.jobStore = useJobStore();
        this.userStore = useUserStore();
    },
    components: {
        JobCardItem,
    },
    data(){
        return {
            count: 0,
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.jobStore.listJobResult.length /10);
        },
    },
    methods: {
        paginatedData(n) {
            this.count = n*10;
        }, 

        sortNewToOld(){
            const titleSort = document.getElementById("title-sort");
            titleSort.innerText="Mới đến cũ";
            this.jobStore.sortNewToOld();
        },
        sortOldToNew(){
            const titleSort = document.getElementById("title-sort");
            titleSort.innerText="Cũ đến mới";
            this.jobStore.sortOldToNew();
        }
    },
}
</script>
