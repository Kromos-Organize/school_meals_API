import {Module} from '@nestjs/common';
import {SchoolService} from './school.service';
import {SchoolController} from './school.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {School} from "./school.model";

@Module({
  providers: [SchoolService],
  controllers: [SchoolController],
  imports: [
    SequelizeModule.forFeature([School])
  ]
})
export class SchoolModule {}
