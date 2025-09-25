import { createClient } from "@/lib/supabase";

export async function getThreeRandomImages() {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("CoverImages").list();

  if (error || data.length === 0) {
    console.error(error);
    return [];
  }

  const shuffled = [...data].sort(() => Math.random() - 0.5);
  const randomImages = shuffled.slice(0, 3);

  const imageUrls = await Promise.all(
    randomImages.map(async (file) => {
      const { data, error } = await supabase.storage
        .from("CoverImages")
        .createSignedUrl(file.name, 3600 * 24 * 30);

      if (error) {
        console.error(error);
        return null;
      }

      return data.signedUrl;
    })
  );

  return imageUrls.filter((url) => url !== null);
}
