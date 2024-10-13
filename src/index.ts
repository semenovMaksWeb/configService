import configTest from "../config/joom/parsingHtmlProduct.json"

import { Command, constuctorService } from "./constuctor.module/constuctor.module";
const dotenv = require('dotenv');
dotenv.config();

(async () => {
    await constuctorService.runConfig(configTest as Command[]);
})();
