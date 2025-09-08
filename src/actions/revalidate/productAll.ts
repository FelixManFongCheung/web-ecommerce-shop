import { revalidateTag } from "next/cache";

export function revalidateProductsAll() {
  try {
    revalidateTag("products-all");
    return { success: true };
  } catch (error) {
    console.error("Revalidation error:", error);
    return { success: false, error: "Failed to revalidate products-all" };
  }
}
