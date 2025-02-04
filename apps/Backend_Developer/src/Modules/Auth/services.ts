import { User } from '../../Modules/Auth/model';
import { hashPassword, comparePassword, generateToken } from '../../Utils/auth';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export async function registerUser(username: string, email: string, password: string, role: string = 'user') {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, email, password: hashedPassword, role });
  await newUser.save();

  return { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
  });

  return { token, user: { id: user._id, username: user.username, email: user.email, role: user.role } };
}
