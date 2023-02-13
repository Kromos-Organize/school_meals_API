import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Moderation} from "../model/moderation.model";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {Employee} from "../model/employee.model";

@Injectable()
export class ModerationService {

    constructor(@InjectModel(Moderation) private moderationRepo: typeof Moderation,
                @InjectModel(Employee) private employeeRepo: typeof Employee) { }

    async create(employeeDto: CreateEmployeeDto){

        const candidate = await this.moderationRepo.findOne({where: {email: employeeDto.email}})

        if (candidate) {

            throw new BadRequestException([
                {
                    message: 'Запрос на модерацию уже существует',
                    field: 'email',
                },
            ]);
        }

        return await this.moderationRepo.create(employeeDto);
    }

    async getAll() {

        return await this.moderationRepo.findAll({include: {all: true}});
    }

    async confirm(id: string) {

        const candidate = await this.moderationRepo.findOne({where:{employee_id: id}})

        if (!candidate) {

            throw new HttpException('Пользователь в таблице модерации отсутствует.',HttpStatus.BAD_REQUEST)
        }

        await this.employeeRepo.create({email: candidate.email, password: candidate.password});
        await this.remove(id);

        return {message: "Администратор школы добавлен."}
    }

    async remove(id: string) {

        const result = await this.moderationRepo.destroy({where:{employee_id: id}})

        return result ? {message: "Запрос на модерацию удален"} : {message: "Запрос на модерацию отсутсвтует."}
    }
}
