import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSection = () => {
  const videoContainerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure GSAP and ScrollTrigger are loaded before proceeding
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded. Please ensure CDN scripts are included.');
      return;
    }

    // Register the ScrollTrigger plugin (important for it to work)
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const tld = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
    });

    tld.from(".hero-logo", { x: -40, opacity: 0, duration: 0.4 });
    tld.from(".hero-title-line", { y: 60, opacity: 0, duration: 0.8, stagger: 0.15 }, ">0.2");
    tld.from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, ">0.1");
    tld.from(".hero-video-container", { y: 60, opacity: 0, scale: 0.8, duration: 1.2, ease: 'back.out(1.7)' }, ">0.2");

    if (videoContainerRef.current && heroSectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });

      // Use transform scale and explicit positioning to keep it centered
      tl.to(videoContainerRef.current, {
        width: '80vw',
        height: '45vw',
        borderRadius: '2rem',
        ease: 'none',
      });
    }

    // Clean up ScrollTrigger instances on component unmount
    return () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <div
      ref={heroSectionRef}
      className="relative  flex flex-col items-center justify-center text-gray-900 p-4 overflow-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Top navigation */}
        <div className="flex justify-between items-center mt-0 md:mt-6 mb-12">
          <div className="hero-logo flex items-center space-x-2">
            <img src="/assets/logo.png" alt="ENRZY Logo" className="object-contain" />
          </div>
          <button className="hero-contact-btn bg-base text-white px-6 py-2 rounded-full hover:scale-105 transition-all duration-300">
<a href=" https://forms.gle/dzgKo3seMXsgctEv5" target='_blank'>
            Login

</a>

          </button>
        </div>

        {/* Main content */}
        <div className="flex mx-auto flex-col justify-between items-center max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="hero-title-line block">Revolutionize</span>
            <span className="hero-title-line block text-muted-foreground">
              Power <span className="text-foreground"> Prospects</span>
            </span>
            <span className="hero-title-line block">
              Asset <span className="text-muted-foreground">Management</span>
            </span>
          </h1>

          <p className="hero-subtitle text-gray-600 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed mb-16">
            ENRZY Empowers Utilities To Detect Faults Early, Automate Maintenance, And Visualize Every Asset In 3D — Ensuring Higher Uptime, Lower Risk, And Smarter Decisions.
          </p>
        </div>

        {/* Video Box Container */}
        <div
          ref={videoContainerRef}
          className="relative hero-video-container mx-auto w-[30vw] h-[16.875vw] bg-gray-300 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden"
          style={{
            minHeight: '200px',
            minWidth: '350px',
            willChange: 'width, height, border-radius, transform',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-2xl font-semibold">
            <video
              ref={videoRef}
              src="/assets/enrzy.mp4"
              muted
              playsInline
              autoPlay
              loop
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Spacer div to allow scrolling */}
        <div className="h-[200vh] w-full bg-transparent"></div>
      </div>
    </div>
  );
};

export default HeroSection;