<template>
    <Form @submit="submit" :validation-schema="UserFormSchema">
        <div>
            <div>
                <h3 class="fw-bold">Tài khoản</h3>
                <p class="text-secondary">Hãy cập nhật thông tin mới nhất.</p>
                <p class="text-secondary">Thông tin cá nhân dưới đây sẽ tự động điền khi bạn tạo hồ sơ mới.</p>
            </div>
            <div>
                <!-- hinh dai dien -->
            </div>
        </div>
        <div class="mt-5 pt-4">
            <div class="row form-custom pb-3 mb-5">
                <div class="col-3">
                    <label for="name" class="fs-5">Họ và tên</label>
                </div>
                <div class="form-group col-9">
                    <Field name="name" id="name" type="text" class="input-custom fs-5 fw-semibold" v-model="data.name"/>
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
            </div>
            <div class="row form-custom pb-2 mb-5">
                <div class="col-3">
                    <label for="email" class="fs-5">Địa chỉ email</label>
                </div>
                <div class="form-group col-9">
                    <Field name="email" id="email" type="email" class="input-custom fs-5 fw-semibold" v-model="data.email"/>
                    <p class="p-0 text-secondary">Đây là địa chỉ email để đăng nhập. Chúng tôi cũng sẽ gửi thông báo đến địa chỉ này.</p>
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
            </div>
            <div class="row form-custom pb-3 mb-5">
                <div class="col-3">
                    <label for="gender" class="fs-5">Giới tính</label>
                </div>
                <div class="form-group col-9">
                    <Field name="gender" id="gender" as="select" class="input-custom fs-5 fw-semibold" v-model="data.gender">
                        <option value="" disabled selected hidden>...</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </Field>
                    <ErrorMessage name="gender" class="error-feedback" />
                </div>
            </div>
            <div class="row form-custom pb-2 mb-5">
                <div class="col-3">
                    <label for="birthDay" class="fs-5">Ngày sinh</label>
                </div>
                <div class="form-group col-9">
                    <Field name="birthDay" id="birthDay" type="date" class="input-custom fs-5 fw-semibold" v-model="data.birthDay"/>
                    <ErrorMessage name="birthDay" class="error-feedback" />
                </div>
            </div>
            <div class="row form-custom pb-3 mb-5">
                <div class="col-3">
                    <label for="marriageStatus" class="fs-5">Tình trạng hôn nhân</label>
                </div>
                <div class="form-group col-9">
                    <Field name="marriageStatus" id="marriageStatus" as="select" class="input-custom fs-5 fw-semibold" v-model="data.marriageStatus">
                        <option value="" disabled selected hidden>...</option>
                        <option value="Chưa kết hôn">Chưa kết hôn</option>
                        <option value="Đã kết hôn">Đã kết hôn</option>
                    </Field>
                    <ErrorMessage name="marriageStatus" class="error-feedback" />
                </div>
            </div>
            <div class="row form-custom pb-3 mb-5">
                <div class="col-3">
                    <label for="phone" class="fs-5">Số điện thoại</label>
                </div>
                <div class="form-group col-9">
                    <Field name="phone" id="phone" type="text" class="input-custom fs-5 fw-semibold" placeholder="Thêm số điện thoại của bạn" v-model="data.phone"/>
                    <ErrorMessage name="phone" class="error-feedback" />
                </div>
            </div>
            <div class="row form-custom pb-3 mb-5">
                <div class="col-3">
                    <label class="fs-5">Tỉnh / Huyện</label>
                </div>
                <div class="form-group col-9">
                    <div class="row">
                        <div class="col-6 pe-2">
                            <Field name="province" id="province" as="select" class="input-custom fs-5 fw-semibold" v-model="data.province">
                                <option value="" disabled selected hidden>Chọn tỉnh</option>
                                <option
                                v-for="(province, index) in provinces"
                                :key="province.code"
                                :value="province.name"
                                >{{ province.name }}</option>
                            </Field>
                            <ErrorMessage name="province" class="error-feedback" />
                        </div>
                        <div class="col-6 ps-2">
                            <Field name="district" id="district" as="select" class="input-custom fs-5 fw-semibold" v-model="data.district">
                                <option value="" disabled selected >Chọn huyện</option>
                                <option
                                v-for="(district, index) in district"
                                :key="district.code"
                                :value="district.name">{{ district.name }}</option>
                            </Field>
                            <ErrorMessage name="district" class="error-feedback" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row form-custom pb-3 mb-5">
                <div class="col-3">
                    <label for="address" class="fs-5">Địa chỉ</label>
                </div>
                <div class="form-group col-9">
                    <Field name="address" id="address" type="text" class="input-custom fs-5 fw-semibold" placeholder="Thêm địa chỉ" v-model="data.address"/>
                    <ErrorMessage name="address" class="error-feedback" />
                </div>
            </div>
            <div>
                <button class="btn btn-primary w-100 m-0">Lưu</button>
            </div>
        </div>
    </Form>
    <div class="btn-delete mt-3" @click="confirmdeleteAcount">
        <i class="fa-solid fa-circle-minus me-2"></i><span>Xóa tài khoản</span>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
            </div>
            <div class="modal-body">
                {{ message }}
            </div>
            <div class="modal-footer">
                <button type="button" v-if="title==='Cảnh báo'"
                class="btn btn-danger"
                @click="deleteAccount"
                data-bs-dismiss="modal">Xóa</button>
                <button type="button" v-else
                :class="['btn', {'btn-danger': title==='Thông báo lỗi'}, {'btn-success': title==='Thông báo'} ]" 
                data-bs-dismiss="modal">Đóng</button>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.error-feedback{
    color: red;
}
.input-custom{
    width: 100%;
    border: none;
    outline: none;
}
.form-custom{
    border-bottom: 1px solid rgb(203, 201, 201);
}
.btn-delete{
    color: red;
    cursor: pointer;
}
</style>

<script>
import {Form, Field, ErrorMessage, useForm} from "vee-validate";
import * as yup from "yup";
import { Modal } from 'bootstrap';
import { useUserStore } from "@/store/user.store";
import { getProvinces, getDistrictsByProvinceCode } from 'sub-vn'
import authService from "@/services/auth.service";
export default{
    created(){
        this.userStore = useUserStore();
        this.provinces = getProvinces()
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        index: Number
    },
    data(){
        const UserFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên không được để trống")
                .max(50,"Tên tối đa 50 ký tự"),
            email: yup
                .string()
                .required("E-mail phải có giá trị")
                .email("E-mail không đúng")
                .max(50, "E-mail tối đa 50 ký tự"),
            gender: yup
                .string()
                .oneOf(['Nam', 'Nữ', 'Khác'], "Giới tính không hợp lệ")
                .required(),
            birthDay: yup
                .date()
                .required("Nhập ngày sinh"),
            marriageStatus: yup
                .string()
                .oneOf(['Chưa kết hôn', 'Đã kết hôn'], "Dữ liệu không hợp lệ")
                .required(),
            phone: yup
                .string()
                .required("Số điện thoại phải có giá trị")
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
            province: yup  
                .string()
                .required("Vui lòng chọn tỉnh"),
            district: yup  
                .string()
                .required("Vui lòng chọn huyện"),
            address: yup
                .string()
                .required("Vui lòng nhập địa chỉ")
                .min(5, "Địa chỉ tối thiểu 5 ký tự")
                .max(100, "Địa chỉ nhập tối đa 100 ký tự"),
            
        })
        return{
            message:"",
            UserFormSchema,
            data: {},
            policy: false,
            district: [], 
            title: "",
            message: ""
        }
    },
    watch: {
        "data.province": function (newV, oldV){
            this.getDistrict()
        }
    },
    methods:{
        getDistrict(){
            const province = this.provinces.find( item => item.name === this.data.province)
            if(province!==undefined){
                this.district = getDistrictsByProvinceCode(province.code)
            }
        },
        async submit(){
            try {
                const result = await this.userStore.update(this.data);
                if(result.result){
                    this.title = "Thông báo"
                    this.message= result.message;
                    const myModal = new Modal(document.getElementById('exampleModal'));
                    myModal.show()
                }
            } catch (error) {
                console.log("result")
                this.title = "Thông báo lỗi"
                this.message= error.response.data.message;
                const myModal = new Modal(document.getElementById('exampleModal'));
                myModal.show()
            }
        },
        confirmdeleteAcount(){
            this.title = "Cảnh báo"
            this.message = "Bạn muốn xóa tài khoản?"
            const myModal = new Modal(document.getElementById('exampleModal'));
            myModal.show()
        },

        async deleteAccount(){
            try {
                const result = await authService.deleteAccount(this.userStore.user.accountId);
                if(result.result){
                    this.userStore.$reset();
                    this.title = "Thông báo",
                    this.message = result.message
                    const myModal = new Modal(document.getElementById('exampleModal'));
                    myModal.show()
                    this.$router.push({name:"home"});
                }
            } catch (error) {
                console.log("result")
                this.title = "Thông báo lỗi"
                this.message= error.response.data.message;
                const myModal = new Modal(document.getElementById('exampleModal'));
                myModal.show()
            }
        }
    },
    mounted(){
        this.data.name =  this.userStore.user.name;
        this.data.email =  this.userStore.user.email;
        this.data.gender = this.userStore.user.gender !== undefined ? this.userStore.user.gender: undefined;
        this.data.birthDay = this.userStore.user.birthDay !== undefined ? this.userStore.user.birthDay: undefined;
        this.data.marriageStatus = this.userStore.user.marriageStatus !== undefined ? this.userStore.user.marriageStatus: undefined;
        this.data.phone = this.userStore.user.phone !== undefined ? this.userStore.user.phone: undefined;
        this.data.province = this.userStore.user.province !== undefined ? this.userStore.user.province: undefined;
        this.data.district = this.userStore.user.district !== undefined ? this.userStore.user.district: undefined;
        this.data.address = this.userStore.user.address !== undefined ? this.userStore.user.address: undefined;
    }
}
</script>   