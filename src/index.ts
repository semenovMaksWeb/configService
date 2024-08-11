import configTest from "../config/test2.json"
import { constuctorService } from "./constuctor.module/constuctor.service";
import { Command } from "./constuctor.module/constuctor.interface";
import { storeService } from "./store.module/store.service";

const dotenv = require('dotenv');
dotenv.config();

(async () => {
    await constuctorService.runConfig(configTest as Command[]);
    console.log(storeService.getAllStore());
    
})();
