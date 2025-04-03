import createApiClient from "./api.service";

class JobService {
    constructor(baseUrl = "/api/jobs") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/")).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async getListFavoriteJobs() {
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/favorite")).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }
    async getListJobType(){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/filter")).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }
    async findByFilter(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/fetch", data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }
    async findByKey(key, province){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get(`/fetch/${key}/${province}`)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }
}
export default new JobService();