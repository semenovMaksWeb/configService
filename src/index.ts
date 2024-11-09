import configTest from "../../configMedia/config/joom/index.json"

import { Command, constuctorService } from "./constuctor.module/constuctor.module";
import { storeService } from "./store.module/store.service";
const dotenv = require('dotenv');
dotenv.config();

(async () => {
    await constuctorService.runConfig(configTest as Command[], {
        categories: {
            webHtml: true,
            pasring: false,
            db: false,

        }
    });
    console.log(storeService.getAllStore());
})();