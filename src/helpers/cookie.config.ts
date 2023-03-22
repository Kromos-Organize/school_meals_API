import * as process from "process";

export const cookieConfigToken = {
    maxAge: 24*60*60*1000,
    httpOnly: true,
    secure: (process.env.IS_DEV) ? process.env.IS_DEV != 'true' : false,
    sameSite: "none"
}