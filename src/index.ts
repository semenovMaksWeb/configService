// import configTest from "../config/joom/parsingHtmlProduct.json"
import configTest from "../config/joom/parsingCategories.json"
// import configTest from "../config/test2.json"

import { Command, constuctorService } from "./constuctor.module/constuctor.module";
import { storeService } from "./store.module/store.service";
const dotenv = require('dotenv');
dotenv.config();

(async () => {
    await constuctorService.runConfig(configTest as Command[], { isDowload: false });
    console.log(storeService.getAllStore());
})();