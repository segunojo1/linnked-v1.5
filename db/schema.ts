import { index, integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const templateEnum = pgEnum("template", ["singlepage", "new"])
export const linnkStatusEnum = pgEnum("linnk_status", ["draft", "sent", "viewed", "responded_yes", "responded_no"]);
export const responseChoiceEnum = pgEnum("response_choice", ["yes", "no"]);
export const emailEventTypeEnum = pgEnum("email_event_type", [
    "link_created",
    "recipient_viewed",
    "recipient_responded_yes",
    "recipient_responded_no"
])
export const emailStatusEnum = pgEnum("email_status", ["queued", "sent", "failed"]);

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull()
},
(t) => ({
    emailUnique: uniqueIndex("users_email_unique").on(t.email)
}))

export const linnks = pgTable(
    "linnks", 
    {
    id: uuid("id").defaultRandom().primaryKey(),
    linkId: text("link_id").notNull(), // public unique ID used in URL
    senderUserId: uuid("sender_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recipientName: text("recipient_name").notNull(),
    template: templateEnum("template").notNull(),
    messageTitle: text("message_title").notNull(),
    messageBody: text("message_body").notNull(),
    signatureImageUrl: text("signature_image_url"),
    backgroundImageUrl: text("background_image_url"),
    status: linnkStatusEnum("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    linkIdUnique: uniqueIndex("linnks_link_id_unique").on(t.linkId),
    senderIdx: index("linnks_sender_user_id_idx").on(t.senderUserId),
  })
)

export const linnkIcons = pgTable(
    "linnk_icons",
    {
    id: uuid("id").defaultRandom().primaryKey(),
    linnkId: uuid("linnk_id")
      .notNull()
      .references(() => linnks.id, { onDelete: "cascade" }),
    position: integer("position").notNull(), // 1..5
    iconSrc: text("icon_src").notNull(),
    iconNote: text("icon_note"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    linnkIdx: index("linnk_icons_linnk_id_idx").on(t.linnkId),
    oneIconPerPosition: uniqueIndex("linnk_icons_linnk_id_position_unique").on(
      t.linnkId,
      t.position
    ),
  })
);

export const linnkResponses = pgTable(
    "linnk_responses",
    {
    id: uuid("id").defaultRandom().primaryKey(),
    linnkId: uuid("linnk_id")
      .notNull()
      .references(() => linnks.id, { onDelete: "cascade" }),
    choice: responseChoiceEnum("choice").notNull(),
    respondedAt: timestamp("responded_at", { withTimezone: true }).defaultNow().notNull(),
    recipientIp: text("recipient_ip"),
    userAgent: text("user_agent"),
  },
  (t) => ({
    oneResponsePerLinnk: uniqueIndex("linnk_responses_linnk_id_unique").on(t.linnkId),
  })
)

// im gonna be using this if i ever need to do custom email sending 
export const emailEvents = pgTable(
  "email_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    linnkId: uuid("linnk_id")
      .notNull()
      .references(() => linnks.id, { onDelete: "cascade" }),
    eventType: emailEventTypeEnum("event_type").notNull(),
    recipientEmail: text("recipient_email").notNull(),
    providerMessageId: text("provider_message_id"),
    status: emailStatusEnum("status").notNull().default("queued"),
    errorMessage: text("error_message"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    linnkIdx: index("email_events_linnk_id_idx").on(t.linnkId),
  })
);