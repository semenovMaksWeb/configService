import configTest from "../config/joom/parsingCategories.json"

import { Command, constuctorService } from "./constuctor.module/constuctor.module";
import { storeService } from "./store.module/store.module";

const dotenv = require('dotenv');
dotenv.config();

(async () => {
    await constuctorService.runConfig(configTest as Command[]);
    console.log(storeService.getAllStore().jsonParsing);
})();
