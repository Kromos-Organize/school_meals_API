import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

            throw new BadRequestException([
                {
                    message: 'Школа не найдена.',
                    field: 'school_id',
                },
            ]);
        }

        return school;
    }

    async createSchool(dto: CreateSchoolDto) {

        const schoolCandidate = await this.schoolRepository.findOne({where: {name: dto.name, city: dto.city}})

        if (schoolCandidate) {
            throw new BadRequestException([
                {
                    message: 'Школа не найдена.',
                    field: 'school_id',
                },
            ]);
        }

        return await this.schoolRepository.create(dto);
    }

    async updateSchool(school_id: number, schoolDto: CreateSchoolDto) {

        const school = await this.get(school_id);

        return await school.update(schoolDto);
    }

    async removeSchool(school_id: string) {

        const result = await this.schoolRepository.destroy({where: {school_id}});

        return result ? {message: "Школа удалена."} : {message: "Школа не найдена."}
    }
}
