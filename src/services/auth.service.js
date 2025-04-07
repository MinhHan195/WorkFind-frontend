import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/accounts") {
        this.api = createApiClient(baseUrl);
    }

    async getUser() {
        return (await this.api.get("/login")).data;
    }

    async checkLogin() {
        return (await this.api.get("/login/check"))
    }

    async signIn(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async activeAccount(token, id){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.get("/verify?token="+token+"&id="+id)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async logIn(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/login",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async sendRequest(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/reset/reset_request",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async resetPassword(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post("/reset/password",data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async update(data, id){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post(`/${id}`,data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async changePassword(data){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.post(`/changePassword`,data)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }

    async deleteAccount(id){
        document.body.style.cursor = "wait";
        try{
            return (await this.api.delete(`/${id}`)).data;
        }finally{
            document.body.style.cursor = "default";
        }
    }
    
}

export default new AuthService();