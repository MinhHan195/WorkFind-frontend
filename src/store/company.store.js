import { defineStore } from "pinia";
import CompanyService from "@/services/company.service";
export const useCompanyStore = defineStore("company", {
    state: () => {
        return {
           listCompany: []
        }
    },
    actions: {
        async getListCompany() {
            try {
                this.listCompany = await CompanyService.getListCompany();
            } catch (error) {
                console.log(error)
            }
        }
    }
})