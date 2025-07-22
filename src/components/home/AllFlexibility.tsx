import React from "react";

const EventCard = ({
  title,
  description,
  link,
  linkLabel,
  videoPoster,
  videoSources,
  colorClass,
}: {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  videoPoster: string;
  videoSources: { src: string; type: string }[];
  colorClass: string;
}) => (
  <div className={`rounded-lg shadow-md p-6 text-white ${colorClass}`}>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="mb-4">{description}</p>
    <a
      href={link}
      className="inline-flex items-center text-sm font-medium underline underline-offset-2"
      aria-label={linkLabel}
    >
      {linkLabel}
      <span aria-hidden="true" className="ml-1">→</span>
    </a>
    <div className="mt-4 relative aspect-video overflow-hidden rounded-lg">
      <video
        autoPlay
        muted
        playsInline
        poster={videoPoster}
        className="w-full h-full object-cover"
        aria-hidden="true"
      >
        {videoSources.map((source, idx) => (
          <source key={idx} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
      <button
        className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-full"
        aria-label="Play"
        aria-pressed="false"
      >
        ▶
        <span className="sr-only">Play</span>
      </button>
    </div>
  </div>
);

const FlexibilitySection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="block">All the flexibility your</span> events need
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <EventCard
            title="In person"
            description="Real connections, right at your venue"
            link="/backstage/check-in-and-badging.html"
            linkLabel="Explore more"
            videoPoster="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/inperson-event.png"
            videoSources={[
              {
                src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/inperson-event.webm",
                type: "video/webm",
              },
              {
                src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/inperson-event.mov",
                type: "video/quicktime",
              },
            ]}
            colorClass="bg-blue-700"
          />

          <EventCard
            title="Virtual"
            description="Your screen, your stage"
            link="/backstage/virtual-events.html"
            linkLabel="Explore more"
            videoPoster="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/virtual-event.png"
            videoSources={[
              {
                src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/virtual-event.webm",
                type: "video/webm",
              },
              {
                src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/virtual-event.mov",
                type: "video/quicktime",
              },
            ]}
            colorClass="bg-orange-500"
          />

          <EventCard
            title="Hybrid"
            description="Onsite impact meets virtual comfort"
            link="/backstage/hybrid-events.html"
            linkLabel="Explore more"
            videoPoster="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/hybrid-event.png"
            videoSources={[
              {
                src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/hybrid-event.webm",
                type: "video/webm",
              },
              {
                src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/hybrid-event.mov",
                type: "video/quicktime",
              },
            ]}
            colorClass="bg-gray-700"
          />
        </div>
      </div>
    </section>
  );
};

export default FlexibilitySection;
