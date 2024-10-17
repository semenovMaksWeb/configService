import { ifsOperator, OperatorAction } from "./ifs.interface";

class IfsService {
    private operatorAction: OperatorAction = {
        [ifsOperator["=="]]: (a: any, b: any) => a == b,
        [ifsOperator["!="]]: (a: any, b: any) => a != b,
        [ifsOperator[">"]]: (a: any, b: any) => a > b,
        [ifsOperator["<"]]: (a: any, b: any) => a < b,
        [ifsOperator["<="]]: (a: any, b: any) => a <= b,
        [ifsOperator[">="]]: (a: any, b: any) => a >= b,
    }

    public ifsRun(config: any) {
        const copyConfig = JSON.parse(JSON.stringify(config));

        while (copyConfig.length > 1) {
            const [value1, operator, value2] = copyConfig.splice(0, 3); // удалить конфиг и получить нужные значения

            if (!operator) {
                throw new Error("Невалидный конфиг оператора не указан");
            }

            const action = this.operatorAction[operator as ifsOperator];
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