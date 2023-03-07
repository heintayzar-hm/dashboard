import {verifyToken, generateToken} from './tokenService';
import { comparePassword, hashPassword} from './passwordService';
import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 3
};


export {
    verifyToken,
    generateToken,
    comparePassword,
    hashPassword,
    cookieOptions
};
