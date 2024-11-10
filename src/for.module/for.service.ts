import { CommandFor, constuctorService } from "@src/constuctor.module/constuctor.module";
import { storeConfigService } from "@src/store.module/store.module";

class ForService {
    async for(commandFor: CommandFor) {
        const array = storeConfigService.getElementStoreConfigConstructor(commandFor.params.array);
        for (const element of array) {
            storeConfigService.setStore(commandFor, element, commandFor.params.item);
            await constuctorService.runConfig(commandFor.params.config, undefined, true);
        }
    }
}

export const forService = new ForService();