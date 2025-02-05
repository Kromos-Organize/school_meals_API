import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const Cookies = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.cookies.refreshToken;
    },
);

export const SuperAdmin = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.admin;
    },
);