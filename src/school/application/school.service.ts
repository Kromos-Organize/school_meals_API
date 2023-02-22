import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {School} from "../domain/entities/school.model";
import {CreateSchoolDto} from "../domain/dto/create-school.dto";

@Injectable()
export class SchoolService {

    constructor(@InjectModel(School) private schoolRepository: typeof School) { }

    async getAllSchool() {

        return await this.schoolRepository.findAll();
    }

    async get(id: number) {

        const school = await this.schoolRepository.findOne({where: {id}})

        if (!school) {

            throw new BadRequestException({
                message: 'Школа не найдена.',
                fields: ['school_id'],
            });
        }

        return school;
    }

    async createSchool(dto: CreateSchoolDto) {

        const schoolCandidate = await this.schoolRepository.findOne({where: {name: dto.name, city: dto.city}})

        if (schoolCandidate) {
            throw new BadRequestException({
                message: 'Школа по таким данным уже добавлена.',
                fields: ['name'],
            });
        }

        return await this.schoolRepository.create(dto);
    }

    async updateSchool(id: number, schoolDto: CreateSchoolDto) {

        const school = await this.get(id);

        return await school.update(schoolDto);
    }

    async removeSchool(id: string) {

        const result = await this.schoolRepository.destroy({where: {id}});

        return result ? {message: "Школа удалена."} : {message: "Школа не найдена."}
    }
}
