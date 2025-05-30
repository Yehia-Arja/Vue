import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Yourdb'

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
})

const User = mongoose.model('User', userSchema)

// Student schema and model with type
const studentSchema = new mongoose.Schema({
  name: String,
  appName: String,
  coverImage: String,
  type: { type: String, enum: ['mobile', 'web', 'both'], required: true },
})

const Student = mongoose.model('Student', studentSchema)

const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'yehia123', // will hash this below
  },
]

const students = [
  { name: 'Ibrahim Hassoun', appName: 'Batal', coverImage: 'http://localhost:5000/images/Ibrahim_Hassoun_Cover_Image.png', type: 'mobile' },
  { name: 'Ali Eldor', appName: 'Tourivo', coverImage: 'http://localhost:5000/images/Ali-Eldor_Cover_Image.png', type: 'web' },
  { name: 'Ghady Matta', appName: 'Tutoron-GPT', coverImage: 'http://localhost:5000/images/Ghady Matta.png', type: 'web' },
  { name: 'Malak Atieh', appName: 'Silent Pixel', coverImage: 'http://localhost:5000/images/Malak_Atieh_CoverImage.png', type: 'mobile' },
  { name: 'Hasan Mawassi', appName: 'SmartClinic', coverImage: 'http://localhost:5000/images/Hasan_Mawassi.png', type: 'both' },
  { name: 'Haidar Farhat', appName: 'NuScaler', coverImage: 'http://localhost:5000/images/haidar_farhat_coverimage_NuScaler.png', type: 'web' },
  { name: 'Rawan Ghobar', appName: 'Fridget', coverImage: 'http://localhost:5000/images/Rawan_Ghobar_Cover_Photo.png', type: 'mobile' },
  { name: 'Abbas Hassan', appName: 'StockTock', coverImage: 'http://localhost:5000/images/AbbasHassan-CoverImage.png', type: 'mobile' }, 
  { name: 'Ali Al Ahmad', appName: 'Comic Studio', coverImage: 'http://localhost:5000/images/Ali_Al_Ahmad_CoverImage.png', type: 'web' },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    // Clean existing data
    await User.deleteMany({})
    await Student.deleteMany({})

    // Hash passwords before inserting
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    )

    await User.insertMany(hashedUsers)
    await Student.insertMany(students)

    console.log('Seed data inserted successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seed()
