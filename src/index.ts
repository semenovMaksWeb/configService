// import configTest from "../../configMedia/config/joom/categories/index.json"
import configTest from "../../configMedia/config/joom/categories/web.json"

import { Command, constuctorService } from "./constuctor.module/constuctor.module";
import { storeService } from "./store.module/store.service";
const dotenv = require('dotenv');
dotenv.config();

(async () => {
    await constuctorService.runConfig(configTest as Command[], { isDowload: false, parsing: false, db: false });
    console.log(storeService.getAllStore());
})();