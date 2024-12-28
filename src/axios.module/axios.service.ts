import axios, { AxiosRequestConfig } from "axios";
import { StoreConfig, StoreConfigElement } from "configRepoInterface";

interface CommandAxios {
    type: StoreConfigElement,
    params?: StoreConfig[],
    headers?: StoreConfig[],
    data?: StoreConfig[],

}

class AxiosService {
    public configRunAxios() {

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