import { z } from "zod"

export const userValidationSchema = z.object({
    senderFirstName: z.string().min(1, "Sender name is required"),
    senderEmail: z.string().email("Invalid email address"),
    recipientFirstName: z.string().min(1, "Recipient name is required"),
})

export type userFormDef = z.infer<
  typeof userValidationSchema
>;