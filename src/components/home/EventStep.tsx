// images
// ✅ Event Step 1: Event planning
// 1. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/article-bg.png
// 2. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img1.png
// 3. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-ovrly-img1.png
// ✅ Event Step 2: Ticketing
// 4. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg1.png
// 5. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img2.png
// 6. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-ovrly-img3.png
// 7. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-ovrly-img2.png
// ✅ Event Step 3: Onsite solutions
// 8. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg1.png
// 9. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img5.png
// 10. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-ovrly-img7.png
// ✅ Event Step 4: Expo
// 11. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg3.png
// 12. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img3.png
// 13. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-ovrly-img5.png
// 14. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-ovrly-img4.png
// ✅ Event Step 5: Analytics
// 15. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg3.png
// 16. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img4.png
// 17. https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-ovrly-img6.png



import React from "react";

const steps = [
  {
    id: "step1",
    number: "01",
    title: "Event planning, at every stage",
    points: [
      "Set up an agenda for event activities",
      "Coordinate event sponsorships",
      "Manage regular and add-on session registrations",
      "Handle check-in for exclusive event zones",
    ],
    background:
      "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/article-bg.png",
    overlays: [
      {
        src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img1.png",
        className:
          "top-0 right-8 w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:-translate-y-2",
      },
    ],
  },
  {
    id: "step2",
    number: "02",
    title: "0% commission ticketing. For real.",
    points: [
      "Simplify ticket sales",
      "Pre-approve attendees",
      "Auto-generate discount codes",
    ],
    background:
      "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg1.png",
    overlays: [
      {
        src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img2.png",
        className:
          "bottom-0 right-4 w-3/4 transition-transform duration-500 ease-in-out group-hover:rotate-1 group-hover:scale-105",
      },
    ],
  },
  {
    id: "step3",
    number: "03",
    title: "Get in, gear up",
    points: [
      "Scan QR codes for check-in",
      "Self-check-in kiosks",
      "Access control to VIP areas",
      "Print custom event badges",
    ],
    background:
      "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg1.png",
    overlays: [
      {
        src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img5.png",
        className:
          "top-4 left-4 w-11/12 transition duration-500 group-hover:-translate-y-1 group-hover:scale-105",
      },
    ],
  },
  {
    id: "step4",
    number: "04",
    title: "Expo like a pro",
    points: [
      "Interactive floor plans",
      "Automated exhibitor emails",
      "Brand pages for visibility",
      "Attendee-exhibitor engagement",
      "Lead capture & classification",
    ],
    background:
      "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg3.png",
    overlays: [
      {
        src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img3.png",
        className:
          "bottom-0 right-0 w-5/6 transition group-hover:scale-110 group-hover:-translate-y-1",
      },
    ],
  },
  {
    id: "step5",
    number: "05",
    title: "Smarter decisions. Greater impact.",
    points: [
      "Track revenue and ticket sales",
      "Monitor analytics & polls",
      "Event type and location breakdowns",
      "Track repeat attendees",
    ],
    background:
      "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg3.png",
    overlays: [
      {
        src: "https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img4.png",
        className:
          "top-0 right-0 w-1/2 transition group-hover:scale-105 group-hover:translate-x-2",
      },
    ],
  },
];

const EventSteps = () => {
  return (
      
    <section className="px-4 py-12 bg-gray-50"> 
     <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Plan, run, and analyze your <br className="hidden md:inline" />
          <span className="inline-block">event—all from one place</span>
        </h2>
      </div>

      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <ul className="flex justify-center space-x-6 py-2">
          <li><a href="#step1" className="text-blue-600 hover:underline">Event planning</a></li>
          <li><a href="#step2" className="text-blue-600 hover:underline">Ticketing</a></li>
          <li><a href="#step3" className="text-blue-600 hover:underline">Onsite solutions</a></li>
          <li><a href="#step4" className="text-blue-600 hover:underline">Expo</a></li>
          <li><a href="#step5" className="text-blue-600 hover:underline">Analytics</a></li>
        </ul>
      </div>
      <div className="max-w-6xl mx-auto space-y-12">
        {steps.map(({ id, number, title, points, background, overlays }) => (
          <div
            key={id}
            id={id}
            className="group bg-white rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl"
          >
            <div className="flex flex-wrap items-center justify-between">
              {/* Text */}
              <div className="w-full md:w-7/12 space-y-4">
                <span className="text-2xl font-semibold text-gray-700">
                  {number}
                </span>
                <h3 className="text-3xl font-bold">{title}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  {points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Image + Overlays */}
              <div className="w-full md:w-5/12 relative mt-8 md:mt-0">
                <img
                  src={background}
                  alt=""
                  className="w-full h-auto rounded-md"
                />
                {overlays.map((overlay, i) => (
                  <img
                    key={i}
                    src={overlay.src}
                    alt=""
                    className={`absolute ${overlay.className}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}  <div className="mt-16 text-center">
        <a
          href="/features"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          More features
        </a>
      </div>
      </div>
    </section>
       
      
    </section>

  );
};

export default EventSteps;

