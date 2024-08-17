import { Command, CommandAction, CommandConnectionDatabase, CommandFileConfig, CommandFileRead, CommandMappigJson, CommandSql } from "@src/constuctor.module/constuctor.interface";

import { bdService } from "@src/bd.module/bd.module";
import { fileService } from "@src/file.module/file.module";
import { storeConfigService } from "@src/store.module/store.module";
import { jsonService } from "@src/json.module/json.module";

class ConstuctorService {
    private async convertFileConig(commandFileConfig: CommandFileConfig, commandList: Command[], index: number) {
        const path = `${process.env.CONFIG_CATALOG}${commandFileConfig.path}`;
        const configFile = await fileService.readFile(path);
        const jsonConfig = JSON.parse(configFile.toString());
        commandList.splice(index + 1, 0, ...jsonConfig);
    }

    public async runConfig(commandList: Command[]) {
        for (const [index, command] of commandList.entries()) {
            let resultCommand = null;
            switch (command.action) {
                case CommandAction.CONNECTION_DATABASE:
                    const commandConnectionDatabase = command as CommandConnectionDatabase;
                    resultCommand = bdService.connectionDatabase(commandConnectionDatabase.connection);
                    break;

                case CommandAction.FILE_CONFIG:
                    await this.convertFileConig(command as CommandFileConfig, commandList, index);
                    break;

                case CommandAction.SQL_CALL:
                    const commandSql = command as CommandSql;
                    resultCommand = await bdService.sqlCall(commandSql);
                    break;

                case CommandAction.FILE_READ:
                    const commandFileRead = command as CommandFileRead;
                    resultCommand = await fileService.readFile(commandFileRead.path);
                    break;
                case CommandAction.MAPPING_JSON:
                    const commandMappingJson = command as CommandMappigJson;
                    const data = storeConfigService.getElementStoreConfig(commandMappingJson.mappingJson.json);
                    resultCommand = jsonService.mappingJson(data, commandMappingJson.mappingJson.schema);
                    break;
            }
            storeConfigService.setStore(command.name, resultCommand, command.result);
        }
    }
}

export const constuctorService = new ConstuctorService();