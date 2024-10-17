import { ifsOperator } from "./ifs.interface";

class IfsService {
    private operatorAction: { [key in ifsOperator]: (a: any, b: any) => boolean } = {
        [ifsOperator["=="]]: (a: any, b: any) => a == b,
        [ifsOperator["!="]]: (a: any, b: any) => a != b,
        [ifsOperator[">"]]: (a: any, b: any) => a > b,
        [ifsOperator["<"]]: (a: any, b: any) => a < b,
        [ifsOperator["<="]]: (a: any, b: any) => a <= b,
        [ifsOperator[">="]]: (a: any, b: any) => a >= b,
    }

    ifsRun(config: any) {
        const copyConfig = JSON.parse(JSON.stringify(config));

        while (copyConfig.length > 1) {
            const value1 = copyConfig[0] // 1 значение;
            const value2 = copyConfig[2] // 2 значение;
            const operator = copyConfig[1].operator as ifsOperator // оператор

            if (!operator && Object.values(ifsOperator).includes(operator)) {
                throw new Error("Невалидный конфиг оператора");
            }

            const action = this.operatorAction[operator];
            if (!action) {
                throw new Error(`Неизвестный оператор: ${operator}`);
            }

            const result = action(value1, value2)
            copyConfig.splice(0, 3); // удаление конфига
            copyConfig.unshift(result);  // сохранение результата конфига
        }

        return copyConfig
    }
}

export const ifsService = new IfsService();