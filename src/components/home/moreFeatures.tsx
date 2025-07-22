
import React from "react";

const steps = [
  {
    id: 1,
    title: "Get to the details: where, what, and how?",
    description:
      "Enter all the details your attendees would want to know, like the name, date, venue, and social media handles for your event.",
    img: "https://www.zohowebstatic.com/sites/zweb/images/backstage/org-step-details.png",
    width: 450,
    height: 371,
  },
  {
    id: 2,
    title: "Show a glimpse of what to expect",
    description:
      "Let your attendees know what they’re signing up for. Create a detailed agenda of the event with the location details.",
    img: "https://www.zohowebstatic.com/sites/zweb/images/backstage/org-step-agenda.png",
    width: 450,
    height: 331,
  },
  {
    id: 3,
    title: "Get more eyes on who’s talking",
    description:
      "Your speakers can influence what attendees your event attracts. Bring more attention to your event by promoting your speakers’ list.",
    img: "https://www.zohowebstatic.com/sites/zweb/images/backstage/org-step-speakers.png",
    width: 280,
    height: 463,
  },
  {
    id: 4,
    title: "Call for sponsorships",
    description:
      "Let brands leverage the exposure they could get through your event website by sponsoring for your event. Manage your sponsors and list them on your website.",
    link: "/backstage/manage-sponsorships.html",
    img: "https://www.zohowebstatic.com/sites/zweb/images/backstage/org-step-sponsors.png",
    width: 280,
    height: 462,
  },
  {
    id: 5,
    title: "Streamline event ticketing",
    description:
      "Set up an easy way for people to register for your event and boost the ticket sales. Pay zero commission on sales made with Zoho Backstage’s ticketing.",
    link: "/backstage/event-ticketing.html",
    img: "https://www.zohowebstatic.com/sites/zweb/images/backstage/org-step-tickets.png",
    width: 280,
    height: 463,
  },
  {
    id: 6,
    title: "Badge up your event participants",
    description:
      "Design your event badges and customize them as per your needs. Choose your favorite badge template for your attendees to sport it at the event.",
    img: "https://www.zohowebstatic.com/sites/zweb/images/backstage/feature-org-badge.png",
    width: 340,
    height: 447,
  },
  {
    id: 7,
    title: "Design your event website",
    description:
      "Get a stunning website for your event in no time. Use one of our templates or add your own design, and get going!",
    link: "/backstage/event-website-builder.html",
    img: "https://www.zohowebstatic.com/sites/zweb/images/backstage/org-step-website.png",
    width: 380,
    height: 434,
  },
];

const FeaturesEventSteps = () => {
  return (
    <section className="bg-black">
        <div className="px-4 py-16 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center text-white">
                Set the stage for your next big show, in 6 simple steps
                </h2>
                <div className="space-y-12">
                {steps.map((step) => (
                    <div
                    key={step.id}
                    className="group bg-white rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl flex flex-wrap items-center justify-between"
                    >
                    <div className="w-full md:w-7/12 space-y-4">
                        <div className="text-3xl font-bold text-gray-800">
                        <span className="text-indigo-600 font-semibold text-2xl">
                            {step.id}.
                        </span>{" "}
                        {step.title}
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed">
                        {step.description}
                        </p>
                        {step.link && (
                        <a
                            href={step.link}
                            className="text-indigo-500 font-medium hover:underline"
                        >
                            Learn more
                        </a>
                        )}
                    </div>
                    <div className="w-full md:w-5/12 relative mt-8 md:mt-0">
                        <img
                        src={step.img}
                        alt={step.title}
                        width={step.width}
                        height={step.height}
                        className="w-full h-auto rounded-md transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:-translate-y-2"
                        />
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </section>
  );
}

export default FeaturesEventSteps;
