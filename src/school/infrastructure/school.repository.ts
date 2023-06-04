import {InjectModel} from "@nestjs/sequelize";
import {School} from "../domain/entities/school.model";
import {SchoolCreateDto} from "../domain/dto/school-request.dto";
import {ISchoolUpdate} from "../domain/dto/school-service.dto";

export class SchoolRepository {

    constructor(@InjectModel(School) private schoolRepository: typeof School) { }

    async createSchool(schoolDto: SchoolCreateDto) {

        return await this.schoolRepository.create(schoolDto);
    }

    async updateSchool(school_id: number, schoolDto: ISchoolUpdate) {

        const schoolInstance = await this.schoolRepository.findOne({where: { school_id }});

        if (!schoolInstance) return false;

        await schoolInstance.update(schoolDto);

        return await schoolInstance.save();
    }

    async removeSchool(school_id: number) {

        const result = await this.schoolRepository.destroy({ where: { school_id } });

        return result && { school_id }
    }
}