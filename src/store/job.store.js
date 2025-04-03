import { defineStore } from "pinia";
import JobService from "@/services/job.service";
import { parseISO, compareAsc, compareDesc  } from "date-fns";

export const useJobStore = defineStore("job", {
    state: () => {
        return {
            list: [],
            filter: [],
            listJobResult: [],
        }
    },
    actions: {
        async getListJob() {
            try {
                this.list = await JobService.getAll();
                this.list.sort((a,b)=> compareAsc(parseISO(a.dateTimeCreate),parseISO(b.dateTimeCreate)))

            } catch (error) {
                console.log(error);
            }
        },
        async fetchJobType(){
            try {
                this.filter = await JobService.getListJobType();
            } catch (error) {
                console.log(error);
            }
        },
        async findByFilter(filter){
            try {
                this.listJobResult = await JobService.findByFilter(filter);
                this.sortNewToOld();
            } catch (error) {
                console.log(error);
            }
        },
        sortOldToNew(){
            this.listJobResult.sort((a,b)=> compareAsc(parseISO(a.dateTimeCreate),parseISO(b.dateTimeCreate)))
        },
        sortNewToOld(){
            this.listJobResult.sort((a,b)=> compareDesc(parseISO(a.dateTimeCreate),parseISO(b.dateTimeCreate)))
        },
        async findByKey(key, province){
            try {
                this.listJobResult = await JobService.findByKey(key, province);
                this.sortNewToOld();
            } catch (error) {
                console.log(error);
            }
        },
    },
    persist: {
        enabled: true,
        storage: sessionStorage
    }
})