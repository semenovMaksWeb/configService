import { StoreConfig } from "@src/store.module/store.module"

export enum CommandAction {
    CONNECTION_DATABASE = "connectionDatabase"
}

export enum CommandResultOperator {
    PUSH = "push",
    EQUALLY = "="
}

export interface Command {
    action: CommandAction,
    result: CommandResultOperator,
    name: string | string[];
    comment: string | null
}

export interface CommandConnectionDatabase extends Command {
    connection: StoreConfig[]
}