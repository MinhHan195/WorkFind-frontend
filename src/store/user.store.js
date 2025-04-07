import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";
import jobService from "@/services/job.service";


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
            const result = await AuthService.logIn(data);
            if(result.result){
                this.user = result.user;
                this.isLogged = true;
                return {
                    result: result.result,
                    message: result.message
                }
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
        },

        async update(data){
            const result = await AuthService.update(data, this.user._id);
            if(result.result){
                this.user = result.user;
                return {
                result: result.result,
                message: result.message
                }
            }
        },

        async addJobFavorite(data){
            const result = await jobService.addJobFavorite(data);
            if(result.result){
                this.user.listUserFavoriteJob.push(data.jobId)
            }
        },

        async deleteJobFavorite(data){
            const result = await jobService.deleteJobFavorite(data);
            if(result.result){
                for(let i in this.user.listUserFavoriteJob){
                    if(this.user.listUserFavoriteJob[i]===data){
                        this.user.listUserFavoriteJob.splice(i,1);
                        break;
                    }
                }
                return true;
            }
            
        }
    },
    persist: {
        storage: sessionStorage
    }
})