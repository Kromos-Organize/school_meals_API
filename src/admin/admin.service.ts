import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Admin} from "./admin.model";


@Injectable()
export class AdminService {


    constructor(@InjectModel(Admin) private adminRepo: typeof Admin) {

    }

    // private tempCreateAdminDto: CreateSuperAdminDto;
    //
    // async getAll() {
    //
    //     return this.superAdminRepository.findAll();
    // }
    //
    // async getAdminById(admin_id: string) {
    //
    //     const admin = await this.superAdminRepository.findOne({where: {admin_id}})
    //
    //     if (!admin) {
    //         throw new HttpException('Админ отсутствуетю.',HttpStatus.BAD_REQUEST)
    //     }
    //
    //     return admin
    // }
    //
    // async requestCreate(adminDto: CreateSuperAdminDto) {
    //
    //     try {
    //
    //         this.tempCreateAdminDto = adminDto;
    //
    //         const message = 'Запрос на создание админа\n'+JSON.stringify(adminDto)+'\n'+
    //             +'Введите пароль для подтверждения'
    //
    //         // await this.bot.sendMessageUser(message);
    //     }catch (e) {
    //         console.log(e)
    //     }
    // }
    //
    // async create() {
    //
    //     const admin = await this.superAdminRepository.create(this.tempCreateAdminDto)
    //
    //     this.tempCreateAdminDto = null;
    //
    //     if (admin) {
    //
    //         // await this.bot.sendMessageUser('Админ создан');
    //     }
    // }
    //
    // async update(admin_id: string, adminDto: CreateSuperAdminDto) {
    //
    //     // return this.superAdminRepository.update({where: {admin_id}},adminDto)
    // }
    //
    // async remove(admin_id: string) {
    //
    //     // await this.superAdminRepository.delete()
    // }
}
