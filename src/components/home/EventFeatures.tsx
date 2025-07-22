import React from "react";

const EventFeaturesSection = () => {
  return (
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

      {/* Step Sections */}
      <div className="space-y-24">
        {[1, 2, 3, 4, 5].map(step => (
          <div key={step} id={`step${step}`} className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-2/3 space-y-4">
              <span className="text-blue-500 font-bold text-xl">0{step}</span>
              <h3 className="text-2xl font-semibold text-gray-800">
                {step === 1 && 'Event planning, at every stage'}
                {step === 2 && '0% commission ticketing. For real.'}
                {step === 3 && 'Get in, gear up'}
                {step === 4 && 'Expo like a pro'}
                {step === 5 && 'Smarter decisions. Greater impact.'}
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {step === 1 && [
                  'Set up an agenda for event activities',
                  'Coordinate event sponsorships',
                  'Manage session registrations',
                  'Handle check-in for exclusive zones',
                ].map((item, i) => <li key={i}>{item}</li>)}

                {step === 2 && [
                  'Simplify ticket sales',
                  'Pre-approve attendees',
                  'Auto-generate discount codes',
                ].map((item, i) => <li key={i}>{item}</li>)}

                {step === 3 && [
                  'Scan QR codes for check-in',
                  'Self-check-in kiosks',
                  'Access control to VIP areas',
                  'Print custom event badges',
                ].map((item, i) => <li key={i}>{item}</li>)}

                {step === 4 && [
                  'Interactive floor plans',
                  'Automated exhibitor emails',
                  'Brand pages for visibility',
                  'Attendee-exhibitor engagement',
                  'Lead capture & classification',
                ].map((item, i) => <li key={i}>{item}</li>)}

                {step === 5 && [
                  'Track revenue and ticket sales',
                  'Monitor analytics & polls',
                  'Event type and location breakdowns',
                  'Track repeat attendees',
                ].map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="lg:w-1/3 relative">
              <img
                src={`https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-bg${step === 1 ? '' : '1'}.png`}
                alt=""
                className="w-full rounded shadow-lg"
              />
              {/* Overlay Images - optionally animate or add more */}
            </div>
          </div>
        ))}
      </div>

      {/* Try 2 defined */}
<section>
        <div id="step1" className="flex flex-wrap items-center justify-between my-16">
          <div className="w-full md:w-7/12">
            <span className="text-2xl font-semibold text-gray-700">01</span>
            <h3 className="text-3xl font-bold mb-4">Event planning, at every stage</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Set up an agenda for event activities</li>
              <li>Coordinate event sponsorships</li>
              <li>Manage regular and add-on session registrations</li>
              <li>Handle check-in for exclusive event zones</li>
            </ul>
          </div>
          <div className="w-full md:w-5/12 relative mt-8 md:mt-0">
            <img
              src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/article-bg.png"
              alt=""
              className="w-full h-auto"
            />
            <img
              src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img1.png"
              alt="event-agenda"
              className="absolute top-0 right-8 w-full h-auto"
            />
          </div>
        </div>

</section>
        {/* Card section */}
{/* <section className="px-4 py-12 bg-gray-50">
  <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
    <div id="step1" className="flex flex-wrap items-center justify-between"> */}
      {/* Text Section */}
      {/* <div className="w-full md:w-7/12 space-y-4">
        <span className="text-2xl font-semibold text-gray-700">01</span>
        <h3 className="text-3xl font-bold">Event planning, at every stage</h3>
        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>Set up an agenda for event activities</li>
          <li>Coordinate event sponsorships</li>
          <li>Manage regular and add-on session registrations</li>
          <li>Handle check-in for exclusive event zones</li>
        </ul>
      </div> */}

      {/* Image Section */}
      {/* <div className="w-full md:w-5/12 relative mt-8 md:mt-0">
        <img
          src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/article-bg.png"
          alt=""
          className="w-full h-auto rounded-md"
        />
        <img
          src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img1.png"
          alt="event-agenda"
          className="absolute top-0 right-8 w-full h-auto"
        />
      </div>
    </div>
  </div>
</section> */}

{/* card section with animated and hover features */}
<section className="px-4 py-12 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <div
      className="group bg-white rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl"
    >
      <div id="step1" className="flex flex-wrap items-center justify-between">
        {/* Text Section */}
        <div className="w-full md:w-7/12 space-y-4">
          <span className="text-2xl font-semibold text-gray-700">01</span>
          <h3 className="text-3xl font-bold">Event planning, at every stage</h3>
          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>Set up an agenda for event activities</li>
            <li>Coordinate event sponsorships</li>
            <li>Manage regular and add-on session registrations</li>
            <li>Handle check-in for exclusive event zones</li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-5/12 relative mt-8 md:mt-0 ">
          <img
            src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/article-bg.png"
            alt=""
            className="w-full h-auto rounded-md"
          />
          <img
            src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-evnts-grp-img1.png"
            alt="event-agenda"
            className="absolute top-0 right-8 w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:-translate-y-2"
          />
        </div>
      </div>
    </div>
  </div>
</section>


      <div className="mt-16 text-center">
        <a
          href="/backstage/features.html?src=rwp_homepage"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          More features
        </a>
      </div>
      
    </section>
  );
}


//   return (
//     <section className="relative py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold mb-4">
//             Plan, run, and analyze your <br className="block sm:hidden" />
//             <span className="text-blue-600">event—all from one place</span>
//           </h2>
//         </div>

//         <ul className="sticky top-0 z-10 flex justify-center gap-6 bg-white py-4 shadow-md">
//           <li><a href="#step1" className="text-blue-600 hover:underline">Event planning</a></li>
//           <li><a href="#step2" className="text-blue-600 hover:underline">Ticketing</a></li>
//           <li><a href="#step3" className="text-blue-600 hover:underline">Onsite solutions</a></li>
//           <li><a href="#step4" className="text-blue-600 hover:underline">Expo</a></li>
//           <li><a href="#step5" className="text-blue-600 hover:underline">Analytics</a></li>
//         </ul>

//         {/* Step 1 */}

//         {/* Similar pattern continues for Step 2 through Step 5... */}

//         <div className="text-center mt-12">
//           <a
//             href="/backstage/features.html?src=rwp_homepage"
//             className="text-blue-700 font-medium hover:underline"
//           >
//             More features
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }


export default EventFeaturesSection;