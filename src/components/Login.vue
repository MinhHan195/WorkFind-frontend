<template>
    <div class="p-3 rounded-2" style="background-color: white;">
        <h5 class="fw-bold text-center pb-4">Đăng nhập</h5>
        <div style="width: 350px;">
            <Form @submit="submit" :validation-schema="LogInFormDataSchema">
                <div class="form-group mb-3">
                    <Field name="email" id="email" type="email" placeholder="Email" class="form-control" v-model="data.email" />
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group mb-3">
                    <Field name="password" id="password" type="password" placeholder="Mật khẩu" class="form-control" v-model="data.password"/>
                    <ErrorMessage name="password" class="error-feedback" />
                </div>
                <div class="d-flex justify-content-between mb-4">
                    <div>
                        <input type="checkbox" @input="activePassword($event)" class="form-check-input">
                        <span> Hiển thị mật khẩu</span>
                    </div>
                    <div>
                        <router-link :to="{name: 'forgotPassword'}">Quên mật khẩu?</router-link>
                    </div>
                </div>
                <div class="form-group pb-4">
                    <button class="btn btn-primary" style="width: 100%;">Đăng nhập</button>
                </div>
            </Form>
        </div>
        <div class=" text-center pb-4">
            <span class="fw-light pb-3">Chưa có tài khoản? </span><router-link :to="{name: 'signin'}" class="fw-bold" style="text-decoration: none;">Đăng ký</router-link>
        </div>
    </div>
    
    <div class=" text-center pt-3 pb-4">
        <span class="fw-bold text-white">Bạn là nhà tuyển dụng? </span><router-link :to="{name: 'signin'}" class="fw-bold" style="text-decoration: none;">Đăng nhập</router-link>
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
import {Form, Field, ErrorMessage} from "vee-validate";
import authService from "@/services/auth.service";
import { Modal } from 'bootstrap';
import { useUserStore } from "@/store/user.store";
import * as yup from "yup";
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
        const LogInFormDataSchema = yup.object().shape({
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
        });
        return {
            LogInFormDataSchema,
            message: "",
            title: "",
            data: {
                email: "",
                password: ""
            }
        }
    },
    methods:{
        activePassword(e){
            if(e.target.checked){
                document.getElementById("password").type = "text";
            }else{
                document.getElementById("password").type = "password";
            }
        },
        async activeAccount(token, id){
            try {
                const result = await authService.activeAccount(token, id);
                console.log(result);
                if(result.result){
                    this.title="Thông báo"
                    this.message=result.message
                    const myModal = new Modal(document.getElementById('exampleModal'));
                    myModal.show()
                }
            } catch (error) {
                this.title="Thông báo lỗi"
                this.message= error.response.data.message;
                const myModal = new Modal(document.getElementById('exampleModal'));
                myModal.show()
            }
        },
        async submit(){
            try {
                const result = await this.userStore.logIn(this.data);
                if(result.result){
                    this.title="Thông báo"
                    this.message=result.message
                    const myModal = new Modal(document.getElementById('exampleModal'));
                    myModal.show()
                    this.$router.push({name: "home"});
                }
            } catch (error) {
                this.title="Thông báo lỗi"
                this.message= error.response.data.message;
                const myModal = new Modal(document.getElementById('exampleModal'));
                myModal.show()
            }
        }
    },
    mounted(){
        if(this.$route.query.token!==undefined && this.$route.query.id!==undefined){
            this.activeAccount(this.$route.query.token, this.$route.query.id);
        }
    }
}
</script>