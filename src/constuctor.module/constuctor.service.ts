import { Command, CommandAction, CommandConnectionDatabase, CommandDirectoryFile, CommandFileConfig, CommandFileRead, CommandFileWrite, CommandFor, CommandInitVar, CommandMappigJson, CommandSql } from "@src/constuctor.module/constuctor.interface";

import { bdService } from "@src/bd.module/bd.module";
import { fileService } from "@src/file.module/file.module";
import { storeConfigService } from "@src/store.module/store.module";
import { jsonService } from "@src/json.module/json.module";
import { loggerService } from "@src/logger.module/logger.module";
import { forService } from "@src/for.module/for.module";

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
            }
            storeConfigService.setStore(command.name, resultCommand, command.result);
        }
    }
}

export const constuctorService = new ConstuctorService();