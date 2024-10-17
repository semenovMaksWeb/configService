import { CommandFor, constuctorService } from "@src/constuctor.module/constuctor.module";
import { storeConfigService } from "@src/store.module/store.module";

class ForService {
    async for(commandFor: CommandFor) {
        const array = storeConfigService.getElementStoreConfigConstructor(commandFor.for.array);
        for (const element of array) {
            storeConfigService.setStore(commandFor, element, commandFor.for.item);
            await constuctorService.runConfig(commandFor.for.config, undefined, true);
        }
    }
}

export const forService = new ForService();