import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

// Next.js 16 changed signatures — cast to avoid overload conflicts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invalidatePath = revalidatePath as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invalidateTag = revalidateTag as any;

export async function POST(req: NextRequest) {
  const secret = req.headers.get("sanity-webhook-secret");

  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { _type?: string };
    const documentType = body._type;

    switch (documentType) {
      case "photo":
        invalidateTag("photos");
        invalidatePath("/portfolio");
        invalidatePath("/");
        break;
      case "print":
        invalidateTag("prints");
        invalidatePath("/shop");
        invalidatePath("/");
        break;
      case "tour":
        invalidateTag("tours");
        invalidatePath("/tours");
        invalidatePath("/");
        break;
      case "siteSettings":
        invalidateTag("settings");
        invalidatePath("/");
        break;
      default:
        invalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, documentType });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  invalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true });
}
