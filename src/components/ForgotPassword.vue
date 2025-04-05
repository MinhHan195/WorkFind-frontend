<template>
    <div class="row d-flex justify-content-center" style="min-height: 323px;">
        <div class="col-8">
            <h1>Quên mật khẩu</h1>
            <p>Hãy nhập email để chúng tôi gửi bạn link đặt lại mật khẩu.</p>
            <Form @submit="submit" :validation-schema="emailFormSchema">
                <div class="form-group mb-4">
                    <Field name="email" id="email" type="email" class="form-control" placeholder="Email" v-model="data.email"/>
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group text-end">
                    <button class="btn btn-primary">Xác nhận</button>
                </div>
            </Form>
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
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:login","submit:register","submit:email","submit:password"],
    data(){
        const emailFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("E-mail phải có giá trị")
                .email("E-mail không đúng")
                .max(50, "E-mail tối đa 50 ký tự"),
        })
        return{
            title:"",
            message: "",
            data : {
                email: "",
            },
            emailFormSchema,
        }
    },
    methods: {
        async submit(){
            try {
                const result = await authService.sendRequest(this.data);
                if(result.result){
                    console.log("result");
                    this.$router.push({name: "checkConfirmationPassword", params: {email: this.data.email}})
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