import createApiClient from "./api.service";

class CompanyService {
    constructor(baseUrl = "/api/company") {
        this.api = createApiClient(baseUrl);
    }

    async getListCompany() {
        const list = (await this.api.get("/")).data;
        return list.slice(0,8);
    }
}

export default new CompanyService();