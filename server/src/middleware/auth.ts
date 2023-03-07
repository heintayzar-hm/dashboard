import { Request, Response, NextFunction } from 'express';
import Validator from 'validatorjs';
import User from '../model/user';
import { comparePassword, verifyToken } from '../services/config';

export const validateRegistrationData = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const rules = {
    name: 'required|string',
    email: 'required|email',
    password: 'required|min:6',
    confirmPassword: 'required|same:password',
  };
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    const errors = validation.errors.all();
    return res.status(422).json({ errors });
  }

    const exitingUser = await User.findOne({ email: data.email });
    if (exitingUser) {
        return res.status(400).send('Email already registered');
    }
  return next();
};

export const validateLoginData = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const rules = {
    email: 'required|email',
    password: 'required|min:6',
  }
  const validation = new Validator(data, rules);
  if(validation.fails()) {
    const errors = validation.errors.all();
    return res.status(422).json({ errors });
  }
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  const validPassword = await comparePassword(data.password, user.password);

  if (!validPassword) {
    return res.status(401).send('Invalid email or password');
  }

  return next();
}

export const cookieValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if(!token) {
    return res.status(401).send('Unauthorized, 1');
  }
  try {
    const decoded = await verifyToken(token);
    if(!decoded) {
      return res.status(401).send(decoded);
    }
    return next()
  } catch (error) {
    return res.status(401).send('Unauthorized, 3');
  }
}

