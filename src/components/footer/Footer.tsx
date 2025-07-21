import { Heart, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Calendar} from 'lucide-react';
import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
       navigate(path);
    };

  return (
    <footer className="bg-gray-900 text-white">
      {/* <footer className="footer sm:footer-horizontal bg-base-300 text-base-content "> */}
        <div className="footer sm:footer-horizontal grid md:grid-cols-2 gap-auto p-10 center">
          <nav>
                    <h3 className="text-lg font-semibold mb-4">Services</h3>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
                    <h3 className="text-lg font-semibold mb-4">Social</h3>
            <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
          </nav>
          </div>
        {/* </footer> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
             <aside className="flex space-x-2 items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-current">
                <path
                  d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
              </svg>
              <p>Copyright © {new Date().getFullYear()}, Eventor- All right reserved</p>
            </aside>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;