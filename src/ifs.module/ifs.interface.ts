export enum ifsOperator {
    "==" = "==",
    ">" = ">",
    "<" = "<",
    "!=" = "!=",
    "<=" = "<=",
    ">=" = ">="
}

export type OperatorAction = { [key in ifsOperator]: (a: any, b: any) => boolean } 