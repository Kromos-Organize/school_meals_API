import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {School} from "../domain/entities/school.model";
import {SchoolCreateDto} from "../domain/dto/school-request.dto";
import {SchoolQueryRepository} from "../infrastructure/school.query.repository";
import {SchoolRepository} from "../infrastructure/school.repository";
import {ISchoolCreationAttrs, ISchoolParam, ISchoolUpdate} from "../domain/dto/school-service.dto";

@Injectable()
export class SchoolService {

    constructor(
        private schoolQueryRepository: SchoolQueryRepository,
        private schoolRepository: SchoolRepository,
    ) { }

    async getAllSchool() {

        return await this.schoolQueryRepository.getAllSchools();
    }

    async getSchoolById(school_id: number) {

       return await this.schoolQueryRepository.getSchoolById(school_id);
    }

    async getSchoolByParam(schoolParam: ISchoolParam) {

        return await this.schoolQueryRepository.getSchoolByParam(schoolParam);
    }

    async createSchool(schoolDto: ISchoolCreationAttrs) {

        return await this.schoolRepository.createSchool(schoolDto);
    }

    async updateSchool(school_id: number, schoolDto: ISchoolUpdate) {

        return await this.schoolRepository.updateSchool(school_id, schoolDto)
    }

    async removeSchool(school_id: number) {

        return await this.schoolRepository.removeSchool(school_id);
    }
}
