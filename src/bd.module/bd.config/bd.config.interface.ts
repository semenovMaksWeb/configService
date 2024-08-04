export enum ConnectionBd {
    POSTGRE_SQL = "PostgreSQL"
}

export type BdConfigResult = {
    user: string,
    password: string,
    host: string,
    port: number,
    database: string,
    type: ConnectionBd
}