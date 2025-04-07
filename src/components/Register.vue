<template>
    <div class="p-3 rounded-2" style="background-color: white;">
        <h5 class="fw-bold text-center pb-4">Đăng ký</h5>
        <div style="width: 400px;">
            <Form :validation-schema="SignUpFormSchema" v-slot="{ handleSubmit, setFieldError }">
                <div class="form-group mb-4">
                    <Field name="name" id="name" type="text" placeholder="Họ và tên" class="form-control" v-model="data.name"/>
                    <p class="fw-lighter mb-0" style="font-size: 13px;">Hãy dùng tên thật. Nhà tuyển dụng có thể thấy tên bạn khi xem hồ sơ</p>
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="form-group mb-3">
                    <Field name="email" id="email" type="email" placeholder="Email" class="form-control" v-model="data.email"/>
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group mb-3">
                            <Field name="password" id="password" type="password" placeholder="Mật khẩu" class="form-control" v-model="data.password"/>
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group mb-3">
                            <Field name="confirmPassword" id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" class="form-control" v-model="data.confirmPassword"/>
                            <ErrorMessage name="confirmPassword" class="error-feedback" />
                        </div>
                    </div>
                </div>
                
                <div>
                    <div  class="mb-4">
                        <table  class="text-start">
                            <tr class="align-top">
                                <td>
                                    <input type="checkbox" @input="activePassword($event)" class="form-check-input">
                                </td>
                                <td>
                                    <label class="ms-2 mb-3"> Hiển thị mật khẩu</label>
                                </td>
                            </tr>
                            <tr class="align-top">
                                <td>
                                    <input type="checkbox" name="policy" id="policy" v-model="policy" @input="acceptPolicy($event)" class="form-check-input">
                                </td>
                                <td>
                                    <label class="ms-2"> Tôi đồng ý với việc xử lý và cung cấp thông tin dữ liệu cá nhân, đồng thời đã đọc và đồng ý với Thoả thuận sử dụng và Quy định bảo mật của WorkFind.</label>
                                    <ErrorMessage name="policy" class="error-feedback ms-2" />
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
                <div class="form-group pb-4">
                    <button class="btn btn-primary" type="button" @click="handleSubmit((values) => submit(values, setFieldError))" style="width: 100%;">Đăng ký</button>
                </div>
            </Form>
        </div>
        <div class=" text-center pb-4">
            <span class="fw-light pb-3">Đã có tài khoản? </span><router-link :to="{name: 'login'}" class="fw-bold" style="text-decoration: none;">Đăng nhập</router-link>
        </div>
    </div>
    
    <div class=" text-center pt-3 pb-4">
        <span class="fw-bold text-white">Bạn là nhà tuyển dụng? </span><router-link :to="{name: 'signin'}" class="fw-bold" style="text-decoration: none;">Đăng ký tài khoản nhà tuyển dụng</router-link>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Thông báo lỗi</h1>
            </div>
            <div class="modal-body">
                {{ this.message }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
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
import authService from "@/services/auth.service";
import {Form, Field, ErrorMessage, useForm} from "vee-validate";
import * as yup from "yup";
import { Modal } from 'bootstrap';
export default{
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data(){
        const SignUpFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên không được để trống")
                .max(50,"Tên tối đa 50 ký tự"),
            email: yup
                .string()
                .required("E-mail phải có giá trị")
                .email("E-mail không đúng")
                .max(50, "E-mail tối đa 50 ký tự"),
            password: yup
                .string()
                .required("Mật khẩu không được trống")
                .min(6,"Mật khẩu ít nhất 6 ký tự")
                .max(30, "Mật khẩu tối đa 30 ký tự"),
            confirmPassword: yup
                .string()
                .required("Mật khẩu xác nhận không được trống")
                .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
        })
        return{
            message:"",
            SignUpFormSchema,
            data: { 
                name:"",
                email:"",
                role: "user",
                password:"",
                confirmPassword:""
                
            },
            policy: false,
        }
    },
    methods:{
        activePassword(e){
            if(e.target.checked){
                document.getElementById("password").type = "text";
                document.getElementById("confirmPassword").type = "text";
            }else{
                document.getElementById("password").type = "password";
                document.getElementById("confirmPassword").type = "password";
            }
        },
        acceptPolicy(e){
            if(e.target.checked){
                this.policy=true
            }else{
                this.policy=false
            }
        },
        async submit(values, setFieldError){
            try {
                if(this.policy === false){
                    setFieldError('policy','Bạn phải đồng ý điều khoản.')
                }else{
                    const result = await authService.signIn(this.data);
                    if(result.result){
                        this.$router.push({name: "checkConfirmationEmail", params: {email: this.data.email}});
                    }else{
                        this.message= result.message;
                        const myModal = new Modal(document.getElementById('exampleModal'));
                        myModal.show()
                    }
                }
            } catch (error) {
                console.log(error);
                this.message= error.response.data.message;
                const myModal = new Modal(document.getElementById('exampleModal'));
                myModal.show()
            }
            
        }

    }
}
</script>