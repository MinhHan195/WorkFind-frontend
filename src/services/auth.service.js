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

    
}

export default new AuthService();