import { Request, Response } from 'express'
import { Student } from '../models/Student'

export const getStudents = async (req: Request, res: Response) => {
  const { type } = req.query

  try {
    const filter = (() => {
      if (!type || type === '') return {}

      const t = String(type).toLowerCase()

      const map: Record<string, any> = {
        mobile: { type: { $in: ['mobile', 'both'] } },
        web: { type: { $in: ['web', 'both'] } },
      }

      return map[t] || {}
    })()

    const students = await Student.find(filter).sort({ name: 1 }).exec()
    res.json(students)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' })
  }
}
