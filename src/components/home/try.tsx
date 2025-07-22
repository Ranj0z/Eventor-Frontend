import React from "react";

const brandLogos = [
  {
    alt: "Amazon logo",
    src: "https://www.zohowebstatic.com/sites/zweb/images/otherbrandlogos/amazon.svg",
    width: 145,
    height: 44,
  },
  {
    alt: "BusinessNZ logo",
    src: "https://www.zohowebstatic.com/sites/zweb/images/otherbrandlogos/business-nz.png",
    width: 200,
    height: 94,
  },
  {
    alt: "Levis logo",
    src: "https://www.zohowebstatic.com/sites/zweb/images/otherbrandlogos/levis.svg",
    width: 107,
    height: 44,
  },
  {
    alt: "ITP Media logo",
    src: "https://www.zohowebstatic.com/sites/zweb/images/otherbrandlogos/itp-media.png",
    width: 183,
    height: 44,
  },
  {
    alt: "Victoria University logo",
    src: "https://www.zohowebstatic.com/sites/zweb/images/otherbrandlogos/victoria-university.png",
    width: 125,
    height: 44,
  },
  {
    alt: "Razorpay logo",
    src: "https://www.zohowebstatic.com/sites/zweb/images/otherbrandlogos/razorpay.svg",
    width: 208,
    height: 44,
  },
];

const HeroTry1: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Trusted By</h2>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
          {brandLogos.map((logo, index) => (
            <li key={index} className="flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain max-h-[100px]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HeroTry1;
