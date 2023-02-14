import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Manager} from "../model/manager.model";
import {CreateManagerDto, UpdateManagerDto} from "../dto/create-manager.dto";

@Injectable()
export class ManagerService {

    constructor(@InjectModel(Manager) private managerRepo: typeof Manager,) { }

    async getAll() {

        return await this.managerRepo.findAll();
    }

    async getByEmail(email: string){

        const manager = await this.managerRepo.findOne({where: {email}})

        if (!manager) {
            throw new HttpException('Такого менеджера не существует',HttpStatus.BAD_REQUEST)
        }

        return manager;
    }

    async createManager(managerDto: CreateManagerDto) {

        const manager = await this.managerRepo.findOne({where: {email:managerDto.email}})

        if (manager) {
            throw new BadRequestException([
                {
                    message: 'Менеджер существует',
                    field: 'email',
                },
            ]);
        }

        return await this.managerRepo.create(managerDto);
    }

    async updateManager(manager_id: string, managerDto: UpdateManagerDto) {

        const manager = await this.managerRepo.findOne({where: {manager_id}})

        if (!manager) {
            throw new HttpException('Такого менеджера не существует',HttpStatus.BAD_REQUEST)
        }

        return await manager.update(managerDto);
    }

    async removeManager(manager_id: string) {

        const result = await this.managerRepo.destroy({where: {manager_id}})

        return result ? {message: "Менеджер удален"} : {message: "Менеджер не найден."}
    }
}