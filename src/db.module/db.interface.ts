export enum ConnectionDB {
    POSTGRE_SQL = "PostgreSQL",
    MYSQL = "MySql"
}

export type DBConfigResult = {
    user: string,
    password: string,
    host: string,
    port: number,
    database: string,
    type: ConnectionDB
}