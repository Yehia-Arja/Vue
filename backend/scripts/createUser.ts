import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';

dotenv.config();
mongoose.connect(process.env.MONGO_URI!).then(async () => {
  const hashed = await bcrypt.hash('yourPassword123', 10);
  await User.create({
    email: 'yehiaarja@gmail.com',
    password: hashed,
  });
  console.log('User created');
  mongoose.disconnect();
});
