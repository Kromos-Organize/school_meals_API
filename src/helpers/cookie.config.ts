import {CookieOptions} from "express";

export const cookieConfigToken: CookieOptions = {
    maxAge: 24*60*60*1000,
    httpOnly: true,
    secure: false,
    sameSite: "none"
}