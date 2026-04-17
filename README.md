# LINNKED

Linnked is a soft, Valentine-inspired messaging app for sending someone a message that feels more personal than a text and more memorable than an email. Instead of dropping plain words into a chat thread, you build a small experience around them: choose a template, write the message, add a signature, decorate it with icons or a background, then share a unique Linnk that opens into a recipient-only reveal.

The project leans into a cute, handcrafted feel on purpose. It is built to make the act of sending a message feel thoughtful, a little dramatic, and fun to read through from start to finish.

## What Linnked Does

Linnked lets a sender create a custom message flow and generate a shareable public link. The recipient opens that link, reads the message in a tailored layout, and can respond with a simple yes or no. The app stores the message, the decorative icons, and the response status in Postgres through Drizzle.

In practice, the flow looks like this:

1. Enter sender and recipient details.
2. Pick a template style.
3. Write the message and customize its presentation.
4. Preview the final result.
5. Generate and share the Linnk.
6. Let the recipient open the Linnk and respond.

## How To Use It

### Sender flow

1. Open the app and go to the message builder.
2. Fill in your name, email, and the recipient's name.
3. Choose a template style.
4. Write the title and body of the message.
5. Add a signature image or a background image if you want the message to feel more personal.
6. Customize the set of header icons used in the final message.
7. Preview the Linnk and continue until the app generates a shareable route.
8. Copy or share the resulting link.

### Recipient flow

1. Open the shared Linnk URL.
2. Wait while the app fetches the message by its public link ID.
3. Read the welcome screen and the main message view.
4. Respond with yes or no.
5. The app records the response and updates the message status.
6. If email delivery is configured, the sender can receive a notification about the response.

## Project Structure

The codebase is organized around the sender experience, the recipient experience, and the API layer that connects them.

### App routes

- [app/page.tsx](app/page.tsx) is the landing page and product story.
- [app/(sender)/form/page.tsx](<app/(sender)/form/page.tsx>) is the multi-step sender form.
- [app/(reciever)/linnk/[id]/page.tsx](<app/(reciever)/linnk/[id]/page.tsx>) renders the recipient experience for a public Linnk.
- [app/api/linnks/route.ts](app/api/linnks/route.ts) creates new Linnks.
- [app/api/linnks/[id]/route.ts](app/api/linnks/[id]/route.ts) fetches a Linnk by its public ID.
- [app/api/linnks/[id]/respond/route.ts](app/api/linnks/[id]/respond/route.ts) stores the recipient response.

### Sender side

- [app/(sender)/form/\_components/](<app/(sender)/form/_components>) contains the step-by-step form UI.
- [store/form.store.ts](store/form.store.ts) holds the sender wizard state with Zustand.
- [helpers/upload-media.ts](helpers/upload-media.ts) uploads background and signature assets to Cloudinary.
- [validations/linnk.validation.ts](validations/linnk.validation.ts) validates the payload before the Linnk is created.

### Recipient side

- [app/(reciever)/linnk/[id]/\_components/](<app/(reciever)/linnk/[id]/_components>) contains the welcome screen, main message, and response states.
- [store/recipient.store.ts](store/recipient.store.ts) tracks the recipient step state and the fetched Linnk details.

### Data layer

- [db/schema.ts](db/schema.ts) defines users, linnks, linnk icons, linnk responses, and email event tables.
- [db/index.ts](db/index.ts) wires Drizzle to the Neon database connection.
- [helpers/generate-linnk-id.ts](helpers/generate-linnk-id.ts) creates the public 12-character link ID.

### Supporting code

- [components/](components) contains layout and reusable UI pieces.
- [services/](services) contains Azure-based helper clients that appear to be legacy or alternate integration paths.
- [hooks/](hooks) contains client-side utilities such as mobile detection.
- [types/](types) contains shared TypeScript types.

## Architecture Notes

The main production flow currently runs through the local Next.js API routes, not the Azure service helpers in [services/](services). The sender form posts to [app/api/linnks/route.ts](app/api/linnks/route.ts), which inserts a user if needed, creates a Linnk, stores up to six icons, and returns the share URL.

The recipient page fetches by public `linkId`, not by internal database ID. That keeps the shareable URL short and easier to send around.

Responses are intentionally one-per-Linnk. The database enforces that constraint, and the response route also guards against duplicates so simultaneous submissions do not create inconsistent state.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Drizzle ORM
- PostgreSQL on Neon
- Zustand for client state
- Zod for validation
- Cloudinary for image uploads
- Nodemailer for response emails
- Motion and canvas-confetti for interactive animation

## Environment Variables

Create a local environment file with at least the variables used by the app:

```env
DATABASE_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
APP_URL=
```

`APP_URL` is used when building response emails, and `SMTP_*` is only required if you want outbound recipient response notifications.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Other available scripts:

- `npm run build` to build the app for production.
- `npm run start` to run the production build.
- `npm run lint` to run ESLint.
- `npm run db:generate` to generate Drizzle migrations.
- `npm run db:migrate` to apply migrations.
- `npm run db:studio` to open Drizzle Studio.

## Database Model

The schema is centered around a few core tables:

- `users` stores sender identity.
- `linnks` stores the message content and status.
- `linnk_icons` stores decorative icon slots.
- `linnk_responses` stores the recipient's yes/no response.
- `email_events` is prepared for richer email tracking.

## Notes On The Current Codebase

- The route group spelling uses `(reciever)` in the current codebase.
- The project uses both `linnk` and `linnks` in file names and routes as part of the current naming scheme.
- `dashboard/` exists but is still a placeholder.
- The sender and recipient experiences both rely heavily on Zustand for cross-step UI state.

## In One Sentence

Linnked is a small, affectionate message experience: write something sweet, dress it up, share a Linnk, and let the recipient open it like a tiny digital love letter.

# or

bun dev

```

```
