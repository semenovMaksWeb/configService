import { JsonMappingSchema } from "@src/json.module/json.module";
import { StoreConfigElement } from "@src/store.module/store.module";
import { StoreConfig } from "@src/store.module/store.module"

export enum CommandAction {
    CONNECTION_DATABASE = "connectionDatabase", // подключение к бд
    SQL_CALL = "sql", // вызов sql

    FILE_CONFIG = "fileConfig", // ссылка на файл конфиг 
    FILE_READ = "fileRead", // чтения файла
    FILE_WRITE = "fileWrite", // запись в файл
    DIRECTORY_FILE = "directoryFile", // выдать пути файлов в каталоге

    MAPPING_JSON = "mappingJson", // из 1 json в др. json

    INIT_VAR = "initVar", // создать(иницилизировать) переменную

    FOR = "for", // прогнать в цикле что либо

    CONVERT_IN_DOM = "convertInDom", // команда из строки в dom-element
    FIND_ELEMENT_HTML_ALL = "findElementHtmlAll", // найти в html все element по selector
    GET_INNER_HTML = "getInnerHtml", // получить текст и html с dom-element
    GET_ATR_HTML = "getAtrHtml" // получить атрибут с dom-element

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

export interface CommandInitVar extends Command {
    initVar: StoreConfigElement
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
    path: StoreConfigElement;
}

export interface CommandFileConfig extends CommandFileRead { }

export interface CommandDirectoryFile extends CommandFileRead { }

export interface CommandFileWrite extends Command {
    fileWrite: {
        path: StoreConfigElement;
        data: StoreConfigElement;
    }
}

export interface CommandFor extends Command {
    for: {
        item: string | string[],
        array: StoreConfigElement,
        config: Command[],
    }
}

export interface CommandMappigJson extends Command {
    mappingJson: {
        json: StoreConfigElement,
        schema: JsonMappingSchema[]
    }
}