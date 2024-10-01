import { JsonMappingSchema } from "@src/json.module/json.module";
import { StoreConfigElement } from "@src/store.module/store.module";
import { StoreConfig } from "@src/store.module/store.module"

export enum CommandAction {
    CONNECTION_DATABASE = "connectionDatabase",
    SQL_CALL = "sql",
    FILE_CONFIG = "fileConfig",
    FILE_READ = "fileRead",
    FILE_WRITE = "fileWrite",
    MAPPING_JSON = "mappingJson"
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

export interface CommandSql extends Command {
    sql: {
        type: StoreConfigElement,
        connection: StoreConfigElement,
        query: string;
        params: StoreConfig[]
    }
}

export interface CommandFileRead extends Command {
    path: string;
}

export interface CommandFileWrite extends Command {
    fileWrite: {
        path: StoreConfigElement;
        data: StoreConfigElement;
    }
}

export interface CommandFileConfig extends CommandFileRead { }

export interface CommandMappigJson extends Command {
    mappingJson: {
        json: StoreConfigElement,
        schema: JsonMappingSchema[]
    }
}