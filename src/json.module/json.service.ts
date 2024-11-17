import { TypeVarEnum } from "@src/libs.module/libs.module";
import { JsonMappingSchema } from "configRepoInterface";


class JsonService {
    public jsonToString(object: any) {
        return JSON.stringify(object);
    }

    public stringToJson(string: string) {
        console.trace(1);

        return JSON.parse(string);
    }

    public mappingJson(json: any, schemaList: JsonMappingSchema[], result: any = {}) {
        if (Array.isArray(json)) {
            this.mappingJsonArray(json, schemaList, result);
            return;
        }
        this.mappingJsonObject(json, schemaList, result);
        return result;
    }

    private mappingJsonObject(json: any, schemaList: JsonMappingSchema[], result: any) {
        for (const schema of schemaList) {
            let root = json;
            if (schema.init) {
                result[schema.key] = this.initMapping(schema.type);
            }

            if (schema.root) {
                root = this.getJsonElement(json, schema.root);
            }

            if (schema.children) {
                this.mappingJson(root, schema.children, result[schema.key]);
            }

            if (schema.path && !schema.init) {
                result[schema.key] = this.getJsonElement(json, schema.path);
            }

            if (schema.const && !schema.init) {
                result[schema.key] = schema.const;
            }
        }
    }

    private mappingJsonArray(json: any, schema: JsonMappingSchema[], result: any) {
        for (const itemJson of json) {
            result.push({});
            this.mappingJsonObject(itemJson, schema, result[result.length - 1])
        }
    }

    private initMapping(type: string) {
        switch (type) {
            case TypeVarEnum.array:
                return [];
        }
    }

    private getJsonElement(json: any, pathList: string[]) {
        let link = json;
        for (const path of pathList) {
            if (!link) {
                return null;
            }
            link = link[path];
        }
        return link;
    }
}

export const jsonService = new JsonService();
