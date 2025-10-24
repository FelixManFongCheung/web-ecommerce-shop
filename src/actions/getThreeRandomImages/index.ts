import { createClient } from "@/lib/supabase";

export async function getThreeRandomImages() {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("CoverImages").list();

  if (error || data.length === 0) {
    console.error(error);
    return [];
  }

  const validImageFiles = data.filter(
    (file) =>
      !file.name.startsWith(".") &&
      !file.name.includes("emptyFolderPlaceholder") &&
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
  );

  if (validImageFiles.length === 0) {
    console.error("No valid image files found");
    return [];
  }

  const shuffled = [...validImageFiles].sort(() => Math.random() - 0.5);
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
