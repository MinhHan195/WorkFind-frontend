<template>
    
    <Form @submit="submit" :validation-schema="passwordFormSchema">
        <div class="container px-5 mx-5 pt-4">
            <div class="mb-5">
                <h3 class="fw-bold">Thay đổi mật khẩu</h3>
            </div>
            <div class="form-group mb-4">
                <Field name="oldPassword" id="oldPassword" type="password" placeholder="Mật khẩu hiện tại" class="form-control" v-model="data.oldPassword"/>
                <div class="row mt-2">
                    <div class="col-8">
                        <ErrorMessage name="oldPassword" class="error-feedback" />
                    </div>
                    <div class="col-4 text-end">
                        <input type="checkbox" @input="activePassword('oldPassword',$event)" class="form-check-input">
                        <span> Hiển thị mật khẩu</span>
                    </div>
                </div>
            </div>
            <div class="form-group mb-4">
                <Field name="newPassword" id="newPassword" type="password" placeholder="Mật khẩu mới" class="form-control" v-model="data.newPassword"/>
                <div class="row mt-2">
                    <div class="col-8">
                        <ErrorMessage name="newPassword" class="error-feedback" />
                    </div>
                    <div class="col-4 text-end">
                        <input type="checkbox" @input="activePassword('newPassword',$event)" class="form-check-input">
                        <span> Hiển thị mật khẩu</span>
                    </div>
                </div>
            </div>
            <div class="form-group mb-4">
                <Field name="confirmNewPassword" id="confirmNewPassword" type="password" placeholder="Nhập lại mật khẩu mới" class="form-control" v-model="data.confirmNewPassword"/>
                <div class="row mt-2">
                    <div class="col-8">
                        <ErrorMessage name="confirmNewPassword" class="error-feedback" />
                    </div>
                    <div class="col-4 text-end">
                        <input type="checkbox" @input="activePassword('confirmNewPassword',$event)" class="form-check-input">
                        <span> Hiển thị mật khẩu</span>
                    </div>
                </div>
            </div>
            <div class="form-group text-end">
                <button type="submit" class="btn btn-primary">Xác nhận</button>
            </div>
        </div>  
    </Form>

<div class="modal fade" id="exampleModal" tabindex="-1" >
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
            </div>
            <div class="modal-body">
                {{ this.message }}
            </div>
            <div class="modal-footer">
                <button type="button" 
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
</style>

<script>
import {Form, Field, ErrorMessage, useForm} from "vee-validate";
import * as yup from "yup";
import { useUserStore } from "@/store/user.store";
import { Modal } from 'bootstrap';
import authService from "@/services/auth.service";
export default{
    created(){
        this.userStore = useUserStore();
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data(){
        const passwordFormSchema=yup.object().shape({
            oldPassword: yup
                .string()
                .required("Mật khẩu không được trống")
                .min(6,"Mật khẩu ít nhất 6 ký tự")
                .max(30, "Mật khẩu tối đa 30 ký tự"),
            newPassword: yup
                .string()
                .required("Mật khẩu không được trống")
                .min(6,"Mật khẩu ít nhất 6 ký tự")
                .max(30, "Mật khẩu tối đa 30 ký tự"),
            confirmNewPassword: yup
                .string()
                .required("Mật khẩu xác nhận không được trống")
                .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp"),
        })
        return{
            data: {},
            passwordFormSchema,
            title: "",
            message: ""
        }
    },
    methods:{
        activePassword(id,e){
            if(e.target.checked){
                document.getElementById(id).type = "text";
            }else{
                document.getElementById(id).type = "password";
            }
        },
        async submit(){
            try {
                const result = await authService.changePassword(this.data);
                if(result.result){
                    this.title="Thông báo"
                    this.message= result.message;
                    const myModal = new Modal(document.getElementById('exampleModal'));
                    myModal.show()
                    this.$router.push({name:"information"});
                }
            } catch (error) {
                this.title="Thông báo lỗi"
                this.message= error.response.data.message;
                const myModal = new Modal(document.getElementById('exampleModal'));
                myModal.show()
            }
        }
    }
}
</script>