"use client"

import { z } from "zod"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type RegisterSchema = typeof registerSchema
type LoginSchema = typeof loginSchema

export { registerSchema, loginSchema, type RegisterSchema, type LoginSchema }
