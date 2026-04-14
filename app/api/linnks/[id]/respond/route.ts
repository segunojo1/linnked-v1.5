import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { linnks, linnkResponses, users } from "@/db/schema";
import { respondSchema } from "@/validations/linnk.validation";

// /api/linnks/[id]/respond

// FOR IMPLEMENTATION OF RESEND EMAIL
export async function sendResponseEmail(params: {
  senderEmail: string;
  senderName: string;
  recipientName: string;
  choice: "yes" | "no";
  linkId: string;
}) {
  return;
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid link id" }, { status: 400 });
    }

    const json = await req.json();
    const parsed = respondSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const linnk = await db.query.linnks.findFirst({
      where: eq(linnks.linkId, id),
    });

    if (!linnk) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const existingResponse = await db.query.linnkResponses.findFirst({
      where: eq(linnkResponses.linnkId, linnk.id),
    });

    if (existingResponse) {
      return NextResponse.json({ error: "Already responded" }, { status: 409 });
    }

    const choice = parsed.data.choice;

    const inserted = await db.insert(linnkResponses).values({
      linnkId: linnk.id,
      choice,
      recipientIp: null,
      userAgent: req.headers.get("user-agent") || null,
    }).onConflictDoNothing({ target: linnkResponses.linnkId })
    .returning({ id: linnkResponses.id});

    if (inserted.length === 0) {
      return NextResponse.json({ error: "Already responded" }, { status: 409 });
    }

    // await db.transaction(async (tx) => {
    //   await tx.insert(linnkResponses).values({
    //     linnkId: linnk.id,
    //     choice,
    //     recipientIp: null,
    //     userAgent: req.headers.get("user-agent") || null,
    //   });

    //   await tx
    //     .update(linnks)
    //     .set({
    //       status: choice === "yes" ? "responded_yes" : "responded_no",
    //       updatedAt: new Date(),
    //     })
    //     .where(eq(linnks.id, linnk.id));
    // });

     await db
        .update(linnks)
        .set({
          status: choice === "yes" ? "responded_yes" : "responded_no",
          updatedAt: new Date(),
        })
        .where(eq(linnks.id, linnk.id));

    const sender = await db.query.users.findFirst({
      where: eq(users.id, linnk.senderUserId),
    });

    if (sender) {
      await sendResponseEmail({
        senderEmail: sender.email,
        senderName: sender.name,
        recipientName: linnk.recipientName,
        choice,
        linkId: linnk.linkId,
      });
    }

    return NextResponse.json({ ok: true, choice, message: "Response recorded" });
  } catch (error) {
    // Postgres unique violation. This can happen on near-simultaneous duplicate submits.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "23505"
    ) {
      return NextResponse.json({ error: "Already responded" }, { status: 409 });
    }

    console.error("POST /api/linnks/[id]/respond failed", error);
    return NextResponse.json(
      {
        error: "Failed to submit response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
