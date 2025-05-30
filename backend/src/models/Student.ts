import { Schema, model, Document } from 'mongoose'

export interface IStudent extends Document {
  name: string
  appName: string
  coverImage: string
  type: 'web' | 'mobile' | 'other' 
}

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  appName: { type: String, required: true },
  coverImage: { type: String, required: true },
  type: { type: String, enum: ['web', 'mobile', 'other'], required: true }
})

export const Student = model<IStudent>('Student', studentSchema)
