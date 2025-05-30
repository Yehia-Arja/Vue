import { Request, Response } from 'express'
import { Student } from '../models/Student'

export const getStudents = async (req: Request, res: Response) => {
  const { type } = req.query

  try {
    const filter = type ? { type } : {}

    const students = await Student.find(filter).exec()
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' })
  }
}
