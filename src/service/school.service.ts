import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {School} from "../model/school.model";
import {CreateSchoolDto} from "../dto/create-school.dto";

@Injectable()
export class SchoolService {

    constructor(@InjectModel(School) private schoolRepository: typeof School) { }

    async getAllSchool() {

        return await this.schoolRepository.findAll();
    }

    async get(school_id: number) {

        const school = await this.schoolRepository.findOne({where: {school_id}})

        if (!school) {

            throw new HttpException({message: 'Школа не найдена.'},HttpStatus.NOT_FOUND)
        }

        return school;
    }

    async createSchool(dto: CreateSchoolDto) {

        const schoolCandidate = await this.schoolRepository.findOne({where: {name: dto.name, city: dto.city}})

        if (schoolCandidate) {

            throw new HttpException('Школа существует',HttpStatus.BAD_REQUEST);// 400 status
        }

        return await this.schoolRepository.create(dto);
    }
}
