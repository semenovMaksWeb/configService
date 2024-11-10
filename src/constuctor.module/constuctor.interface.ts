import { IfsRunConfig } from "@src/ifs.module/ifs.module";
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
    GET_TEXT_CONTENT = "getTextContent", // получения с dom-element textContent

    CONVERT_VALID_STRING = "convertValidString", // убрать лишние пробелы и переносы из строки
    CONVERT_REPLACE_ALL = "convertReplaceAll", // замена символов в строке
    CONVERT_LIST_IN_KEY_ARRAY = "convertListInKeyArray", // из массива объекта получить массив значение по ключу
    DOWNLOAD_FILE_HTTP = "downloadFileHttp", // Скачать файл с интернета по http

    WEB_OPEN = "webOpen", // открыть браузер определенную страницу
    WEB_ELEMENT_CLICK = "webElementClick", // в браузере нажать на dom-element
    WEB_ELEMENT_INNER_HTML = "webGetInnerHTML", // в браузере получить html
}

export type ConstuctorBody = { [key: string]: any }


export enum CommandResultOperator {
    PUSH = "push",
    EQUALLY = "=",
    NULL = "null",
}

export interface Command {
    ifs?: IfsRunConfig[];
    action: CommandAction;
    result: CommandResultOperator;
    name: string | string[];
    comment: string | null;
    copyResult?: boolean;
}

export interface CommandConvertListInKeyArray extends Command {
    params: {
        key: StoreConfigElement,
        list: StoreConfigElement
    }
}

export interface CommandDownloadFileHttp extends Command {
    params: {
        path: StoreConfigElement,
        url: StoreConfigElement,
        fileName: StoreConfigElement,
    }
}

export interface CommandReplaceAll extends Command {
    params: {
        string: StoreConfigElement,
        searchString: StoreConfigElement,
        replaceString: StoreConfigElement,
    }
}

export interface CommandConvertValidString extends Command {
    params: {
        string: StoreConfigElement
    }
}

export interface CommandInitVar extends Command {
    params: {
        initVar: StoreConfigElement
    }
}

export interface CommandConnectionDatabase extends Command {
    params: {
        connection: StoreConfig[]
    }
}

export interface CommandSql extends Command {
    params: {
        type: StoreConfigElement,
        connection: StoreConfigElement,
        query: string;
        params: StoreConfig[]
    }
}

export interface CommandFileRead extends Command {
    params: {
        path: StoreConfigElement;
    }
}

export interface CommandFileConfig extends CommandFileRead { }

export interface CommandDirectoryFile extends CommandFileRead { }

export interface CommandFileWrite extends Command {
    params: {
        path: StoreConfigElement;
        data: StoreConfigElement;
    }
}

export interface CommandFor extends Command {
    params: {
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
    params: {
        json: StoreConfigElement,
        schema: JsonMappingSchema[]
    }
}

export interface CommandFindElementHtmlAll extends Command {
    params: CommandHtml
}

export interface CommandGetInnerHtml extends Command {
    params: CommandHtml
}

export interface CommandGetAtrHtml extends Command {
    params: CommandHtmlGetAtr
}
export interface CommandGetTextContent extends Command {
    params: CommandHtml
}


export interface CommandConvertInDom extends Command {
    params: {
        html: StoreConfigElement
    }
}

export interface CommandWebOpen extends Command {
    params: {
        url: StoreConfigElement
    }
}
export interface CommandWebElementClick extends Command {
    params: {
        page: StoreConfigElement,
        selector: StoreConfigElement
    }
}

export interface CommandWebGetInnerHTML extends Command {
    params: {
        page: StoreConfigElement,
        selector: StoreConfigElement
    }
} 