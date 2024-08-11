import { StoreConfig } from "@src/store.module/store.module";
import { bdService } from "./bd.module/bd.service";

import configTest from "../config/test.json"

const dotenv = require('dotenv');
dotenv.config();

(async () => {
    const connection = bdService.connectionDatabase(configTest[0].connection as StoreConfig[])
    const resultBd = await connection.query("select * from temp.test_bd_11_08_2024");
    console.log(resultBd.rows);    
})();
