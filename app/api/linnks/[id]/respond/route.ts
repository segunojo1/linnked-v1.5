import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { linnks, linnkResponses, users } from "@/db/schema";
import { respondSchema } from "@/validations/linnk.validation";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// /api/linnks/[id]/respond

// FOR IMPLEMENTATION OF RESEND EMAIL
export async function sendResponseEmail(params: {
  senderEmail: string;
  senderName: string;
  recipientName: string;
  choice: "yes" | "no";
  linkId: string;
}) {
  const { senderEmail, senderName, recipientName, choice, linkId } = params;

  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.EMAIL_FROM
  ) {
    console.warn("SMTP configuration is incomplete");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject =
    choice === "yes"
      ? `${recipientName} said yes to your Linnk`
      : `${recipientName} responded to your Linnk`;

  const link = `${process.env.APP_URL ?? ""}/linnk/${linkId}`;
  const responseLabel = choice === "yes" ? "Yes" : "No";
  const responseTone =
    choice === "yes"
      ? "They felt the message and responded positively."
      : "They have seen your message and shared their response.";
  const badgeBg = choice === "yes" ? "#E7F8EE" : "#FFF0F0";
  const badgeColor = choice === "yes" ? "#196B3E" : "#9F1D1D";

  const html = `
  <div style="margin:0;padding:24px;background:#F7F4EE;font-family:Helvetica,Arial,sans-serif;color:#1F1F1F;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#FFFFFF;border:1px solid #E9E3D6;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background:linear-gradient(135deg,#FFF8EA,#F8F2FF);border-bottom:1px solid #EEE7DB;">
          <div style="font-size:12px;letter-spacing:1.1px;font-weight:700;text-transform:uppercase;color:#6B665A;">Linnked</div>
          <h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;color:#00000;font-weight:700;">You got a new response</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:26px 28px 10px;">
          <p style="margin:0 0 14px;font-size:16px;line-height:1.6;">Hi ${senderName},</p>
          <p style="margin:0 0 14px;font-size:16px;line-height:1.6;">
            <strong>${recipientName}</strong> has responded to your Linnk.
          </p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#4B4B4B;">${responseTone}</p>
          <div style="display:inline-block;padding:7px 12px;border-radius:999px;background:${badgeBg};color:${badgeColor};font-size:13px;font-weight:700;letter-spacing:.2px;">
            Response: ${responseLabel}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px 28px;">
          <a href="${link}" style="display:inline-block;background:#1F1F1F;color:#FFFFFF;text-decoration:none;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:700;">
            View Your Linnk
          </a>
          <p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#767676;word-break:break-all;">
            If the button does not work, open this link:<br />
            <a href="${link}" style="color:#2F5BD2;text-decoration:underline;">${link}</a>
          </p>
        </td>
      </tr>
    </table>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: senderEmail,
      subject,
      html,
    });
  } catch (error) {
    console.error("Failed to send response email", error);
  }
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

    const inserted = await db
      .insert(linnkResponses)
      .values({
        linnkId: linnk.id,
        choice,
        recipientIp: null,
        userAgent: req.headers.get("user-agent") || null,
      })
      .onConflictDoNothing({ target: linnkResponses.linnkId })
      .returning({ id: linnkResponses.id });

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

    return NextResponse.json({
      ok: true,
      choice,
      message: "Response recorded",
    });
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
