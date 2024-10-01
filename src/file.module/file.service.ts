import * as fs from "node:fs/promises";

class FileService {
    async readFile(path: string, encoding: any = "utf-8") {
        const result = await fs.readFile(path, { encoding });
        return result;
    }

    async writeFile(path: string, data: string) {
        console.log(data);        
        await fs.writeFile(path, data);
    }
}

export const fileService = new FileService();