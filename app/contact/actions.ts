"use server";

import { redirect } from "next/navigation";
import { sendContactNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { serviceInterestOptions } from "@/lib/site";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createContactSubmission(formData: FormData) {
  const name = readText(formData, "name");
  const email = readText(formData, "email");
  const phone = readText(formData, "phone");
  const company = readText(formData, "company");
  const serviceInterest = readText(formData, "serviceInterest");
  const message = readText(formData, "message");

  const validServiceInterest = serviceInterestOptions.includes(serviceInterest);

  if (!name || !email || !validServiceInterest || !message) {
    redirect("/contact?submitted=invalid");
  }

  try {
    const submission = {
      name,
      email,
      phone,
      company,
      serviceInterest,
      message
    };

    await prisma.contactSubmission.create({
      data: {
        name: submission.name,
        email: submission.email,
        phone: phone || null,
        company: company || null,
        serviceInterest: submission.serviceInterest,
        message: submission.message
      }
    });

    void sendContactNotification(submission).catch((error: unknown) => {
      console.error("Failed to send contact notification email", error);
    });
  } catch (error) {
    console.error("Failed to create contact submission", error);
    redirect("/contact?submitted=error");
  }

  redirect("/contact?submitted=success");
}
