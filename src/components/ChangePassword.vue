<template>
    <div class="row d-flex justify-content-center" style="min-height: 323px;">
        <div class="col-8">
            <h3 class="text-center fw-bold">ĐỔI MẬT KHẨU</h3>
            <div class="mt-3">
                <Form @submit="submit" :validation-schema="passwordFormSchema">
                    <div class="form-group mb-4">
                        <Field name="password" id="password" type="password" placeholder="Mật khẩu mới" class="form-control" v-model="data.newPassword"/>
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="form-group mb-4">
                        <Field name="confirmPassword" id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới" class="form-control" v-model="data.confirmNewPassword"/>
                        <ErrorMessage name="confirmPassword" class="error-feedback" />
                    </div>
                    <div class="form-group text-end">
                        <button class="btn btn-primary">Xác nhận</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>

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
import * as yup from "yup";
import {Form, Field, ErrorMessage} from "vee-validate";
import authService from "@/services/auth.service";
import { Modal } from 'bootstrap';
export default{
    props:{
        id: {type: String, default:""}
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data(){
        const passwordFormSchema = yup.object().shape({
            password: yup
                .string()
                .required("Mật khẩu không được trống")
                .min(6,"Mật khẩu phải ít nhất 6 ký tự")
                .max(30, "Mật khẩu tối đa 30 ký tự"),
            confirmPassword: yup
                .string()
                .required("Mật khẩu xác nhận không được trống")
                .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
        })
        return{
            passwordFormSchema,
            data: {
                userId: this.id,
                newPassword: "",
                confirmNewPassword: ""
            },
            title:"",
            message: ""
        }
    },
    methods: {
        async submit(){
            try {
                const result = await authService.resetPassword(this.data);
                if(result.result){
                    this.title="Thông báo"
                    this.message= result.message;
                    const myModal = new Modal(document.getElementById('exampleModal'));
                    myModal.show()
                    this.$router.push({name:"login"});
                }
            } catch (error) {
                this.title="Thông báo lỗi"
                this.message= error.response.data.message;
                const myModal = new Modal(document.getElementById('exampleModal'));
                myModal.show()
            }
        }
    },
}
</script>