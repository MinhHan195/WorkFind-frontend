import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";

export const useUserStore = defineStore("user",{
    state: () => {
        return {
            user: {test: true},
            isLogged: false
        }
    },
    actions: {
        async fetchUserData() {
            try {
                const result = await AuthService.checkLogin();
                if(result.logged){
                    this.user = await AuthService.getUser();
                    this.isLogged = true;
                }
            } catch (error) {
                console.log("Error get user data: ",error);
            }
        }
    },
    persist: {
        storage: sessionStorage
    }
})