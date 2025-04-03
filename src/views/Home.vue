<template>
    <AppHeader />
    <div>
        <JobSearchBanner />
        <h2 class="text-center mb-4 mt-5">Việc làm nổi bật</h2>
        <GridJobHome/>
        <h2 class="text-center mb-4 mt-5">Tìm việc theo ngành nghề</h2>
        <div class="mb-5">
            <JobType
            @findJobWithType="findJobWithType" />
        </div>
        <h2 class="text-center mb-4 mt-5">Nhà tuyển dụng hàng đầu</h2>
        <div class="mb-5"> 
            <ListCompany 
            :listCompanyData="companyStore.listCompany" @findJobWithCompany="findJobWithCompany"/>
        </div>
    </div>
    
    
</template>

<script>
import JobSearchBanner from "@/components/JobsSearchBanner.vue";
import GridJobHome from "@/components/GridJobHome.vue";
import JobType from "@/components/JobType.vue";
import ListCompany from "@/components/ListCompany.vue";
import AppHeader from "@/components/AppHeader.vue";
import { useCompanyStore } from "@/store/company.store";
export default{
    created() {
        this.companyStore = useCompanyStore();
        this.companyStore.getListCompany();
    },
    components: {
        JobSearchBanner,
        GridJobHome,
        JobType,
        ListCompany,
        AppHeader
    },
    methods: {
        findJobWithType(string) {
            console.log(string);
        },
        findJobWithCompany(string) {
            console.log(string);
        }
    }
}
</script>