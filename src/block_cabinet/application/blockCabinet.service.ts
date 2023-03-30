import {Injectable} from "@nestjs/common";
import {BlockCabinetQueryRepository} from "../infrastructure/blockCabinet.query.repository";
import {BlockCabinetRepository} from "../infrastructure/blockCabinet.repository";
import {ICreateBlockCabinet} from "../domain/dto/blockCabinet-service.dto";


@Injectable()
export class BlockCabinetService {

    constructor(
        private blockCabinetQueryRepository: BlockCabinetQueryRepository,
        private blockCabinetQuRepository: BlockCabinetRepository,
    ) { }

    async getAll() {

        return await this.blockCabinetQueryRepository.getAll();
    }

    async getUserById(user_id: number) {

        return await this.blockCabinetQueryRepository.getUserById(user_id);
    }

    async getById(id: number) {

        return await this.blockCabinetQueryRepository.getById(id);
    }

    async addUser(userDto: ICreateBlockCabinet) {

        return await this.blockCabinetQuRepository.addUser(userDto);
    }

    async removeCabinet(id: number) {

        return await this.blockCabinetQuRepository.removeCabinet(id);
    }
}