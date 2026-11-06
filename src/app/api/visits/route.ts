import { connection, NextResponse } from "next/server";
import { getVisitStats, isBot, recordVisit } from "@/lib/visits";

const COOKIE = "akash_vid";

export async function GET() {
  await connection();
  return NextResponse.json(await getVisitStats());
}

export async function POST(request: Request) {
  await connection();

  const userAgent = request.headers.get("user-agent") ?? "";
  if (isBot(userAgent)) {
    return NextResponse.json(await getVisitStats());
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const isNewVisitor = !new RegExp(`(?:^|;\\s*)${COOKIE}=`).test(cookieHeader);
  const stats = await recordVisit(isNewVisitor);
  const response = NextResponse.json(stats);

  if (isNewVisitor) {
    response.cookies.set(COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return response;
}
