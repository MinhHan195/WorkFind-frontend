import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";

export const useUserStore = defineStore("user",{
    state: () => {
        return {
            user: {},
            isLogged: false,
            listUsers: [],
        }
    },
    actions: {
        async logIn(data) {
            try {
                const result = await AuthService.logIn(data);
                if(result.result){
                    this.user = result.user;
                    this.isLogged = true;
                    return {
                        result: result.result,
                        message: result.message
                    }
                }
            } catch (error) {
                return error
            }
        },
        async fetchListUsers(){
            try {
                this.listUsers = await AuthService.getListUser();
            } catch (error) {
                console.log("Error get list users: ",error);
            }
        },

        async deleteUser(id){
            try {
                const result = await AuthService.deleteUser(id);
                if(result.message==="Xóa người dùng thành công"){
                    this.listUsers.forEach((user) => {
                        if(user._id===id){
                            const index = this.listUsers.indexOf(user);
                            this.listUsers.splice(index,1);
                        }
                    })
                }
                return result.message;
            } catch (error) {
                console.log("Error delete users: ",error);
            }
        }
    },
    persist: {
        storage: sessionStorage
    }
})