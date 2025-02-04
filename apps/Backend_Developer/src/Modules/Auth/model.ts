import mongoose, { Schema, Document } from 'mongoose';

export type TUserRole = 'user' | 'admin' | 'superadmin';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: TUserRole;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
