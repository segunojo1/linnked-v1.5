import { z } from "zod"

export const waitlistValidationSchema = z.object({
    firstName: z.string().min(1, "Sender name is required"),
    email: z.string().email("Invalid email address"),
})

export type waitlistFormDef = z.infer<
  typeof waitlistValidationSchema
>;