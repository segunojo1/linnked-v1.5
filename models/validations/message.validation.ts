import { z } from "zod"

export const messageValidationSchema = z.object({
    message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(160, {
      message: "Message must not be longer than 30 characters.",
    }),
})

export type messageFormDef = z.infer<
  typeof messageValidationSchema
>;

export const aiMessageValidationSchema = z.object({
  message: z
  .string()
  .min(10, {
    message: "Description must be at least 10 characters.",
  })
  .max(160, {
    message: "Description must not be longer than 30 characters.",
  }),
})

export type aiMessageFormDef = z.infer<
typeof aiMessageValidationSchema
>;