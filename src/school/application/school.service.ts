import {Injectable} from '@nestjs/common';
import {SchoolQueryRepository} from "../infrastructure/school.query.repository";
import {SchoolRepository} from "../infrastructure/school.repository";
import {ISchoolCreationAttrs, ISchoolParam, ISchoolUpdate} from "../domain/dto/school-service.dto";
import {UsersService} from "../../users/application/users.service";

@Injectable()
export class SchoolService {

    constructor(
        private schoolQueryRepository: SchoolQueryRepository,
        private schoolRepository: SchoolRepository,
        private userService: UsersService,
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

    async createSchool(userId: number, schoolDto: ISchoolCreationAttrs) {

        const newSchool = await this.schoolRepository.createSchool(schoolDto);

        await this.userService.updateUser(userId, {school_id: newSchool.school_id})

        return newSchool;
    }

    async updateSchool(school_id: number, schoolDto: ISchoolUpdate) {

        return await this.schoolRepository.updateSchool(school_id, schoolDto)
    }

    async removeSchool(school_id: number) {

        return await this.schoolRepository.removeSchool(school_id);
    }
}
