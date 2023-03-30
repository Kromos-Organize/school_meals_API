import {Injectable, Scope} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {BlockCabinet} from "../domain/entity/blockCabinet.model";

@Injectable({ scope: Scope.DEFAULT })
export class BlockCabinetQueryRepository {

    @InjectModel(BlockCabinet) private blockCabinetRepository: typeof BlockCabinet;

    async getAll() {

        return await this.blockCabinetRepository.findAll();
    }

    async getBlockById(id: number) {

        return await this.blockCabinetRepository.findOne({ where: { id}})
    }

    async getBlocByUserId(user_id: number) {

        return await this.blockCabinetRepository.findOne({ where: { user_id}})
    }

    async getBlockBySchoolId(school_id: number) {

        return await this.blockCabinetRepository.findOne({ where: { school_id}})
    }
}