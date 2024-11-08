import configTest from "../config/joom/product/index.json"

import { Command, constuctorService } from "./constuctor.module/constuctor.module";
import { storeService } from "./store.module/store.service";
const dotenv = require('dotenv');
dotenv.config();

(async () => {
    await constuctorService.runConfig(configTest as Command[], { isDowload: false, parsing: false, db: true });
    console.log(storeService.getAllStore());
})();