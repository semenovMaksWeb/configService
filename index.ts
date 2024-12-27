import { constuctorService } from "@src/constuctor.module/constuctor.module";
import { pgService } from "@src/db.module/pg/pg.service";
import { fileService } from "@src/file.module/file.module";
import { htmlService } from "@src/html.module/html.module"
import { webService } from "@src/web.module/web.module";
import { convertService } from "@src/libs.module/libs.module";

export const configCore = {
    constuctorService,
    pgService,
    fileService,
    htmlService,
    webService,
    convertService
}   