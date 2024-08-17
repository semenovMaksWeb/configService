import { TypeVarEnum } from "@src/libs.module/libs.module";

export interface JsonMappingSchema {
    key: string;
    type: TypeVarEnum;
    init: boolean;
    path?: string[];
    root?: string[];
    const?: any;
    children?: JsonMappingSchema[];
}