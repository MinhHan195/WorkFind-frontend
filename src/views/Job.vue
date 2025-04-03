<script>
import AppHeader from '@/components/AppHeader.vue';
import SearchInput from '@/components/SearchInput.vue';
import JobSideBar from '@/components/JobSideBar.vue';
import JobResult from '@/components/JobResult.vue';
import { useJobStore } from '@/store/job.store';
export default {
    created(){
        this.jobStore = useJobStore();
        this.jobStore.fetchJobType();
    },
    components: {
        AppHeader,
        SearchInput,
        JobSideBar,
        JobResult,
    },
    data(){
        return{
            filter: {
                minSalary: this.$route.query.minSalary !== undefined ? this.$route.query.minSalary : 0,
                maxSalary: this.$route.query.maxSalary !== undefined ? this.$route.query.maxSalary : 100,
                typeJob: this.$route.query.typeJob !== undefined ? (Array.isArray(this.$route.query.typeJob) ? this.$route.query.typeJob : [this.$route.query.typeJob]) : [],
                careerLevel: this.$route.query.careerLevel !== undefined ? (Array.isArray(this.$route.query.careerLevel) ? this.$route.query.careerLevel : [this.$route.query.careerLevel]) : [],
                experienceLevel: this.$route.query.experienceLevel !== undefined ? (Array.isArray(this.$route.query.experienceLevel) ? this.$route.query.experienceLevel : [this.$route.query.experienceLevel]) : [],
                educationLevel: this.$route.query.educationLevel !== undefined ? (Array.isArray(this.$route.query.educationLevel) ? this.$route.query.educationLevel : [this.$route.query.educationLevel]) : [],
                positionType: this.$route.query.positionType !== undefined ? (Array.isArray(this.$route.query.positionType) ? this.$route.query.positionType : [this.$route.query.positionType]) : [],
                dateTimeCreate: this.$route.query.dateTimeCreate !== undefined ? this.$route.query.dateTimeCreate : ""

            }
        }
    },
    watch:{
        "$route.query": function (newV, oldV) {
            if(newV.location === undefined && newV.key=== undefined){
                if(JSON.stringify(newV) !== JSON.stringify(oldV)){
                    this.jobStore.findByFilter(this.filter)
                }
            }
            
        }
    },
    methods: {
        updateMinRange() {
            const minInput = document.getElementById("minRange");
            this.filter.minSalary = parseInt(minInput.value);
            if( this.filter.minSalary >=  this.filter.maxSalary){
                this.filter.minSalary = this.filter.maxSalary;
            }
            minInput.value = this.filter.minSalary;
        },
        updateMaxRange() {
            const maxInput = document.getElementById("maxRange");
            this.filter.maxSalary = parseInt(maxInput.value);
            if(this.filter.maxSalary <=  this.filter.minSalary){
                this.filter.maxSalary = this.filter.minSalary;
            }
        },
        submitSalary(){
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    minSalary: this.filter.minSalary,
                    maxSalary: this.filter.maxSalary
                }
            })
        },
        resetSalary(){
            this.filter.minSalary=0;
            this.filter.maxSalary=100;
        },
        updateJobType(type, event){
            if(event.target.checked){
                this.filter.typeJob.push(type);
            }else{
                this.filter.typeJob.forEach((item) => {
                    if(item === type){
                        const index = this.filter.typeJob.indexOf(item);
                        this.filter.typeJob.splice(index,1);
                    }
                })
            }
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    typeJob: this.filter.typeJob
                }
            })
        },
        updateCareerLevel(type, event){
            if(event.target.checked){
                this.filter.careerLevel.push(type);
            }else{
                this.filter.careerLevel.forEach((item) => {
                    if(item === type){
                        const index = this.filter.careerLevel.indexOf(item);
                        this.filter.careerLevel.splice(index,1);
                    }
                })
            }
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    careerLevel: this.filter.careerLevel
                }
            })
        },
        updateExperienceLevel(level, event){
            if(event.target.checked){
                this.filter.experienceLevel.push(level);
            }else{
                this.filter.experienceLevel.forEach((item) => {
                    if(item === level){
                        const index = this.filter.experienceLevel.indexOf(item);
                        this.filter.experienceLevel.splice(index,1);
                    }
                })
            }
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    experienceLevel: this.filter.experienceLevel
                }
            })
        },
        updateEducationLevel(level, event){
            if(event.target.checked){
                this.filter.educationLevel.push(level);
            }else{
                this.filter.educationLevel.forEach((item) => {
                    if(item === level){
                        const index = this.filter.educationLevel.indexOf(item);
                        this.filter.educationLevel.splice(index,1);
                    }
                })
            }
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    educationLevel: this.filter.educationLevel
                }
            })
        },
        updatePositionType(type, event){
            if(event.target.checked){
                this.filter.positionType.push(type);
            }else{
                this.filter.positionType.forEach((item) => {
                    if(item === type){
                        const index = this.filter.positionType.indexOf(item);
                        this.filter.positionType.splice(index,1);
                    }
                })
            }
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    positionType: this.filter.positionType
                }
            })
        },
        updateDateTimeCreate(date){
            this.filter.dateTimeCreate = date;
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    dateTimeCreate: this.filter.dateTimeCreate
                }
            })
        },
        resetDateTimeCreate(){  
            this.filter.dateTimeCreate = "";
            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    dateTimeCreate: undefined
                }
            })
        }
    },
    mounted(){
        console.log(this.filter);
    }
}
</script>

<template>
    <AppHeader>
        <SearchInput 
        :modelValueKey="this.$route.query.key!==undefined ? this.$route.query.key: ''"
        :modelValueProvince="this.$route.query.location!==undefined ? this.$route.query.location: ''"
        />
    </AppHeader>
    <div class="row filter-custom">
        <div class="col-1"></div>
        <div class="col-8 d-flex justify-content-end align-items-center my-2">
            <div class="btn-group">
                <button type="button" class="btn border border-0 text-black rounded-pill me-2 dropdown-toggle bg-secondary-subtle" data-bs-toggle="dropdown" aria-expanded="false">
                    Ngành nghề
                </button>
                <ul class="dropdown-menu px-4 py-3" style="max-height: 300px;width: 330px; overflow-y: scroll;">
                    <li
                    v-for="(jobtype, index) in jobStore.filter.jobType"
                    :key="jobtype._id"
                    >
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updateJobType(jobtype.type,  $event)" 
                            :checked="this.filter.typeJob.includes(jobtype.type)"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                {{ jobtype.type }}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-group">
                <button type="button" class="btn border border-0 text-black rounded-pill me-2 dropdown-toggle bg-secondary-subtle" data-bs-toggle="dropdown" aria-expanded="false">
                    Cấp bậc
                </button>
                <ul class="dropdown-menu px-4 py-3" style="max-height: 300px;width: 330px; overflow-y: scroll;">
                    <li
                    v-for="(level, index) in jobStore.filter.careerLevel"
                    :key="level._id"
                    >
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updateCareerLevel(level.level,  $event)" 
                            :checked="this.filter.careerLevel.includes(level.level)"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                {{ level.level }}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-group">
                <button type="button" class="btn border border-0 text-black rounded-pill me-2 dropdown-toggle bg-secondary-subtle" data-bs-toggle="dropdown" aria-expanded="false">
                    Kinh nghiệm
                </button>
                <ul class="dropdown-menu  px-4 py-3" style="max-height: 300px;width: 330px; overflow-y: scroll;">
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"  @input="updateExperienceLevel('Dưới 1 năm', $event)"
                            :checked="this.filter.experienceLevel.includes('Dưới 1 năm')"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Dưới 1 năm
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updateExperienceLevel('1-2 năm', $event)"
                            :checked="this.filter.experienceLevel.includes('1-2 năm')"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                1-2 năm
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updateExperienceLevel('2-5 năm', $event)"
                            :checked="this.filter.experienceLevel.includes('2-5 năm')"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                2-5 năm
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updateExperienceLevel('5-10 năm', $event)"
                            :checked="this.filter.experienceLevel.includes('5-10 năm')"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                5-10 năm
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updateExperienceLevel('Trên 10 năm', $event)"
                            :checked="this.filter.experienceLevel.includes('Trên 10 năm')"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Trên 10 năm
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-group">
                <button type="button" class="btn border border-0 text-black rounded-pill me-2 dropdown-toggle bg-secondary-subtle" data-bs-toggle="dropdown" aria-expanded="false">
                    Mức lương
                </button>
                <ul class="dropdown-menu px-4 py-3" style="max-height: 300px;width:430px;">
                    <li> 
                        <div>
                            <input type="range" id="minRange" min="0" max="100" step="0.1" :value="filter.minSalary" @input="updateMinRange">
                            <input type="range" id="maxRange" min="0" max="100" step="0.1" :value="filter.maxSalary" @input="updateMaxRange">
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class=" me-2">
                                <label for="minPreview">Tối thiểu</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" :value="filter.minSalary" id="minPreview">
                                    <span class="input-group-text">Triệu</span>
                                </div>
                            </div>
                            <div class=" ms-2">
                                <label for="maxPreview">Tối đa</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" :value="filter.maxSalary" id="maxPreview">
                                    <span class="input-group-text">Triệu</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 w-100 d-flex justify-content-between">
                            <button type="button" class="btn btn-primary" @click="submitSalary">Áp dụng</button>
                            <button type="button" class="btn btn-danger" @click="resetSalary">Đặt lại</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-group">
                <button type="button" class="btn border border-0 text-black rounded-pill me-2 dropdown-toggle bg-secondary-subtle" data-bs-toggle="dropdown" aria-expanded="false">
                    Học vấn
                </button>
                <ul class="dropdown-menu  px-4 py-3" style="max-height: 300px;width: 330px; overflow-y: scroll;">
                    <li
                    v-for="(level, index) in jobStore.filter.educationLevel"
                    :key="level._id"
                    >
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updateEducationLevel(level.level, $event)"
                            :checked="this.filter.educationLevel.includes(level.level)"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                {{ level.level }}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-group">
                <button type="button" class="btn border border-0 text-black rounded-pill me-2 dropdown-toggle bg-secondary-subtle" data-bs-toggle="dropdown" aria-expanded="false">
                    Loại công việc
                </button>
                <ul  class="dropdown-menu  px-4 py-3" style="max-height: 300px;width: 330px; overflow-y: scroll;">
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updatePositionType('Toàn thời gian', $event)"
                            :checked="this.filter.positionType.includes('Toàn thời gian')"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Toàn thời gian
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updatePositionType('Bán thời gian', $event)"
                            :checked="this.filter.positionType.includes('Bán thời gian')"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Bán thời gian
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" @input="updatePositionType('Thời vụ', $event)"
                            :checked="this.filter.positionType.includes('Thời vụ')"
                            id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Thời vụ
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn-group">
                <button type="button" class="btn border border-0 text-black rounded-pill dropdown-toggle bg-secondary-subtle" data-bs-toggle="dropdown" aria-expanded="false">
                    Thời gian đăng
                </button>
                <ul class="dropdown-menu px-4 py-3" style="max-height: 300px;width: 200px; overflow-y: scroll;">
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" @input="updateDateTimeCreate('Hôm nay')" name="flexRadioDefault"
                            :checked="this.filter.dateTimeCreate.includes('Hôm nay')"
                            id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Hôm nay
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" @input="updateDateTimeCreate('3 ngày')" name="flexRadioDefault"
                            :checked="this.filter.dateTimeCreate.includes('3 ngày')"
                            id="flexRadioDefault2">
                            <label class="form-check-label" for="flexCheckDefault2">
                                3 ngày
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" @input="updateDateTimeCreate('1 tuần')" name="flexRadioDefault"
                            :checked="this.filter.dateTimeCreate.includes('1 tuần')"
                            id="flexRadioDefault3">
                            <label class="form-check-label" for="flexCheckDefault3">
                                1 tuần
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" @input="updateDateTimeCreate('2 tuần')" name="flexRadioDefault"
                            :checked="this.filter.dateTimeCreate.includes('2 tuần')"
                            id="flexRadioDefault4">
                            <label class="form-check-label" for="flexCheckDefault4">
                                2 tuần
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" @input="updateDateTimeCreate('1 tháng')"
                            :checked="this.filter.dateTimeCreate.includes('1 tháng')"
                            name="flexRadioDefault" id="flexRadioDefault5">
                            <label class="form-check-label" for="flexCheckDefault5">
                                1 tháng
                            </label>
                        </div>
                    </li>
                    <div class="mt-3">
                        <button type="button" class="btn btn-danger" @click="resetDateTimeCreate">Đặt lại</button>
                    </div>
                </ul>
            </div>
        </div>
        <div class="col-3"></div>
    </div>
    <div class="container-fluid px-5 mt-5">
        <div class="row ">
            <div class="col-9 p-5">
                <JobResult/>
            </div>
            <div class="col-3 ps-4">
                <JobSideBar />
            </div>
        </div>
    </div>
</template>

<style scoped>
#minRange{
    width: 100%;
}
#maxRange{
    width: 100%;
}
.filter-custom{
    position: fixed;
    background-color: white;
    width: 100%;
    margin: 0;
    padding: 0;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); 
    z-index: 50;
}
</style>

