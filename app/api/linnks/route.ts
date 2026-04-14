import { db } from "@/db";
import { createLinnkSchema } from "@/validations/linnk.validation";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { users, linnks, linnkIcons } from "@/db/schema";
import { generateLinkId } from "@/helpers/generate-linnk-id";

export async function POST(req: Request) {
  try {
    console.log("Received request to create linnk");
    const json = await req.json();
    const parsed = createLinnkSchema.safeParse(json);
    console.log(parsed);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    

    const data = parsed.data;

    console.log(data);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.senderEmail),
    });
    if (!existingUser) {
      console.log("No existing user found, creating new user");
    };

    const senderId =
      existingUser?.id ??
      (
        await db
          .insert(users)
          .values({
            name: data.senderName,
            email: data.senderEmail,
          })
          .returning({ id: users.id })
      )[0].id;

    console.log(senderId);

    let linkId = generateLinkId();

    for (let i = 0; i < 5; i++) {
      const exists = await db.query.linnks.findFirst({
        where: eq(linnks.linkId, linkId),
      });
      if (!exists) break;
      linkId = generateLinkId();
    }

    const [created] = await db
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

    await db.insert(linnkIcons).values(
      data.icons.map((icon) => ({
        linnkId: created.id,
        position: icon.position,
        iconSrc: icon.iconSrc,
        iconNote: icon.iconNote || null,
      })),
    );

    const result = created;
    console.log("testttt");

    return NextResponse.json(
      {
        message: "Linnk created successfully",
        ok: true,
        linkId: result.linkId,
        shareUrl: "/linnk/" + result.linkId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create linnk", error);
    return NextResponse.json(
      {
        error: "Failed to create linnk",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
