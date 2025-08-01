// import {
//   Heart,
//   Calendar,
//   Shield,
//   Clock,
//   Star,
//   ArrowRight,
//   Phone,
//   MapPin,
//   Mail,
//   Award,
//   Users,
//   CheckCircle
// } from 'lucide-react';

// import { services } from './data/services';
// import { testimonials } from './data/testimonials';
import { useNavigate } from 'react-router';


const Hero = () => {
    const navigate = useNavigate();
    // Fetch doctors data using the Redux Toolkit Query hook
    // const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(
    //     undefined, 
    //     {
    //         refetchOnMountOrArgChange: true,
    //         pollingInterval: 60000,
    //     }
    // );
    // const navigateTo = (path: string) => {
    //    navigate(path);
    // };

  return (
    <div className="min-h-screen bg-white">
      {/* //Hero Section       */}
      <div className="carousel w-full min-h-[70vh] rounded-lg">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>

      <section>
        <div className='privacy bg-blue-700 flex flex-col '>
            <div className="zwc-curved-bg min-h-90 bg-center" 
          style={{
            backgroundImage:
              "url(https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-curvd-bg.svg)",  
          }}
          >
          <div className="hero-overlay flex flex-col items-center-safe">
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h3 className="mb-5 text-2xl font-bold text-white">Security by design. Privacy by default.</h3>
                <p className="mb-5 text-xl">
                  Plan your event worry-free with Eventor, without ad trackers, third-party cookies, or data mining. 
                  We're fully compliant with international security standards, 
                  and own our entire tech stack and data centers—which means that all your information is in safe hands.
                </p>
              </div>
              
            </div>
          <div
            className="hero min-h-65 max-w-150 rounded-lg "
            style={{
              backgroundImage:
              
                "url(https://www.zohowebstatic.com/sites/zweb/images/backstage/home/zwb-security-privacy.png)",
            }}
          >
            <div className="p-abslt zwc-security-anim">
                <div className="zwc-dots-anim">
                  <span className="zwc-sm-dots"></span>
                  <span className="zwc-sm-line"></span>
                  <span className="zwc-md-dots"></span>
                  <span className="zwc-sm-line"></span>
                  <span className="zwc-sm-dots"></span>
                  </div>
                  <img aria-hidden="true" className="zwc-lock-img" width="100" height="230" 
                  src="//www.zohowebstatic.com/sites/zweb/images/backstage/home/zwc-security-img.svg" alt=""/>
              </div>
          </div>
          </div>
          </div>
        </div>
      </section>

      <section>
          <div
          className="hero min-h-180 rounded-lg"
          style={{
            backgroundImage:
              "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          }}
        >
          <div className="hero-content text-neutral-content text-center justify-end mb-2">
            <div className="max-w-md p-6 border-2 bg-white/80 text-black ">
              <h1 className="mb-5 text-5xl font-bold">Event Title</h1>
              <p className="mb-5">Event date</p>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Hero;