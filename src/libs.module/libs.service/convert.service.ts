import { TypeVarEnum } from "@src/libs.module/list.type/libs.enum";
import { StoreConvert } from "@src/store.module/store.config/store.config.interface";

class ConvertService {
    public convertVar(value: any, convert: StoreConvert) {

        if (!convert?.type) {
            return value;
        }

        switch (convert.type) {
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
            case TypeVarEnum.RegExp:
                value = new RegExp(value, convert.regExpFlag);
                break;
        }
        return value;
    }

    public convertReplaceAll(value: string, searchString: string, replaceString: string) {
        return value.replaceAll(searchString, replaceString);
    }

    public convertValidString(value: string) {
        return value.replace(/\s{2,}/g, ' ')
    }

    public convertListInKeyArray(list: any[], key: string) {
        return list.map((e) => e[key]);
    }
}

export const convertService = new ConvertService();