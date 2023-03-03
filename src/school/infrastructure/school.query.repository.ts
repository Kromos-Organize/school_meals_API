import {InjectModel} from "@nestjs/sequelize";
import {School} from "../domain/entities/school.model";
import {ISchoolParam} from "../domain/dto/school-service.dto";

export class SchoolQueryRepository {

    @InjectModel(School) private schoolRepository: typeof School;

    async getAllSchools() {

        return await this.schoolRepository.findAll();
    }

    async getSchoolById(school_id: number) {

        return await this.schoolRepository.findOne({where: { school_id }});
    }

    async getSchoolByParam(schoolParam: ISchoolParam) {

        return await this.schoolRepository.findOne({where: {...schoolParam}});
    }
}