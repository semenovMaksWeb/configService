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
    GET_ATR_HTML = "getAtrHtml", // получить атрибут с dom-element

    CONVERT_VALID_STRING = "convertValidString", // убрать лишние пробелы и переносы из строки
    CONVERT_REPLACE_ALL = "convertReplaceAll", // замена символов в строке
    DOWNLOAD_FILE_HTTP = "downloadFileHttp",
}

export enum CommandResultOperator {
    PUSH = "push",
    EQUALLY = "=",
    NULL = "null",
}

export interface Command {
    action: CommandAction,
    result: CommandResultOperator,
    name: string | string[];
    comment: string | null,
    copyResult?: boolean;
}

export interface CommandDownloadFileHttp extends Command {
    downloadFileHttp: {
        path: StoreConfigElement,
        url: StoreConfigElement,
        fileName: StoreConfigElement,
    }
}

export interface CommandReplaceAll extends Command {
    convertReplaceAll: {
        string: StoreConfigElement,
        searchString: StoreConfigElement,
        replaceString: StoreConfigElement,
    }
}

export interface CommandConvertValidString extends Command {
    convertValidString: {
        string: StoreConfigElement
    }
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

type CommandHtml = {
    html: StoreConfigElement,
    selector: StoreConfigElement
}

type CommandHtmlGetAtr = CommandHtml & { nameArt: StoreConfigElement }

export interface CommandMappigJson extends Command {
    mappingJson: {
        json: StoreConfigElement,
        schema: JsonMappingSchema[]
    }
}

export interface CommandFindElementHtmlAll extends Command {
    findElementHtmlAll: CommandHtml
}

export interface CommandGetInnerHtml extends Command {
    getInnerHtml: CommandHtml
}

export interface CommandGetAtrHtml extends Command {
    getAtrHtml: CommandHtmlGetAtr
}

export interface CommandConvertInDom extends Command {
    convertInDom: {
        html: StoreConfigElement
    }
}