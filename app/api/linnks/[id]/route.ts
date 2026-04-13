import { db } from "@/db";
import { linnkIcons, linnkResponses, linnks } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// /api/linnks/[id]
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const linnk = await db.query.linnks.findFirst({
    where: eq(linnks.linkId, id),
  });

  if (!linnk) {
    return NextResponse.json({ error: "Linnk not found" }, { status: 404 });
  }

  const [sender, icons, response] = await Promise.all([
    db.query.users.findFirst({ where: eq(users.id, linnk.senderUserId) }),
    db.query.linnkIcons.findMany({
      where: eq(linnkIcons.linnkId, linnk.id),
      orderBy: [asc(linnkIcons.position)],
    }),
    db.query.linnkResponses.findFirst({
      where: eq(linnkResponses.linnkId, linnk.id),
    }),
  ]);

  return NextResponse.json(
    {
      linkId: linnk.linkId,
      senderName: sender?.name || "",
      senderEmail: sender?.email || "",
      recipientName: linnk.recipientName,
      template: linnk.template,
      messageTitle: linnk.messageTitle,
      messageBody: linnk.messageBody,
      signatureImageUrl: linnk.signatureImageUrl,
      backgroundImageUrl: linnk.backgroundImageUrl,
      status: linnk.status,
      icons: icons.map((i) => ({
        position: i.position,
        iconSrc: i.iconSrc,
        iconNote: i.iconNote,
      })),
      result: response ? { choice: response.choice, respondedAt: response.respondedAt} : null
    },
    { status: 200 },
  );
}