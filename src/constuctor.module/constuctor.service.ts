import { Command, CommandAction, CommandConnectionDatabase, CommandConvertInDom, CommandConvertValidString, CommandDirectoryFile, CommandDownloadFileHttp, CommandFileConfig, CommandFileRead, CommandFileWrite, CommandFindElementHtmlAll, CommandFor, CommandGetAtrHtml, CommandGetInnerHtml, CommandInitVar, CommandMappigJson, CommandReplaceAll, CommandSql, ConstuctorBody } from "@src/constuctor.module/constuctor.interface";

import { bdService } from "@src/bd.module/bd.module";
import { fileService } from "@src/file.module/file.module";
import { storeConfigService } from "@src/store.module/store.module";
import { jsonService } from "@src/json.module/json.module";
import { loggerService } from "@src/logger.module/logger.module";
import { forService } from "@src/for.module/for.module";
import { htmlService } from "@src/html.module/html.service";
import { convertService } from "@src/libs.module/libs.module";

class ConstuctorService {
    private async convertFileConig(commandFileConfig: CommandFileConfig, commandList: Command[], index: number) {
        const path = `${process.env.CONFIG_CATALOG}${commandFileConfig.path}`;
        const configFile = await fileService.readFile(path);
        const jsonConfig = JSON.parse(configFile.toString());
        commandList.splice(index + 1, 0, ...jsonConfig);
    }

    // файл конфиг копирование
    private async fileConfig(command: Command, commandList: Command[], index: number) {
        loggerService.info("Выполнено копирования конфига", [{ config: command }]);
        await this.convertFileConig(command as CommandFileConfig, commandList, index);
    }

    // подключение к бд
    private connectionDatabase(command: Command) {
        const commandConnectionDatabase = command as CommandConnectionDatabase;
        return bdService.connectionDatabase(commandConnectionDatabase.connection);
    }

    // вызов sql функции
    private async sqlCall(command: Command) {
        const commandSql = command as CommandSql;
        return await bdService.sqlCall(commandSql);
    }

    // чтения файла
    private async readFile(command: Command) {
        const commandFileRead = command as CommandFileRead;
        const path = storeConfigService.getElementStoreConfigConstructor(commandFileRead.path) as string;
        const result = await fileService.readFile(path);
        loggerService.info("Выполнено чтения файла", { config: command });
        return result;
    }

    // запись в файл
    private async writeFile(command: Command) {
        const commandFileWrite = command as CommandFileWrite;
        const path = storeConfigService.getElementStoreConfigConstructor(commandFileWrite.fileWrite.path);
        const data = storeConfigService.getElementStoreConfigConstructor(commandFileWrite.fileWrite.data);
        await fileService.writeFile(path, data);
        loggerService.info("Выполнено записи файла", { config: command });
    }

    // чтение файлов в каталоге
    private async directoryFile(command: Command) {
        const commandDirectoryFile = command as CommandDirectoryFile;
        const path = storeConfigService.getElementStoreConfigConstructor(commandDirectoryFile.path);
        const result = await fileService.directoryFile(path);
        loggerService.info("Выполнено получения путей файлов в каталоге", { config: commandDirectoryFile, result });
        return result;
    }

    // парсинг json в др формат json
    private mappingJson(command: Command) {
        const commandMappingJson = command as CommandMappigJson;
        const json = storeConfigService.getElementStoreConfigConstructor(commandMappingJson.mappingJson.json);
        return jsonService.mappingJson(json, commandMappingJson.mappingJson.schema);
    }

    // иницилизация или изменение переменной
    private initVar(command: Command) {
        const commandInitVar = command as CommandInitVar;
        return storeConfigService.getElementStoreConfigConstructor(commandInitVar.initVar);
    }

    // вызвать цикл
    private async for(command: Command) {
        const commandFor = command as CommandFor;
        await forService.for(commandFor);
    }

    // из строки в dom
    private convertInDom(command: Command) {
        const commandConvertInDom = command as CommandConvertInDom;
        const html = storeConfigService.getElementStoreConfigConstructor(commandConvertInDom.convertInDom.html);
        const result = htmlService.convertStringInDom(html);
        loggerService.info("выполнена конвертация из строки в html", { config: commandConvertInDom, result });
        return result;
    }

    // найди множество элементов по selector
    private findElementHtmlAll(command: Command) {
        const commandFindElementHtmlAll = command as CommandFindElementHtmlAll;
        const html = storeConfigService.getElementStoreConfigConstructor(commandFindElementHtmlAll.findElementHtmlAll.html);
        const selector = storeConfigService.getElementStoreConfigConstructor(commandFindElementHtmlAll.findElementHtmlAll.selector);
        const result = htmlService.findElementHtmlAll(selector, html);
        loggerService.info("выполнен поиск списка элемента в html", { config: commandFindElementHtmlAll, params: { html, selector } })
        return result;
    }

    // из dom-element получить его содержимое
    private getInnerHtml(command: Command) {
        const commandGetInnerHtml = command as CommandGetInnerHtml;
        const html = storeConfigService.getElementStoreConfigConstructor(commandGetInnerHtml.getInnerHtml.html);
        const selector = storeConfigService.getElementStoreConfigConstructor(commandGetInnerHtml.getInnerHtml.selector);
        const result = htmlService.getInnerHtml(selector, html);
        loggerService.info("Получения текста с html", { config: commandGetInnerHtml, result, params: { html, selector } })
        return result;
    }

    // из dom-element получить атрибут
    private getAtrHtml(command: Command) {
        const commandGetAtrHtml = command as CommandGetAtrHtml;
        const html = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.html);
        const selector = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.selector);
        const nameAtr = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.nameArt);
        return htmlService.getAtrHtml(selector, nameAtr, html);
    }

    //убрать из строки переносы и множ. пробелы CONVERT_VALID_STRING
    private convertValidString(command: Command) {
        const commandConvertValidString = command as CommandConvertValidString;
        const string = storeConfigService.getElementStoreConfigConstructor(commandConvertValidString.convertValidString.string);
        const result = convertService.convertValidString(string);
        loggerService.info("Конвертация строки скрытие лишних переносов пробелов и табуляции");
        return result;
    }

    // поиск с заменой символов в строке
    private convertReplaceAll(command: Command) {
        const commandConvertReplaceAll = command as CommandReplaceAll;
        const string = storeConfigService.getElementStoreConfigConstructor(commandConvertReplaceAll.convertReplaceAll.string);
        const searchString = storeConfigService.getElementStoreConfigConstructor(commandConvertReplaceAll.convertReplaceAll.searchString);
        const replaceString = storeConfigService.getElementStoreConfigConstructor(commandConvertReplaceAll.convertReplaceAll.replaceString);
        loggerService.info("Замена символов в строке", { config: commandConvertReplaceAll.convertReplaceAll, name: command.name });
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
    }

    public async runConfig(commandList: Command[], body: ConstuctorBody) {
        storeConfigService.saveBody(body);
        loggerService.info("запуск команды");
        for (const [index, command] of commandList.entries()) {
            let resultCommand = null;
            switch (command.action) {
                case CommandAction.FILE_CONFIG: // файл конфиг копирование
                    await this.fileConfig(command, commandList, index);
                    break;

                case CommandAction.CONNECTION_DATABASE: // подключение к бд
                    resultCommand = this.connectionDatabase(command);
                    break;

                case CommandAction.SQL_CALL: // вызов sql функции
                    resultCommand = await this.sqlCall(command)
                    break;

                case CommandAction.FILE_READ: // чтения файла
                    resultCommand = await this.readFile(command);
                    break;

                case CommandAction.FILE_WRITE: // запись файла
                    await this.writeFile(command);
                    break;

                case CommandAction.DIRECTORY_FILE: // чтения путей в файлов в каталоге
                    resultCommand = await this.directoryFile(command);
                    break;

                case CommandAction.MAPPING_JSON: // парсинг json в др формат json
                    resultCommand = this.mappingJson(command);
                    break;

                case CommandAction.INIT_VAR: // иницилизация переменной
                    resultCommand = this.initVar(command);
                    break;

                case CommandAction.FOR: // вызвать цикл
                    await this.for(command);
                    break;

                case CommandAction.CONVERT_IN_DOM: // из строки в html
                    resultCommand = this.convertInDom(command);
                    break;

                case CommandAction.FIND_ELEMENT_HTML_ALL: // найди множество элементов по selector
                    resultCommand = this.findElementHtmlAll(command);
                    break;

                case CommandAction.GET_INNER_HTML: // из dom-element получить его содержимое
                    resultCommand = this.getInnerHtml(command);
                    break;

                case CommandAction.GET_ATR_HTML: // из dom-element получить атрибут
                    resultCommand = this.getAtrHtml(command);
                    break;

                case CommandAction.CONVERT_VALID_STRING: // убрать из строки переносы и множ. пробелы
                    resultCommand = this.convertValidString(command);
                    break;

                case CommandAction.CONVERT_REPLACE_ALL: // поиск с заменой символов в строке
                    resultCommand = this.convertReplaceAll(command);
                    break;

                case CommandAction.DOWNLOAD_FILE_HTTP: // скачать файл по http и сохранить в файл
                    await this.downloadFileHttp(command);
                    break;
            }

            storeConfigService.setStore(command, resultCommand, command.name);
        }
    }
}

export const constuctorService = new ConstuctorService();