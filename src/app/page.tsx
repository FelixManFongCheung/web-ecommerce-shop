import { getThreeRandomImages } from "@/actions/getThreeRandomImages";
import { Hero } from "@/components/hero";

export default async function Home() {
  const images = await getThreeRandomImages();
  return <Hero images={images} />;
}
