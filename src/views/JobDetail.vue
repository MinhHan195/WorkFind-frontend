<template>
    <AppHeader />
    <div class="bg-body-secondary m-0 p-0">
        <div class="container py-4 bg-body-secondary">
            <div class="row d-flex justify-content-center bg-body-secondary">
                <div class="col-7 p-0  m-0 pb-10px bg-white rounded-2" style=" height: auto;">
                    <div class=" rounded-2" style="width: 100%; overflow: hidden;">
                        <div style="width: 100%;">
                            <img src="../assets/banner/default_banner_2.svg" alt="" style="width: 100%;">
                        </div>
                        <div class="row px-4 pt-2">
                            <div class="col-2">
                                <div class="rounded-3 avatar-custom">
                                    <img src="../assets/avatar_placeholder.png" alt="" class="img-fluid">
                                </div>
                            </div>
                            <div class="col-10 ps-3">
                                <h3 class="fw-bold">{{ job.jobName }}</h3>
                                <h6 class="fw-normal">{{ job.nameCompany }}</h6>
                            </div>
                        </div>
                        <div class="px-4">
                            <table class="mb-3">
                                <tbody>
                                    <tr class="align-top">
                                        <td><i class="fa-solid fa-location-dot fa-xl"></i></td>
                                        <td><p class="ms-3 ">{{ job.district }}, <b>{{ job.province }}</b></p></td>
                                    </tr>
                                    <tr class="align-top">
                                        <td><i class="fa-solid fa-coins fa-xl"></i></td>
                                        <td><p class="ms-3 text-primary">{{ job.salary }}</p></td>
                                    </tr>
                                    <tr class="align-top">
                                        <td><i class="fa-solid fa-suitcase fa-xl"></i></td>
                                        <td><p class="ms-3">{{ job.experienceLevel }} kinh nghiệm</p></td>
                                    </tr>
                                    <tr class="align-top">
                                        <td><i class="fa-solid fa-calendar-days fa-xl"></i></td>
                                        <td><p class="ms-3">Ngày đăng tuyển {{ this.getDate(job.dateTimeCreate) }}  |  Hết hạn trong: <b>{{ this.deadline(job.dateTimeCreate) }} Ngày tới</b></p></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <button type="button" class="btn btn-primary me-3" style="height: 55px; width: 200px;">Nộp đơn ngay</button>
                                <button type="button" class="btn btn-outline-primary ms-3"  v-if="isFavorite()" @click="removeFavoriteJob" style="height: 55px; width: 200px;">
                                    <i class="fa-solid fa-heart fa-xl"></i>
                                    Đã Lưu
                                </button>

                                <button type="button" class="btn btn-outline-primary ms-3"  v-else @click="addJobFavorite" style="height: 55px; width: 200px;">
                                    <i class="fa-regular fa-heart fa-xl"></i>
                                    Lưu
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    <div class="px-4 mt-3 container" style="position: relative;">
                        <div class="nav-bar-custom mb-5 shadow-sm ">
                            <ul class="nav">
                                <li class="nav-item"
                                v-for="(item, index) in menuNav"
                                :key="index"
                                @click="setActiveIndex(index)"
                                >
                                    <div 
                                    :class="['nav-custom fw-light', {'nav-custom-active': activeIndex===index}]">
                                        <a :href="item.id" style="all: unset; cursor: pointer;">{{item.lable}}</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="fw-bold text-primary target"  id="jobDescipttion">Mô tả công việc</h4>
                            <p>{{ job.jobDescription }}</p>
                        </div>
                        <div>
                            <h4 class="fw-bold text-primary">Phúc lợi</h4>
                            <p>{{ job.benefits }}</p>
                        </div>
                        <div>
                            <h4 class="fw-bold text-primary target" id="experience">Kinh nghiệm / Kỹ năng chi tiết</h4>
                        </div>
                        <div>
                            <h4 class="fw-bold text-primary" id="detail">Mô tả</h4>
                            <div class="row d-flex justify-content-center mb-4">
                                <div class="col-6 pe-2 ">
                                    <div class="rounded-2 text-secondary p-3" style="background-color: #EFF6FF; height: 100%;">
                                        <table>
                                            <tbody>
                                                <tr class="align-top">
                                                    <td><i class="fa-solid fa-inbox fa-xl me-3"></i></td>
                                                    <td>
                                                        <p class="mb-1">Loại công việc</p>
                                                        <p class="fw-bold">{{ job.positionType }}</p>
                                                    </td>
                                                </tr>
                                                <tr class="align-top">
                                                    <td><i class="fa-solid fa-layer-group fa-xl me-3"></i></td>
                                                    <td>
                                                        <p class="mb-1">Cấp bậc</p>
                                                        <p class="fw-bold">{{ job.careerLevel }}</p>
                                                    </td>
                                                </tr>
                                                <tr class="align-top">
                                                    <td><i class="fa-solid fa-graduation-cap fa-xl me-3"></i></td>
                                                    <td>
                                                        <p class="mb-1">Học vấn</p>
                                                        <p class="fw-bold">{{ job.educationLevel }}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-6 ps-2">
                                    <div class="rounded-2 text-secondary p-3" style="background-color: #EFF6FF; height: 100%;">
                                        <table>
                                            <tbody>
                                                <tr class="align-top">
                                                    <td><i class="fa-solid fa-briefcase fa-xl me-3"></i></td>
                                                    <td>
                                                        <p class="mb-1">Kinh nghiệm</p>
                                                        <p class="fw-bold">{{ job.experienceLevel}}</p>
                                                    </td>
                                                </tr>
                                                <tr class="align-top">
                                                    <td><i class="fa-solid fa-venus-mars fa-xl me-3"></i></td>
                                                    <td>
                                                        <p class="mb-1">Cấp bậc</p>
                                                        <p class="fw-bold">{{ job.gender }}</p>
                                                    </td>
                                                </tr>
                                                <tr class="align-top">
                                                    <td><i class="fa-solid fa-user fa-xl me-3"></i></td>
                                                    <td>
                                                        <p class="mb-1">Tuổi</p>
                                                        <p class="fw-bold">12</p>
                                                    </td>
                                                </tr>
                                                <tr class="align-top">
                                                    <td><i class="fa-solid fa-object-group fa-xl me-3"></i></td>
                                                    <td>
                                                        <p class="mb-1">Ngành nghề</p>
                                                        <p class="fw-bold">{{ job.typeJob }}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="fw-bold text-primary target" id="contact">Thông tin liên hệ</h4>
                            <div class="rounded-2 text-secondary p-3 mb-4" style="background-color: #EFF6FF;">
                                <table>
                                    <tbody>
                                        <tr class="align-top">
                                            <td><i class="fa-solid fa-circle-user fa-lg me-3" style="color: #ff0000;"></i></td>
                                            <td><p>Tên liên hệ: <b>{{ job.staffName }}</b></p></td>
                                        </tr>
                                        <tr class="align-top">
                                            <td><i class="fa-solid fa-location-crosshairs fa-lg me-3" style="color: #00b315;"></i></td>
                                            <td><p>{{ job.addressContact }}</p></td>
                                        </tr>
                                        <tr class="align-top">
                                            <td><i class="fa-solid fa-phone fa-lg me-3" style="color: #cae407;"></i></td>
                                            <td><p><b>{{ job.phone }}</b></p></td>
                                        </tr>
                                        <tr class="align-top">
                                            <td><i class="fa-solid fa-note-sticky fa-lg me-3" style="color: #ab00c2;"></i></td>
                                            <td><p><b>{{ job.descriptionContact }}</b></p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <h4 class="fw-bold text-primary target" id="aboutCompany">Về công ty</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.target{
    scroll-margin-top: 150px;
}
.avatar-custom{
    position: relative;
    width: 110px; 
    height: 110px; 
    overflow: hidden;   
    top: -33px;
}
.nav{
    width: 100%;
    border-bottom: 0.5px solid gray;
}
.nav-custom:hover{
    cursor: pointer;
}
.nav-custom{
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-right: 20px;
    
}

.nav-custom-active{
    color: #0d6efd !important;
    border-bottom: 2px solid #0d6efd;
}
.nav-bar-custom{
    position: sticky;
    top: 86px;
    background-color: white;
}
</style>

<script>
import AppHeader from '@/components/AppHeader.vue';
import { useJobStore } from '@/store/job.store';
import { useUserStore } from '@/store/user.store';
import { format, parseISO, addMonths, differenceInDays} from 'date-fns';
export default{
    created(){
        this.userStore = useUserStore();
        this.jobStore = useJobStore();
        this.job = this.jobStore.findJobById(this.id);
    },
    components:{
        AppHeader,
    },
    props: {
        id: {type: String, default: {}}
    },
    data(){
        return {
            job: {},
            activeIndex: -1,
            menuNav: [
            {lable: "Mô tả", id:"#jobDescipttion"},
            {lable: "Kỹ năng yêu cầu", id:"#experience"},
            {lable: "Chi tiết công việc", id:"#detail"},
            {lable: "Liên hệ", id:"#contact"},
            {lable: "Về công ty", id: "#aboutCompany"}
        ]
        }
    },
    methods:{
        getDate(date){
            const day = parseISO(date)
            return format( day, 'dd/MM/yyyy')
        },
        deadline(date){
            const day = parseISO(date);
            const dl = addMonths(day, 2);
            const today = new Date();
            return differenceInDays(dl, today, );
        },
        setActiveIndex(index){
            this.activeIndex = index;
        },
        isFavorite(){
            if(this.userStore.user.listUserFavoriteJob===undefined){
                return false;
            }
            return (this.userStore.user.listUserFavoriteJob.includes(this.job._id))
        },
        addJobFavorite(){
            this.userStore.addJobFavorite({jobId: this.job._id})
        },
        async removeFavoriteJob(){
            const result = await this.userStore.deleteJobFavorite(this.job._id)
            
        },
    },
}
</script>