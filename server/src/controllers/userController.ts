import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';
import { cookieOptions, verifyToken } from '../services/config';
export const register = async (request :Request, response :Response) => {
    try {
        const { name, email, password } = request.body;
        // encryption will be done in model
        // create user
        const user = new User({ name,email, password});
        await user.save()
        // add jwt token
        const token = await user.generateAuthToken();
        const { _id } = user;
        // response
        response.cookie('token', token, cookieOptions);
        response.status(201).json({message: 'user created', user: { _id, name, email }})
    } catch (error) {
        response.status(400).json({message: 'user not created', error});
    }

}

export const login = async (request: Request, response: Response) => {

    // validation is done in middleware

    // find user
    try {
        const user = await User.findOne({ email: request.body.email }).exec();
        if (!user) {
            return response.status(404).json({ message: 'user not found' });
        }

        const token = await user.generateAuthToken();
        const { _id, name, email } = user;
        // set in cookie
        response.cookie('token', token, cookieOptions);

        response.status(200).json({ message: 'user found', user: { name, email, _id }, token });
    } catch (error) {
        response.status(500).json({ message: 'user not found', error });
    }

}

export const logout = async (request: Request, response: Response) => {
    response.clearCookie('token');
  return response.status(200).json({ message: "Log Out"})
}


export const validateUser = async (request: Request, response: Response) => {
    const token = request.cookies.token;
    const decoded = await verifyToken(token);
    if (!decoded) {
        return response.status(401).send({ message: "Invalid User" });
    }
    const user = await User.findOne({ _id: decoded.id }).exec();
    if (!user) {
        return response.status(404).json({ message: 'user not found' });
    }

    const { name, email } = user;
    return response.status(200).json({ message: "Valid User", user: { name, email }})
}
