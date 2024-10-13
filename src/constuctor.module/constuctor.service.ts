import { Command, CommandAction, CommandConnectionDatabase, CommandConvertInDom, CommandDirectoryFile, CommandFileConfig, CommandFileRead, CommandFileWrite, CommandFindElementHtmlAll, CommandFor, CommandGetAtrHtml, CommandGetInnerHtml, CommandInitVar, CommandMappigJson, CommandSql } from "@src/constuctor.module/constuctor.interface";

import { bdService } from "@src/bd.module/bd.module";
import { fileService } from "@src/file.module/file.module";
import { storeConfigService } from "@src/store.module/store.module";
import { jsonService } from "@src/json.module/json.module";
import { loggerService } from "@src/logger.module/logger.module";
import { forService } from "@src/for.module/for.module";
import { htmlService } from "@src/html.module/html.service";

class ConstuctorService {
    private async convertFileConig(commandFileConfig: CommandFileConfig, commandList: Command[], index: number) {
        const path = `${process.env.CONFIG_CATALOG}${commandFileConfig.path}`;
        const configFile = await fileService.readFile(path);
        const jsonConfig = JSON.parse(configFile.toString());
        commandList.splice(index + 1, 0, ...jsonConfig);
    }

    public async runConfig(commandList: Command[]) {
        loggerService.info("запуск команды");
        for (const [index, command] of commandList.entries()) {
            let resultCommand = null;
            switch (command.action) {
                case CommandAction.FILE_CONFIG: // файл конфиг
                    loggerService.info("Выполнено копирования конфига", [{ config: command }]);
                    await this.convertFileConig(command as CommandFileConfig, commandList, index);
                    break;

                case CommandAction.CONNECTION_DATABASE: // подключение к бд
                    const commandConnectionDatabase = command as CommandConnectionDatabase;
                    resultCommand = bdService.connectionDatabase(commandConnectionDatabase.connection);
                    break;

                case CommandAction.SQL_CALL: // вызов sql функции
                    const commandSql = command as CommandSql;
                    resultCommand = await bdService.sqlCall(commandSql);
                    break;

                case CommandAction.FILE_READ: // чтения файла
                    const commandFileRead = command as CommandFileRead;
                    const pathFileRead = storeConfigService.getElementStoreConfigConstructor(commandFileRead.path) as string;
                    resultCommand = await fileService.readFile(pathFileRead);
                    loggerService.info("Выполнено чтения файла", { config: command });
                    break;

                case CommandAction.FILE_WRITE: // запись файла
                    const commandFileWrite = command as CommandFileWrite;
                    const pathFileWrite = storeConfigService.getElementStoreConfigConstructor(commandFileWrite.fileWrite.path);
                    const dataFileWrite = storeConfigService.getElementStoreConfigConstructor(commandFileWrite.fileWrite.data);
                    await fileService.writeFile(pathFileWrite, dataFileWrite);
                    break;

                case CommandAction.DIRECTORY_FILE: // чтения путей в файлов в каталоге
                    const commandDirectoryFile = command as CommandDirectoryFile;
                    const pathDirectoryFile = storeConfigService.getElementStoreConfigConstructor(commandDirectoryFile.path);
                    resultCommand = await fileService.directoryFile(pathDirectoryFile);
                    loggerService.info("Выполнено получения путей файлов в каталоге", { config: commandDirectoryFile, result: resultCommand });
                    break;

                case CommandAction.MAPPING_JSON: // парсинг json в др формат json
                    const commandMappingJson = command as CommandMappigJson;
                    const dataJsonMapping = storeConfigService.getElementStoreConfigConstructor(commandMappingJson.mappingJson.json);
                    resultCommand = jsonService.mappingJson(dataJsonMapping, commandMappingJson.mappingJson.schema);
                    break;

                case CommandAction.INIT_VAR: // иницилизация переменной
                    const commandInitVar = command as CommandInitVar;
                    resultCommand = storeConfigService.getElementStoreConfigConstructor(commandInitVar.initVar);
                    break;

                case CommandAction.FOR: // вызвать цикл
                    const commandFor = command as CommandFor;
                    await forService.for(commandFor);
                    break;


                case CommandAction.CONVERT_IN_DOM: // из строки в html
                    const commandConvertInDom = command as CommandConvertInDom;
                    const htmlConvertInDom = storeConfigService.getElementStoreConfigConstructor(commandConvertInDom.convertInDom.html);
                    resultCommand = htmlService.convertStringInDom(htmlConvertInDom);
                    loggerService.info("выполнена конвертация из строки в html", { config: commandConvertInDom, result: resultCommand })
                    break;

                case CommandAction.FIND_ELEMENT_HTML_ALL: // из строки в html
                    const commandFindElementHtmlAll = command as CommandFindElementHtmlAll;
                    const htmlFindElementAll = storeConfigService.getElementStoreConfigConstructor(commandFindElementHtmlAll.findElementHtmlAll.html);
                    const selectorFindElementAll = storeConfigService.getElementStoreConfigConstructor(commandFindElementHtmlAll.findElementHtmlAll.selector);
                    loggerService.info("выполнен поиск списка элемента в html", { config: commandFindElementHtmlAll, result: resultCommand, params: { htmlFindElementAll, selectorFindElementAll } })
                    resultCommand = htmlService.findElementHtmlAll(selectorFindElementAll, htmlFindElementAll);
                    break;

                case CommandAction.GET_INNER_HTML: // из dom-element получить его содержимое
                    const commandGetInnerHtml = command as CommandGetInnerHtml;
                    const htmlGetInnerHtml = storeConfigService.getElementStoreConfigConstructor(commandGetInnerHtml.getInnerHtml.html);
                    const selectorGetInnerHtml = storeConfigService.getElementStoreConfigConstructor(commandGetInnerHtml.getInnerHtml.selector);
                    resultCommand = htmlService.getInnerHtml(selectorGetInnerHtml, htmlGetInnerHtml);
                    loggerService.info("Получения текста с html", { config: commandGetInnerHtml, result: resultCommand, params: { htmlGetInnerHtml, selectorGetInnerHtml } })
                    break;

                case CommandAction.GET_INNER_HTML: // из dom-element получить его содержимое
                    const commandGetAtrHtml = command as CommandGetAtrHtml;
                    const htmlGetAtrHtml = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.html);
                    const selectorGetAtrHtml = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.html);
                    const nameAtrGetAtrHtml = storeConfigService.getElementStoreConfigConstructor(commandGetAtrHtml.getAtrHtml.html);
                    resultCommand = htmlService.getAtrHtml(htmlGetAtrHtml, nameAtrGetAtrHtml, selectorGetAtrHtml);
                    break;
            }
            storeConfigService.setStore(command, resultCommand, command.name);
        }
    }
}

export const constuctorService = new ConstuctorService();