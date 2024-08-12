import * as fs from "node:fs/promises";

class FileService {
    async readFile(path: string, encoding: any = "utf-8") {
        const result = await fs.readFile(path, { encoding });
        return result;
    }
}

export const fileService = new FileService();