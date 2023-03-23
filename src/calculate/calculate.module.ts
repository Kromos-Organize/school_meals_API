import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {CalcClassMenu} from "./domain/entity/calcClassMenu.model";
import {CalcClassSum} from "./domain/entity/calcClassSum.model";
import {CalcSchoolSum} from "./domain/entity/calcSchoolSum.model";
import {CalcClassMenuQueryRepository} from "./infrastructure/calcClassMenu/calcClassMenu.query.repository";
import {CalcClassMenuRepository} from "./infrastructure/calcClassMenu/calcClassMenu.repository";
import {CalcClassSumQueryRepository} from "./infrastructure/calcClassSum/calcClassSum.query.repository";
import {CalcClassSumRepository} from "./infrastructure/calcClassSum/calcClassSum.repository";
import {CalcSchoolSumQueryRepository} from "./infrastructure/calcSchoolSum/calcSchoolSum.query.repository";
import {CalcSchoolSumRepository} from "./infrastructure/calcSchoolSum/calcSchoolSum.repository";

@Module({
    providers: [
        CalcClassMenuQueryRepository,
        CalcClassSumQueryRepository,
        CalcSchoolSumQueryRepository,
        CalcClassMenuRepository,
        CalcClassSumRepository,
        CalcSchoolSumRepository,
    ],
    controllers: [],
    imports: [
        SequelizeModule.forFeature([CalcClassMenu, CalcClassSum, CalcSchoolSum])
    ],
    exports: [],
})
export class CalculateModule {}