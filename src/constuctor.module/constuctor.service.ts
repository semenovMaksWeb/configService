import { bdService } from "@src/bd.module/bd.service";
import { Command, CommandAction, CommandConnectionDatabase, CommandSql } from "@src/constuctor.module/constuctor.interface";
import { storeConfigService } from "@src/store.module/store.module";

class ConstuctorService {
    public async runConfig(commandList: Command[]) {
        for (const command of commandList) {
            let resultCommand = null;
            switch (command.action) {
                case CommandAction.CONNECTION_DATABASE:
                    const commandConnectionDatabase = command as CommandConnectionDatabase;
                    resultCommand = bdService.connectionDatabase(commandConnectionDatabase.connection);
                    break;
                case CommandAction.SQL_CALL:
                    const commandSql = command as CommandSql;               
                    resultCommand = await bdService.sqlCall(commandSql);
                    break;
            }
            storeConfigService.setStore(command.name, resultCommand, command.result);             
        }
    }
}

export const constuctorService = new ConstuctorService();