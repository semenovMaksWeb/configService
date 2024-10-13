import { TypeVarEnum } from "@src/libs.module/list.type/libs.enum";

class ConvertService {
    convertVar(value: any, type: TypeVarEnum | undefined) {

        switch (type) {
            case undefined: {
                break;
            }
            case TypeVarEnum.string: {
                if (value && !Array.isArray(value)) {
                    value = value.toString();
                }
                if (Array.isArray(value)) {
                    value = JSON.stringify(value);
                }
                break;
            }
            case TypeVarEnum.number: {
                value = +value;
                if (isNaN(value)) {
                    value = null;
                }
                break;
            }
            case TypeVarEnum.boolean: {
                value = !!value;
                break;
            }
            case TypeVarEnum.json: {
                if (typeof value === "string") {
                    value = JSON.parse(value);
                }
                break;
            }
            case TypeVarEnum.array: {
                if (!Array.isArray(value)) {
                    value = [value];
                }
                break;
            }
        }
        return value;
    }

    convertReplaceAll(value: string, searchString: string, replaceString: string) {
        return value.replaceAll(searchString, replaceString);
    }

    convertValidString(value: string) {
        return value.replace(/\s{2,}/g, ' ')
    }
}

export const convertService = new ConvertService();