import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {School} from "./school.model";
import {CreateSchoolDto} from "./dto/create-school.dto";

@Injectable()
export class SchoolService {

    constructor(@InjectModel(School) private schoolRepository: typeof School) { }

    async getAllSchool() {

        return await this.schoolRepository.findAll();
    }

    async createSchool(dto: CreateSchoolDto) {

        const schoolCandidate = await this.schoolRepository.findOne({where: {name: dto.name, city: dto.city}})

        if (schoolCandidate) {

            throw new HttpException('Школа существует',HttpStatus.BAD_REQUEST);// 400 status
        }

        return await this.schoolRepository.create(dto);
    }
}
