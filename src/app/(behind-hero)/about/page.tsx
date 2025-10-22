const data = {
  section_1: {
    title:
      "Proxy Archive is your gatewayto rare vintage and archive designer pieces — a bridge between eras, aesthetics, and cultural legacy, created to foster lasting emotional connection.",
    paragraphs: [
      "Each item is handpicked for its unique design, exceptional craftsmanship, and cultural relevance — from overlooked rarities to iconic moments in fashion history.",
      "Our aim is to curate a wardrobe that resonates — one that lingers in your sentimental hard drive for years to come.",
      "Every garment is authentic and thoroughly inspected, ensuring trusted quality and enduring appeal.",
    ],
  },
  section_2: {
    title: "Consignment",
    paragraphs: [
      "Proxy Archive offers consignment services to help you share your gems with an appreciative audience.",
      "Simply send us an email at info@proxyarchive.com with images and short descriptions of your items.",
      "Upon approval, we’ll collaborate on pricing and feature your pieces as part of our curated collection. A commission is agreed upon in advance and deducted from each sale.",
      "Unsold items can either be returned or remain listed — entirely up to you.",
    ],
  },
};

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row gap-20">
      {Object.values(data).map((section) => {
        return (
          <div className="flex-1" key={section.title}>
            <h2 className="text-2xl mb-4">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p className="mb-4" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
