import * as fs from "node:fs/promises";

class FileService {
    async readFile(path: string, encoding: any = "utf-8") {
        const result = await fs.readFile(path, { encoding });
        return result;
    }

    async writeFile(path: string, data: string) {
        await fs.writeFile(path, data);
    }
    async directoryFile(path: string) {
        return (await fs.readdir(path)).map((filePath: string) => {
            return `${path}/${filePath}`
        });
    }
}

export const fileService = new FileService();