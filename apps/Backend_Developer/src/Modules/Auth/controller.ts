import { Request, Response } from 'express';
import { registerUser, loginUser } from './services';
import { RegisterSchema, LoginSchema } from './validation';

export async function registerController(req: Request, res: Response) {
  try {
    const { success, data, error } = RegisterSchema.safeParse(req.body);
    if (!success) return res.status(400).json({ message: 'Invalid data', errors: error.flatten().fieldErrors });

    const user = await registerUser(data.username, data.email, data.password, data.role);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { success, data, error } = LoginSchema.safeParse(req.body);
    if (!success) return res.status(400).json({ message: 'Invalid data', errors: error.flatten().fieldErrors });

    const result = await loginUser(data.email, data.password);
    res.cookie('token', result.token, { httpOnly: true, secure: true });
    res.json({ message: 'Login successful', user: result.user });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}
