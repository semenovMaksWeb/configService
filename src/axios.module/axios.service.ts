import axios, { AxiosRequestConfig } from "axios";

class AxiosService {

    public async runAxios(url: string, type: string, data: any, config: any) {
        switch (type) {
            case "post":
                return await this.postAxios(url, data, config);
            case "get":
                return await this.getAxios(url, config);

            case "delete":
                return await this.deleteAxios(url, config);

            case "put":
                return await this.putAxios(url, data, config);
        }
    }

    public async getAxios(url: string, config: AxiosRequestConfig) {
        return await axios.get(url, config);
    }

    public async postAxios(url: string, data: any, config: AxiosRequestConfig) {
        return await axios.post(url, data, config);
    }

    public async putAxios(url: string, data: any, config: AxiosRequestConfig) {
        return await axios.put(url, data, config);
    }

    public async deleteAxios(url: string, config: AxiosRequestConfig) {
        return await axios.delete(url, config);
    }
}

export const axiosService = new AxiosService();