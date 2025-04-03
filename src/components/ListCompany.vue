<template>
    <div id="carouselExampleIndicators2" class="carousel slide" style="min-height: auto;">
        <div class="carousel-inner">
            <div class="carousel-item active"
            v-for="i in loopCount" :key="i"
            >
                <div class="container ">
                    <div class="row ">
                        <div class="col-3"
                        v-for="(company, index) in limitedCompanys(i-1)">
                            <div class="position-relative rounded-3 company-button" @click="findJobWithType(company.nameCompany)" style="height: auto; width: 100%; ">
                                <div class="rounded-top" style="height: 135px; overflow: hidden;">
                                    <img src="../assets/bannerCompany/banner1.jpg" class="img-fluid" alt="..." style="height: 100%; object-fit: cover;">
                                </div>

                                <div class="avatar-custom rounded-circle border border-secondary">
                                    <img src="../assets/avatar_placeholder.png" alt="" class="img-fluid" >
                                </div>
                                
                                <div class="border border-top-0 border-secondary rounded-bottom pt-5 px-3 d-flex flex-column justify-content-between">
                                    <div class="text-title">
                                        <span class="fw-bold fs-4">{{ company.nameCompany }}</span>  
                                    </div>
                                    <div class="mt-3">
                                        <p class="text-primary fw-bold fs-5">{{ company.totalJob }} Công việc đang tuyển</p>
                                        <p class="text-body-tertiary"><i class="fa-solid fa-location-dot fa-sm me-2"></i>{{ company.province }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<style scoped>
.avatar-custom{
    position: absolute;
    top: 70px; 
    left: 15px;
    overflow: hidden;
    height: 100px;
    width: 100px;
} 
.text-title{
    height: 4.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
}
.company-button{
    cursor: pointer;
}
</style>

<script>
export default {
    props: {
        listCompanyData: {type: Array, default: []},
    },
    emits: ["findJobWithCompany"],
    computed: {
        listJobCount () {
            return this.listCompanyData.length;
        },
        
        loopCount() {
            return Math.ceil(this.listJobCount/4);
        },
    },
    methods: {
        limitedCompanys(idx) {
            const count = idx*4;
            return this.listCompanyData.slice(count, count+4);
        },
        findJobWithType(string){
            this.$emit("findJobWithCompany", string);
        }
    }
}
</script>