<template>
     <!-- Slider -->
    <div class="" style="height: 422px; width: 100%;">
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="../assets/banner/banner_1.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                <img src="../assets/banner/banner_2.jpeg" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <!-- Thanh tìm kiếm -->
        <div class="search-custom position-absolute w-100 px-5">
            <div class="search-input-custom">
                <SearchInput/>
            </div>
        </div>
            
    </div>
</template>

<style scoped>
.search-custom {
    top: 86px;
    height: 423px;
}
.search-input-custom{
    position: sticky;
    top: 112px;
    height: 70px;
    z-index: 50;
}
.job-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    transition: 0.3s;
}
.job-card:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>

<script>
import SearchInput from '@/components/SearchInput.vue';
// import { useJobStore } from '@/store/job.store';
export default{
    // created(){
    //     this.jobStore = useJobStore();
    // },
    components: {
        SearchInput,
    },
    // data(){
    //     return {
    //         KeyInputText: "",
    //         ProvinceInputText: "",
    //     }
    // },
    // methods: {
    //     async findByKey(){
    //         console.log("submit");
    //         const key = this.KeyInputText!=="" ? this.KeyInputText : "key";
    //         const province = this.ProvinceInputText!=="" ? this.ProvinceInputText : "province";
    //         await this.jobStore.findByKey(key, province);
    //         this.$router.push({
    //             name: "job",
    //             query: {
    //                 key: key === "province" ? undefined : key,
    //                 location: province === "province" ? undefined : province
    //             }
    //         })
    //     }
    // }
}
</script>