import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const logoRef = useRef<HTMLDivElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.from(logoRef.current, {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from(loginBtnRef.current, {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    });
  }, []);

  return (
    <header className="max-w-7xl mx-auto py-6 px-4 md:px-0  flex items-center justify-between ">
      {/* Logo Section */}
      <div ref={logoRef} className="flex items-center space-x-2">
        <img
          src="/assets/logo.png" // Replace with your correct path
          alt="ENRZY Logo"
          className="h-10 w-auto"
        />
        {/* <img
          src="/assets/logo-text.png" // Replace with your correct path
          alt="ENRZY Text"
          className="h-6 w-auto"
        /> */}
      </div>

      {/* Login Button */}
      {/* <button
        ref={loginBtnRef}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300"
      >
        Login
      </button> */}
       <button ref={loginBtnRef} className="bg-base text-white font-bold px-6 py-2 rounded-full transition-colors duration-300">
           <a href=" https://forms.gle/dzgKo3seMXsgctEv5" target='_blank'>
            Login

             </a>

          </button>
    </header>
  );
}
