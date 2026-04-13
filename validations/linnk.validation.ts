import z from "zod";

export const createLinnkSchema = z.object({
    senderName: z.string().min(1),
    senderEmail: z.string().email(),
    recipientName: z.string().min(1),
    template: z.enum(["singlepage", "new"]),
    messageTitle: z.string().min(1),
    messageBody: z.string().min(1),
    signatureImageUrl: z.string().url().optional().or(z.literal("")),
  backgroundImageUrl: z.string().url().optional().or(z.literal("")),
  icons: z
    .array(
      z.object({
        position: z.number().int().min(1).max(5),
        iconSrc: z.string().min(1),
        iconNote: z.string().optional(),
      })
    )
    .length(5),
})

export const respondSchema = z.object({
    choice: z.enum(["yes", "no"]),
})