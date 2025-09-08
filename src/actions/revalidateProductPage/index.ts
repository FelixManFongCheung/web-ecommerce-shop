"use server";

import { revalidatePath } from "next/cache";

export async function revalidateProductPage(path: string) {
  try {
    revalidatePath(path);
    console.log("Revalidated", path);
    return { success: true };
  } catch (error) {
    console.error("Revalidation error:", error);
    return { success: false, error: "Failed to revalidate" };
  }
}
