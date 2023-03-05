import jwt from "jsonwebtoken";


if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const JWT_SECRET = process.env.JWT_SECRET;
interface JwtPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: JwtPayload, expiresIn = '1h'): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
};
