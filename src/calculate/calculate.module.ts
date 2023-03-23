import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {CalcClassMenu} from "./domain/entity/calcClassMenu.model";
import {CalcClassSum} from "./domain/entity/calcClassSum.model";
import {CalcSchoolSum} from "./domain/entity/calcSchoolSum.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        SequelizeModule.forFeature([CalcClassMenu, CalcClassSum, CalcSchoolSum])
    ],
    exports: [],
})
export class CalculateModule {}