import { APIError } from '../../Utils/error';
import { UserModel } from './model';
import { TLoginControllerInput, TRegisterControllerInput } from './validation';
import { comparePassword, generateToken, hashPassword } from '../../Utils/auth';

export async function createUserService(input: TRegisterControllerInput) {
  const { email, name, password, phoneNumber, role } = input;

  const user = await UserModel.findOne({ email });
  if (user) {
    throw APIError.conflict('User already exists');
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new UserModel({
    email,
    name,
    password: hashedPassword,
    phoneNumber,
    role,
  });

  await newUser.save();

  return newUser;
}

export async function loginService(input: TLoginControllerInput) {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw APIError.unauthorized('Invalid credentials');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw APIError.unauthorized('Invalid credentials');
  }

  const token = generateToken({
    id: user._id.toString(),
    username: user.name,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}

export async function getUserById(id: string) {
  const user = await UserModel.findById(id);
  if (!user) {
    throw APIError.notFound('User not found');
  }

  return user;
}
