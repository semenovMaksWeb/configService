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
            
            const operator = value2 as OperatorConfig;
            value1 = storeConfigService.getElementStoreConfigConstructor(value1 as StoreConfigElement);
            value2 = storeConfigService.getElementStoreConfigConstructor(value3 as StoreConfigElement);

            if (!operator) {
                throw new Error("Невалидный конфиг оператора не указан");
            }

            const action = this.operatorAction[operator.operator as ifsOperator];
            if (!action) {
                throw new Error(`Неизвестный оператор: ${operator}`);
            }
            const result = action(value1, value2) // вызов сравнения
            copyConfig.unshift(result);  // сохранение результата конфига
        }

        return copyConfig[0];
    }
}

export const ifsService = new IfsService();