import { TypeVarEnum } from "@src/libs.module/list.type/libs.enum";

class ConvertService {
    convertVar(value: any, type: TypeVarEnum) {
        switch (type) {
            case TypeVarEnum.string: {
                if (value && !Array.isArray(value)) {
                    value = value.toString();
                }
                if (Array.isArray(value)) {
                    value = JSON.stringify(value);
                }
                return value;
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
}

export const convertService = new ConvertService();