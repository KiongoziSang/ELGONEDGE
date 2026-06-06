import { NextResponse } from "next/server";
import { sendChatLeadNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";

type ChatLeadPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  interestArea?: unknown;
  message?: unknown;
  source?: unknown;
  sourcePage?: unknown;
};

const interestAreas = new Set([
  "ElgonOS Demo",
  "ElgonOS Pricing",
  "Technical Support",
  "Elgon Edge Consulting",
  "Partnership",
  "Other",
]);

const attempts = new Map<string, { count: number; resetAt: number }>();

function text(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const key = ip || "unknown";
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (current.count >= 5) return true;
  current.count += 1;
  attempts.set(key, current);
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as ChatLeadPayload;
  const name = text(body.name);
  const email = text(body.email).toLowerCase();
  const phone = text(body.phone);
  const company = text(body.company);
  const interestArea = text(body.interestArea);
  const message = text(body.message);
  const source = text(body.source) || "Elgon Edge website chat";
  const sourcePage = text(body.sourcePage);
  const timestamp = new Date().toISOString();

  if (!name || !emailIsValid(email) || !message || !interestAreas.has(interestArea)) {
    return NextResponse.json({ message: "Please provide a valid name, email, interest area, and message." }, { status: 400 });
  }

  try {
    await prisma.contactSubmission
      .create({
        data: {
          name,
          email,
          phone: phone || null,
          company: company || null,
          serviceInterest: `Chat - ${interestArea}`,
          message: `${message}\n\nSource: ${source}\nPage: ${sourcePage || "Not provided"}\nTimestamp: ${timestamp}`,
        },
      })
      .catch((error) => {
        console.error("Chat lead storage failed; continuing with email notification", {
          error: error instanceof Error ? error.message : "Unknown error",
        });
      });

    await sendChatLeadNotification({
      name,
      email,
      phone,
      company,
      interestArea,
      message,
      source,
      sourcePage,
      timestamp,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Chat lead notification failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ message: "We could not send your request right now." }, { status: 500 });
  }
}
