import Image from "next/image";

// 🔁 Fetch homepage
async function getHomePage() {
  const res = await fetch(
    "https://dodgerblue-snail-458253.hostingersite.com/wp-json/wp/v2/pages?slug=headless-homepage",
    {
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();
  return data[0];
}

// 🔁 Convert Media ID → URL
async function getMediaUrl(id: number) {
  const res = await fetch(
    `https://dodgerblue-snail-458253.hostingersite.com/wp-json/wp/v2/media/${id}`
  );
  const data = await res.json();
  return data?.source_url || null;
}

export default async function Home() {
  const page = await getHomePage();
  const sections = page?.acf?.page_builder || [];

  return (
    <main>
      {await Promise.all(
        sections.map(async (section: any, index: number) => {
          switch (section.acf_fc_layout) {
            case "hero":
              return (
                <section
                  className="bg-cover bg-center text-white py-20 px-6 text-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${section.hero_bg_image_url})`,
                  }}
                >
                  <div className="max-w-4xl mx-auto text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      {section.title}
                    </h1>

                    <p className="text-lg md:text-xl mb-8 text-white/90">
                      {section.subtitle}
                    </p>

                    <a
                      href={section.button_link}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      {section.button_text}
                    </a>
                  </div>
                </section>
              );

            case "text_section":
              return (
                <section key={index}>
                  <h2 className="text-4xl text-blue-600 font-bold">{section.title}</h2>
                  <p>{section.content}</p>
                </section>
              );

            case "events":
              return (
                <section key={index}>
                  <h2>{section.title}</h2>

                  <div style={{ display: "grid", gap: "20px" }}>
                    {await Promise.all(
                      section.events_list?.map(
                        async (event: any, i: number) => {
                          // 🔥 Convert ID → URL
                          const imageUrl = event.image
                            ? await getMediaUrl(Number(event.image))
                            : null;

                          return (
                            <div key={i}>
                              <h3>{event.title}</h3>
                              <p>{event.description}</p>

                              {/* ✅ IMAGE FIX */}
                              {imageUrl && (
                                <Image
                                  src={imageUrl}
                                  alt={event.title}
                                  width={300}
                                  height={200}
                                />
                              )}

                              <a href={event.button_link}>
                                {event.button_text}
                              </a>
                            </div>
                          );
                        }
                      ) || []
                    )}
                  </div>
                </section>
              );

            default:
              return null;
          }
        })
      )}
    </main>
  );
}