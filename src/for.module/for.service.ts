import { CommandResultOperator } from "@src/constuctor.module/constuctor.interface";
import { CommandFor, constuctorService } from "@src/constuctor.module/constuctor.module";
import { storeConfigService } from "@src/store.module/store.module";

class ForService {
    async for(commandFor: CommandFor) {
        const array = storeConfigService.getElementStoreConfigConstructor(commandFor.for.array);
        console.log(array);        
        for (const element of array) {
            storeConfigService.setStore(commandFor.for.item, element, CommandResultOperator.EQUALLY);
            await constuctorService.runConfig(commandFor.for.config);
        }
    }
}

export const forService = new ForService();