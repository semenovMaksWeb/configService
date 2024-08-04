import { TypeVarEnum } from "@src/libs.module/list.type/libs.enum";

class ConvertService {
    convertVar(value: any, type: TypeVarEnum) {
        switch (type) {
            case TypeVarEnum.string: {
                if (value) {
                    value = value.toString();
                }
                break;
            }
            case TypeVarEnum.number: {
                value = +value;
                if (isNaN(value)) {
                    value = null;
                }
            }
            case TypeVarEnum.boolean: {
                value = !!value;
            }
            case TypeVarEnum.json: {
                if (typeof value === "string") {
                    value = JSON.parse(value);
                }
            }
            case TypeVarEnum.array: {
                if (!Array.isArray(value)) {
                    value = [value];
                }
            }
        }
        return value;
    }
}

export const convertService = new ConvertService();