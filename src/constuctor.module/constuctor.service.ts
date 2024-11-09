import { Command, CommandAction, CommandConnectionDatabase, CommandConvertInDom, CommandConvertListInKeyArray, CommandConvertValidString, CommandDirectoryFile, CommandDownloadFileHttp, CommandFileConfig, CommandFileRead, CommandFileWrite, CommandFindElementHtmlAll, CommandFor, CommandGetAtrHtml, CommandGetInnerHtml, CommandInitVar, CommandMappigJson, CommandReplaceAll, CommandSql, CommandWebElementClick, CommandWebGetInnerHTML, CommandWebOpen, ConstuctorBody } from "@src/constuctor.module/constuctor.interface";

import { dbService } from "@src/db.module/db.module";
import { fileService } from "@src/file.module/file.module";
import { storeConfigService } from "@src/store.module/store.module";
import { jsonService } from "@src/json.module/json.module";
import { loggerService } from "@src/logger.module/logger.module";
import { forService } from "@src/for.module/for.module";
import { htmlService } from "@src/html.module/html.service";
import { convertService } from "@src/libs.module/libs.module";
import { ifsService } from "@src/ifs.module/ifs.service";
import { webService } from "@src/web.module/web.service";

class ConstuctorService {


    private commandAction = {
        [CommandAction.FILE_CONFIG]: this.fileConfig,
        [CommandAction.CONNECTION_DATABASE]: this.connectionDatabase,
        [CommandAction.SQL_CALL]: this.sqlCall,
        [CommandAction.FILE_READ]: this.readFile,
        [CommandAction.FILE_WRITE]: this.writeFile,
        [CommandAction.DIRECTORY_FILE]: this.directoryFile,
        [CommandAction.MAPPING_JSON]: this.mappingJson,
        [CommandAction.INIT_VAR]: this.initVar,
        [CommandAction.FOR]: this.for,
        [CommandAction.CONVERT_IN_DOM]: this.convertInDom,
        [CommandAction.FIND_ELEMENT_HTML_ALL]: this.findElementHtmlAll,
        [CommandAction.GET_INNER_HTML]: this.getInnerHtml,
        [CommandAction.GET_ATR_HTML]: this.getAtrHtml,
        [CommandAction.CONVERT_VALID_STRING]: this.convertValidString,
        [CommandAction.CONVERT_REPLACE_ALL]: this.convertReplaceAll,
        [CommandAction.DOWNLOAD_FILE_HTTP]: this.downloadFileHttp,
        [CommandAction.CONVERT_LIST_IN_KEY_ARRAY]: this.сonvertListInKeyArray,
        [CommandAction.WEB_OPEN]: this.webOpen,
        [CommandAction.WEB_ELEMENT_CLICK]: this.webElementClick,
        [CommandAction.WEB_ELEMENT_INNER_HTML]: this.webGetInnerHtml,
    }


    // получить html из веб браузера
    private async webGetInnerHtml(command: Command) {
        const commandWebElementClick = command as CommandWebGetInnerHTML;
        const page = storeConfigService.getElementStoreConfigConstructor(commandWebElementClick.webGetInnerHTML.page);
        const selector = storeConfigService.getElementStoreConfigConstructor(commandWebElementClick.webGetInnerHTML.selector);
        return await webService.innerHtmlELement(page, selector);
    }

    // Нажать на элемент в веб браузере
    private async webElementClick(command: Command) {
        const commandWebElementClick = command as CommandWebElementClick;
        const page = storeConfigService.getElementStoreConfigConstructor(commandWebElementClick.webElementClick.page);
        const selector = storeConfigService.getElementStoreConfigConstructor(commandWebElementClick.webElementClick.selector);
        return await webService.elementClick(page, selector);
    }

    // открыть веб браузер
    private async webOpen(command: Command) {
        const commandWebOpen = command as CommandWebOpen;
        const url = storeConfigService.getElementStoreConfigConstructor(commandWebOpen.webOpen.url);
        return await webService.openWeb(url);
    }

    // файл конфига выполнить
    private async fileConfig(command: Command) {
        const commandFileConfig = command as CommandFileConfig;
        const path = `${process.env.CONFIG_CATALOG}${commandFileConfig.path}`;
        const configFile = await fileService.readFile(path);
        const jsonConfig = JSON.parse(configFile.toString());
        loggerService.info("Начало конфига из файла", [{ config: { path: commandFileConfig.path, name: command.name } }]);
        await this.runConfig(jsonConfig, undefined, true);
        loggerService.info("Конец конфига из файла", [{ config: { path: commandFileConfig.path, name: command.name } }]);
    }

    // подключение к бд
    private connectionDatabase(command: Command) {
        const commandConnectionDatabase = command as CommandConnectionDatabase;
        const result = dbService.connectionDatabase(commandConnectionDatabase.connection);
        loggerService.info("Выполнено подключение к бд", [{ config: { name: command.name, connection: commandConnectionDatabase.connection } }]);
        return result;
    }

    // вызов sql функции
    private async sqlCall(command: Command) {
        const commandSql = command as CommandSql;
        const result = await dbService.sqlCall(commandSql);
        loggerService.info("Выполнен sql запрос", [{ config: { sql: commandSql.sql.query, name: command.name } }]);
        return result;
    }

    // чтения файла
    private async readFile(command: Command) {
        const commandFileRead = command as CommandFileRead;
        const path = storeConfigService.getElementStoreConfigConstructor(commandFileRead.path) as string;
        const result = await fileService.readFile(path);
        loggerService.info("Выполнено чтения файла", { config: { path: path, name: command.name } });
        return result;
    }

    // запись в файл
    private async writeFile(command: Command) {
        const commandFileWrite = command as CommandFileWrite;
        const path = storeConfigService.getElementStoreConfigConstructor(commandFileWrite.fileWrite.path);
        const data = storeConfigService.getElementStoreConfigConstructor(commandFileWrite.fileWrite.data);
        await fileService.writeFile(path, data);
        loggerService.info("Выполнено записи файла", { config: { path: path, name: command.name } });
    }

    // чтение файлов в каталоге
    private async directoryFile(command: Command) {
        const commandDirectoryFile = command as CommandDirectoryFile;
        const path = storeConfigService.getElementStoreConfigConstructor(commandDirectoryFile.path);
        const result = await fileService.directoryFile(path);
        loggerService.info("Выполнено получения путей файлов в каталоге", { config: { path: path, name: command.name }, result });
        return result;
    }

    // парсинг json в др формат json
    private mappingJson(command: Command) {
        const commandMappingJson = command as CommandMappigJson;
        const json = storeConfigService.getElementStoreConfigConstructor(commandMappingJson.mappingJson.json);
        const result = jsonService.mappingJson(json, commandMappingJson.mappingJson.schema);
        loggerService.info("Выполнено mapping json", { config: { name: command.name }, result });
        return result;
    }

    // иницилизация или изменение переменной
    private initVar(command: Command) {
        const commandInitVar = command as CommandInitVar;
        const result = storeConfigService.getElementStoreConfigConstructor(commandInitVar.initVar);
        loggerService.info("Выполнена иницилизация переменной", { config: { name: command.name }, result });
        return result;
    }

    // вызвать цикл
    private async for(command: Command) {
        const commandFor = command as CommandFor;
        loggerService.info("Начался цикл", { config: { name: command.name } });
        await forService.for(commandFor);
        loggerService.info("Закончился цикл", { config: { name: command.name } });
    }

    // из строки в dom
    private convertInDom(command: Command) {
        const commandConvertInDom = command as CommandConvertInDom;
        const html = storeConfigService.getElementStoreConfigConstructor(commandConvertInDom.convertInDom.html);
        const result = htmlService.convertStringInDom(html);
        loggerService.info("выполнена конвертация из строки в html", { config: { name: command.name } });
        return result;
    }

    // найди множество элементов по selector
    private findElementHtmlAll(command: Command) {
        const commandFindElementHtmlAll = command as CommandFindElementHtmlAll;
        const html = storeConfigService.getElementStoreConfigConstructor(commandFindElementHtmlAll.findElementHtmlAll.html);
        const selector = storeConfigService.getElementStoreConfigConstructor(commandFindElementHtmlAll.findElementHtmlAll.selector);
        const result = htmlService.findElementHtmlAll(selector, html);
        loggerService.info("выполнен поиск списка элемента в html", { config: { name: command.name } })
        return result;
    }

    // из dom-element получить его содержимое
    private getInnerHtml(command: Command) {
        const commandGetInnerHtml = command as CommandGetInnerHtml;
        const html = storeConfigService.getElementStoreConfigConstructor(commandGetInnerHtml.getInnerHtml.html);
        const selector = storeConfigService.getElementStoreConfigConstructor(commandGetInnerHtml.getInnerHtml.selector);
        const result = htmlService.getInnerHtml(selector, html);
        loggerService.info("Получения текста с html", { config: { name: command.name }, result })
        return result;
    }

    // из dom-element получить атрибут
    private getAtrHtml(command: Command) {
        const commandGetAtrHtml = command as CommandGetAtrHtml;
        const html = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.html);
        const selector = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.selector);
        const nameAtr = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.nameArt);
        const result = htmlService.getAtrHtml(selector, nameAtr, html);
        loggerService.info("Получения артибута с html", { config: { name: command.name }, result })
        return result;
    }

    //убрать из строки переносы и множ. пробелы CONVERT_VALID_STRING
    private convertValidString(command: Command) {
        const commandConvertValidString = command as CommandConvertValidString;
        const string = storeConfigService.getElementStoreConfigConstructor(commandConvertValidString.convertValidString.string);
        const result = convertService.convertValidString(string);
        loggerService.info("Конвертация строки скрытие лишних переносов пробелов и табуляции", { config: { name: command.name }, result });
        return result;
    }

    // поиск с заменой символов в строке
    private convertReplaceAll(command: Command) {
        const commandConvertReplaceAll = command as CommandReplaceAll;
        const string = storeConfigService.getElementStoreConfigConstructor(commandConvertReplaceAll.convertReplaceAll.string);
        const searchString = storeConfigService.getElementStoreConfigConstructor(commandConvertReplaceAll.convertReplaceAll.searchString);
        const replaceString = storeConfigService.getElementStoreConfigConstructor(commandConvertReplaceAll.convertReplaceAll.replaceString);
        loggerService.info("Замена символов в строке", { config: { name: command.name } });
        const result = convertService.convertReplaceAll(string, searchString, replaceString);
        return result;
    }

    // скачать файл по http и сохранить 
    private async downloadFileHttp(command: Command) {
        const commandDownloadFileHttp = command as CommandDownloadFileHttp;
        const url = storeConfigService.getElementStoreConfigConstructor(commandDownloadFileHttp.downloadFileHttp.url);
        const path = storeConfigService.getElementStoreConfigConstructor(commandDownloadFileHttp.downloadFileHttp.path);
        const fileName = storeConfigService.getElementStoreConfigConstructor(commandDownloadFileHttp.downloadFileHttp.fileName);
        await fileService.downloadFileHttp(url, path, fileName);
        loggerService.info("Скачен файл и сохранен", { config: { name: command.name, url, path, fileName } });
    }

    // Получения массива из массива объектов по ключу
    private сonvertListInKeyArray(command: Command) {
        const commandConvertListInKeyArray = command as CommandConvertListInKeyArray;
        const key = storeConfigService.getElementStoreConfigConstructor(commandConvertListInKeyArray.convertListInKeyArray.key);
        const list = storeConfigService.getElementStoreConfigConstructor(commandConvertListInKeyArray.convertListInKeyArray.list);
        const result = convertService.convertListInKeyArray(list, key);
        loggerService.info("Получен массива из массива объектов по ключу", { config: { name: command.name }, result });
        return result;
    }

    public async runConfig(commandList: Command[], body?: ConstuctorBody, isRecursion = false) {
        if (!isRecursion) {
            loggerService.info("Сохранение входящих данных", { data: body });
            storeConfigService.saveBody(body);
        }

        for (const command of commandList) {
            let ifsResult = true;

            if (command.ifs) {
                ifsResult = ifsService.ifsRun(command.ifs) as boolean;
                loggerService.info(`Результат условия для ${command.name} = ${ifsResult}`, { config: { name: command.name } });
            }

            if (!ifsResult) {
                continue;
            }

            let resultCommand = null;
            resultCommand = await this.commandAction[command.action](command);
            storeConfigService.setStore(command, resultCommand, command.name);
        }
    }
}

export const constuctorService = new ConstuctorService();