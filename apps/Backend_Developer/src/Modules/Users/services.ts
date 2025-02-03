import { hashPassword } from '../../Utils/auth';
import { APIError } from '../../Utils/error';
import { userModel } from './model';
import { TUpdateUserControllerInput } from './validation';

export async function updateUserService(
  userId: string,
  input: TUpdateUserControllerInput
) {
  const { name, email, password, phoneNumber, address, city, role, isActive } =
    input;

  const user = await userModel.findById(userId);
  if (!user) {
    throw APIError.conflict('User not found');
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = await hashPassword(password); // Add your password hashing function
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (address) user.address = address;
  if (city) user.city = city;
  if (role) user.role = role;
  if (typeof isActive !== 'undefined') user.isActive = isActive;

  await user.save();
  return user;
}

export async function deleteUserService(userId: string) {
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) {
    throw APIError.conflict('User not found');
  }
  return user;
}

export async function getUsersService() {
  return await userModel.find();
}

export async function getUserByIdService(userId: string) {
  const user = await userModel.findById(userId);
  if (!user) {
    throw APIError.conflict('user not found');
  }
  return user;
}
