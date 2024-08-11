export enum ConnectionBd {
    POSTGRE_SQL = "PostgreSQL",
    MYSQL = "MySql"
}

export type BdConfigResult = {
    user: string,
    password: string,
    host: string,
    port: number,
    database: string,
    type: ConnectionBd
}