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
  type: { type: String, enum: ['mobile', 'website', 'both'], required: true },
})

const Student = mongoose.model('Student', studentSchema)

const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123', // will hash this below
  },
]

// Random helper to pick 'mobile' or 'website'
const randomType = () => (Math.random() < 0.5 ? 'mobile' : 'website')

const students = [
  { name: 'Hassan Abou Khalil', appName: 'VersusAI', coverImage: 'http://localhost:5000/images/hassan-abou-khalil_cover-image.png', type: randomType() },
  { name: 'Ali Eldor', appName: 'Tourivo', coverImage: 'http://localhost:5000/images/Ali-Eldor_Cover_Image.png', type: randomType() },
  { name: 'Ghady Matta', appName: 'Tutoron-GPT', coverImage: 'http://localhost:5000/images/Ghady Matta.png', type: randomType() },
  { name: 'Houssien Zeineddine', appName: 'Secure Remote Voting', coverImage: 'http://localhost:5000/images/Houssien Zeineddine Cover-Image.png', type: randomType() },
  { name: 'Hasan Mawassi', appName: 'SmartClinic', coverImage: 'http://localhost:5000/images/Hasan_Mawassi.png', type: randomType() },
  { name: 'Haidar Farhat', appName: 'NuScaler', coverImage: 'http://localhost:5000/images/haidar_farhat_coverimage_NuScaler.png', type: randomType() },
  { name: 'Hussein Abdallah', appName: 'CareerForgeAI', coverImage: 'http://localhost:5000/images/Hussein-Abdallah-CoverImage.png', type: randomType() },
  { name: 'Abbas Hassan', appName: 'StockTock', coverImage: 'http://localhost:5000/images/AbbasHassan-CoverImage.png', type: 'mobile' },  // fixed mobile
  { name: 'Ali Al Ahmad', appName: 'Comic Studio', coverImage: 'http://localhost:5000/images/Ali_Al_Ahmad_CoverImage.png', type: 'both' }, // set to both explicitly
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
