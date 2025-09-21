import { createClient } from "@/lib/supabase";

export async function getAllProductImages(productId: string) {
  const supabase = await createClient();
  // TODO: remember to upload all images taken by Signe in the same image format
  const { data, error } = await supabase.storage
    .from("Products")
    .list(productId);

  if (error) {
    console.error(error);
    return [];
  }

  const imageUrls = await Promise.all(
    data.map(async (file) => {
      const { data, error } = await supabase.storage
        .from("Products")
        .createSignedUrl(`${productId}/${file.name}`, 3600 * 24 * 30);

      if (error) {
        console.error(error);
        return null;
      }

      return data.signedUrl;
    })
  );

  return imageUrls.filter((url) => url !== null);
}
