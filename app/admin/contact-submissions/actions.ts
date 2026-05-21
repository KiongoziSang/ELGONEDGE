"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, isAdminAuthenticated, setAdminSession, verifyAdminPassword } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAdmin(formData: FormData) {
  await Promise.resolve();

  const password = readText(formData, "password");

  if (!verifyAdminPassword(password)) {
    redirect("/admin/contact-submissions?login=invalid");
  }

  setAdminSession();
  redirect("/admin/contact-submissions");
}

export async function logoutAdmin() {
  await Promise.resolve();

  clearAdminSession();
  redirect("/admin/contact-submissions");
}

export async function updateSubmissionStatus(formData: FormData) {
  if (!isAdminAuthenticated()) {
    redirect("/admin/contact-submissions?login=required");
  }

  const id = readText(formData, "id");
  const status = readText(formData, "status");

  if (!id || !["new", "read"].includes(status)) {
    return;
  }

  await prisma.contactSubmission.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/admin/contact-submissions");
}

export async function deleteSubmission(formData: FormData) {
  if (!isAdminAuthenticated()) {
    redirect("/admin/contact-submissions?login=required");
  }

  const id = readText(formData, "id");

  if (!id) {
    return;
  }

  await prisma.contactSubmission.delete({
    where: { id }
  });

  revalidatePath("/admin/contact-submissions");
}
