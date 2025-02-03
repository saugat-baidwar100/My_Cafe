import mongoose from 'mongoose';
import { env } from './config';

const uri = env.MONGO_URI;

export async function createDBConnection() {
  try {
    const db = await mongoose.connect(uri, {
      dbName: 'MyCafe',
    });
    return db;
  } catch (error) {
    console.log('Error while connecting to the database ', error);
  }
}
