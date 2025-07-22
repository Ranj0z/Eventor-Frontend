const BrandIdentitySection = () => {
  return (
    <section className="bg-gray-900 ">
        <div className="bg-gray-900 py-16 px-4">
            <div className="max-w-6xl mx-auto space-y-12 bg-grey-900">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
                Maintain your brand’s identity across all channels
                </h2>

                <div className="grid md:grid-cols-2 gap-10">
                {/* Box 1: Custom Website Domain */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 group">
                    <div className="mb-4 py-4">
                    <div className="border border-gray-500 rounded-lg px-4 py-2 flex items-center justify-between bg-gray-250">
                        <span className="text-sm text-gray-600">www.eventor.com</span>
                    </div>
                    </div>
                    <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        Get a custom <span className="text-indigo-600">website domain</span>
                    </h4>
                    <p className="text-gray-600">
                        Bring consistency to your brand’s image by customizing your event website. Create custom domains, URLs,
                        and webpages as needed.
                    </p>
                    </div>
                </div>

                {/* Box 2: Branded Mobile App */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 group">
                    <div className="mb-4">
                    <img
                        src="https://www.zohowebstatic.com/sites/zweb/images/backstage/bs-brand-app.png"
                        alt="Brand App"
                        width={440}
                        height={99}
                        loading="lazy"
                        className="w-full h-auto rounded-md"
                    />
                    </div>
                    <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        Publish custom <span className="text-indigo-600">branded mobile apps</span>
                    </h4>
                    <p className="text-gray-600">
                        Create mobile apps of your own in minutes without writing even a line of code. Simply download the app
                        code, submit it to the App Store or PlayStore for review, and list them on your event page.
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
  );
};
export default BrandIdentitySection;