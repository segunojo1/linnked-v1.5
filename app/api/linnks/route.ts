import { db } from "@/db";
import { createLinnkSchema, respondSchema } from "@/validations/linnk.validation";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { users, linnks, linnkIcons, linnkResponses } from "@/db/schema";
import { generateLinkId } from "@/helpers/generate-linnk-id";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = createLinnkSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const result = await db.transaction(async (tx) => {
      const existingUser = await tx.query.users.findFirst({
        where: eq(users.email, data.senderEmail),
      });

      const senderId =
        existingUser?.id ??
        (
          await tx
            .insert(users)
            .values({
              name: data.senderName,
              email: data.senderEmail,
            })
            .returning({ id: users.id })
        )[0].id;

      let linkId = generateLinkId();

      for (let i = 0; i < 5; i++) {
        const exists = await tx.query.linnks.findFirst({
          where: eq(linnks.linkId, linkId),
        });
        if (!exists) break;
        linkId = generateLinkId();
      }

      const created = await tx
        .insert(linnks)
        .values({
          linkId,
          senderUserId: senderId,
          recipientName: data.recipientName,
          template: data.template,
          messageTitle: data.messageTitle,
          messageBody: data.messageBody,
          signatureImageUrl: data.signatureImageUrl || null,
          backgroundImageUrl: data.backgroundImageUrl || null,
          status: "sent",
        })
        .returning({ id: linnks.id, linkId: linnks.linkId });

      await tx.insert(linnkIcons).values(
        data.icons.map((icon) => ({
          linnkId: created.id,
          position: icon.position,
          iconSrc: icon.iconSrc,
          iconNote: icon.iconNote || null,
        })),
      );

      return created;
    });

    return NextResponse.json(
      {
        ok: true,
        linkId: result.linkId,
        shareUrl: "/linnk/" + result.linkId,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to create linnk" });
  }
}



