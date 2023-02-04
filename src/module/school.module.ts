import {Module} from '@nestjs/common';
import {SchoolService} from '../service/school.service';
import {SchoolController} from '../controller/school.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {School} from "../model/school.model";

@Module({
  providers: [SchoolService],
  controllers: [SchoolController],
  imports: [
    SequelizeModule.forFeature([School])
  ]
})
export class SchoolModule {}
