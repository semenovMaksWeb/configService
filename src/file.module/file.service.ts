import * as fsPromise from "node:fs/promises";
import * as fs from "fs";
import axios from "axios"

class FileService {
    async readFile(path: string, encoding: any = "utf-8") {
        const result = await fsPromise.readFile(path, { encoding });
        return result;
    }

    async writeFile(path: string, data: string) {
        await fsPromise.writeFile(path, data);
    }

    async directoryFile(path: string) {
        return (await fsPromise.readdir(path)).map((filePath: string) => {
            return `${path}/${filePath}`
        });
    }

    async downloadFileHttp(url: string, path: string, fileName: string) {
        const result = await axios.get(url, { responseType: "stream" });
        result.data.pipe(fs.createWriteStream(`${path}${fileName}`));
    }
}

export const fileService = new FileService();