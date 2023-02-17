import {BadRequestException, Injectable} from "@nestjs/common";
import {LoginDto} from "../dto/auth.dto";
import {CreateManagerDto} from "../dto/create-manager.dto";
import {ManagerService} from "./manager.service";
import {ValidateUserService} from "./validateUser.service";
import {JwtTokenService} from "./jwtToken.service";

@Injectable()
export class AuthService {

    constructor(private managerService: ManagerService,
                private validateUserService: ValidateUserService,
                private jwtTokenService: JwtTokenService) { }

    async login(userDto: LoginDto) {

        const user = await this.validateUserService.validateUser(userDto);

        return this.jwtTokenService.generateToken(user);
    }

    async registration(managerDto: CreateManagerDto) {

        const candidate = await this.managerService.searchByEmail(managerDto.email);

        if (candidate) {

            throw new BadRequestException({
                message: 'Менеджер существует',
                field: 'email',
            });
        }

        return await this.managerService.createManager(managerDto);
    }
}
