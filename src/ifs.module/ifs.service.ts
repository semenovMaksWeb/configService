import { StoreConfigElement, storeConfigService } from "@src/store.module/store.module";
import { ifsOperator, IfsRunConfig, OperatorAction, OperatorConfig } from "./ifs.interface";

class IfsService {
    private operatorAction: OperatorAction = {
        [ifsOperator["=="]]: (a: any, b: any) => a == b,
        [ifsOperator["!="]]: (a: any, b: any) => a != b,
        [ifsOperator[">"]]: (a: any, b: any) => a > b,
        [ifsOperator["<"]]: (a: any, b: any) => a < b,
        [ifsOperator["<="]]: (a: any, b: any) => a <= b,
        [ifsOperator[">="]]: (a: any, b: any) => a >= b,
    }

    public ifsRun(config: IfsRunConfig[]) {
        const copyConfig: IfsRunConfig[] = JSON.parse(JSON.stringify(config));

        while (copyConfig.length > 1) {
            let [value1, value2, value3] = copyConfig.splice(0, 3); // удалить конфиг и получить нужные значения

            value1 = storeConfigService.getElementStoreConfigConstructor(value1 as StoreConfigElement);
            value2 = value2 as OperatorConfig;
            value3 = storeConfigService.getElementStoreConfigConstructor(value3 as StoreConfigElement);
            
            if (!value2.operator) {
                throw new Error("Невалидный конфиг оператора не указан");
            }

            const action = this.operatorAction[value2.operator as ifsOperator];
            if (!action) {
                throw new Error(`Неизвестный оператор: ${value2.operator}`);
            }

            const result = action(value1, value3) // вызов сравнения
            copyConfig.unshift(result);  // сохранение результата конфига
        }

        return copyConfig[0];
    }
}

export const ifsService = new IfsService();