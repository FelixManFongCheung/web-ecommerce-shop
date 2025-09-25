const data = {
  section_1: {
    title:
      "Proxy Archive is an online vintage archive with a showroom in Copenhagen, available by appointment only.",
    paragraphs: [
      "To schedule a visit, please contact us at info@proxyarchive.com",
      "For online orders, please read the terms&conditions carefully before making a purchase.",
    ],
  },
  section_2: {
    title: "Contact",
    paragraphs: [
      "For any further inquiries, feel free to reach out at info@proxyarchive.com.",
      "Instagram @proxy__archive",
    ],
  },
};

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
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
