import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {BlockCabinet} from "../domain/entity/blockCabinet.model";
import {ICreateBlockCabinet} from "../domain/dto/blockCabinet-service.dto";

@Injectable()
export class BlockCabinetRepository {

    constructor(@InjectModel(BlockCabinet) private blockCabinetRepository: typeof BlockCabinet) { }

    async addUser(userDto: ICreateBlockCabinet) {

        return await this.blockCabinetRepository.create(userDto);
    }

    async removeCabinet(id: number) {

        const result = await this.blockCabinetRepository.destroy({ where: { id }})

        return result && { id }
    }
}